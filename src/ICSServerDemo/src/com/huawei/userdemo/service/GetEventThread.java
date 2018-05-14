package com.huawei.userdemo.service;

import java.util.Date;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.demo.common.GlobalObjects;
import com.huawei.demo.request.Request;
import com.huawei.demo.util.LogUtils;
import com.huawei.demo.util.StringUtils;

/**
 * 
 * <p>Title: </p>
 * <p>Description: obtain event</p>
 * <p>Company: Huawei Tech. Co. Ltd.</p>
 * @version
 * @since 2017年10月10日
 */
public class GetEventThread extends Thread 
{
	
	private static final Logger LOG = LoggerFactory.getLogger(GetEventThread.class);
    
	//pause 500ms before invoking next eventget interface
	private static final int SLEEPTIME = 500;
	
    private boolean isAlive = true;
    
    private String userName;    
    
    
	//80*1.5 = 120s . if net error, after 2 minute do clear resource.	
	private static final int COUNT = 80;
	//连续断连次数
    private int netWorkErrorCount = 0;
    
    /**
	 * @param userName
	 */
	public GetEventThread(String userName) 
	{
		super();
		this.userName = userName;
	}


	@SuppressWarnings("unchecked")
    @Override
    public void run()
    {        
        Map<String, Object> map;
        String retcode;
        Map<String, Object> event;
        String url = ServiceUtil.getPrefix() + "icsevent/" + ServiceUtil.getVdnId() + "/" + userName;
        while (isAlive)
        {
        	/*
        	 * get event request
        	 */
            map = Request.get(userName,url);
            
            if (null != map)
            {
                retcode = String.valueOf(map.get("retcode"));
                switch(retcode)
                {
                /*
                 * request successfully
                 */
                case StringUtils.SUCCESS:
                    netWorkErrorCount = 0;
                	event = (Map<String, Object>)map.get("event");
                	if (null == event)
                	{
                		pause();
                	}
                	else if (!GlobalObjects.LOGINED_MAP.containsKey(event.get("userName")))  //get logged in agent event only
                	{
                		pause();
                	}
                	else
                	{
                		weccEventHandle(event);
                	}
                	break;
                /*
                 * request to server failed
                 */
                case StringUtils.NETWORKERROR:
                	netWorkErrorCount++;
                	if (netWorkErrorCount <= COUNT)
                	{
                		LOG.error("Event pull mode net error---"+LogUtils.encodeForLog(new Date()));
                		pause();
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
            else 
            {
                pause(); 
            }
        } 
    }
    
    
    /**
     * put event object to event queue
     * @param event
     */
    public void weccEventHandle(Map<String, Object> event)
    {
        String userName = (String)event.get("userName");
        String message = StringUtils.beanToJson(event);
		GlobalObjects.LOGINED_MAP.get(userName).putMessage(message);        
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
     * stop
     */
    public void end()
    {
        isAlive = false;
    }
 
}
    