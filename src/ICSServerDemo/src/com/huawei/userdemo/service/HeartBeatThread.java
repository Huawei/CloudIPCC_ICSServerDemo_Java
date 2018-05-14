package com.huawei.userdemo.service;

import java.util.Date;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.demo.request.Request;
import com.huawei.demo.util.LogUtils;
import com.huawei.demo.util.StringUtils;

/**
 * 
 * <p>Title: </p>
 * <p>Description: maintain heartbeat </p>
 * <p>Company: Huawei Tech. Co. Ltd.</p>
 * @version
 * @since 2018-01-01
 */
public class HeartBeatThread extends Thread 
{
	private static final Logger LOG = LoggerFactory.getLogger(HeartBeatThread.class);
	
	//every 60s to invoke the heartbeat interface. unit:millisecond
	private static final int SLEEPTIME = 60000;
	
	// Network error times,if the heartbeat failed twice,then clear Resourse,logout users
	private static final int COUNT = 2;
	
	private boolean isAlive = true;
	    
	private String userName;
	
	//连续断连次数
	private int netWorkErrorCount = 0;
	
	public HeartBeatThread(String userName)
	{
		super();
		this.userName = userName;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public void run()
	{
		Map<String, Object> map;
		Map<String, Object> result;
        String retcode;
        String url = ServiceUtil.getPrefix() + "onlinewecc/" + ServiceUtil.getVdnId() + "/" + userName + "/heartbeat";
        while (isAlive)
        {
        	map = Request.get(userName,url);
        	if (null != map)
        	{
        		retcode = String.valueOf(map.get("retcode"));
        		switch(retcode)
        		{
        		case StringUtils.SUCCESS:
        		    netWorkErrorCount = 0;
        			result = (Map<String, Object>)map.get("result");
        			if (null == result)
        			{
        				continue;
        			}
        			else
        			{
        				LOG.info("HeartBeatAlive: workNo[" + LogUtils.encodeForLog(userName) + "],loginTime: " + LogUtils.encodeForLog(result.get("loginTime")));
        			}
        			break;
        			
                case StringUtils.NETWORKERROR:
                	netWorkErrorCount++;
                	if (netWorkErrorCount <= COUNT)
                	{   
                		LOG.error("Event push mode net error---"+LogUtils.encodeForLog(new Date()));
                	}
                	else
                	{
                		ServiceUtil.clearResourse(userName);
                	}
                	break;
        			
        		default:
        			map = null;
        			break;
        		}
        	}        	
        	pause();
        }
	}	
	
	/**
     * pause get event thread
     */
	private void pause()
    {
    	try
        {
            Thread.sleep(SLEEPTIME);
        }
        catch (InterruptedException e)
        {
            LOG.error(LogUtils.encodeForLog(e.getMessage()));
        }
    }
    
    /**
     * start get event thread
     */
    public void begin()
    {        
        isAlive = true;
        this.start();
    }
    
    /**
     * stop get event thread
     */
    public void end()
    {
        isAlive = false;
    }
}
