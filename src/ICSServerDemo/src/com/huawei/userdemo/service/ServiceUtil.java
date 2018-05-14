package com.huawei.userdemo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.demo.common.GlobalObjects;
import com.huawei.demo.config.ConfigList;
import com.huawei.demo.config.ConfigProperties;

public class ServiceUtil 
{
    private static String ip;
	
	private static String port;
	
	private static String vdnId;
	
	private static final String SSLENABLE = "1";
	
	private static final String SSLUNABLE = "0";
	
	private static boolean isPullFromICS = false;
	
	private static String prefix;
	
	private static String pushURL = "";
	
	private static final Logger LOG = LoggerFactory.getLogger(ServiceUtil.class);
	
	/**
	 * init ip/port/url
	 */
	
	
	public static void serviceInit()
	{
		ip = ConfigProperties.getKey(ConfigList.CONFIG, "ICSGateway_IP");
		port = ConfigProperties.getKey(ConfigList.CONFIG, "ICSGateway_PORT");
		vdnId = ConfigProperties.getKey(ConfigList.CONFIG, "VDN_ID");
		pushURL = ConfigProperties.getKey(ConfigList.CONFIG, "PushURL");
		
		if ("PULL".equalsIgnoreCase(ConfigProperties.getKey(ConfigList.CONFIG, "GETEVENT_WAY")))
		{
			setPullFromICS(true);
		}
		else if ("PUSH".equalsIgnoreCase(ConfigProperties.getKey(ConfigList.CONFIG, "GETEVENT_WAY")))
		{
			setPullFromICS(false);
		}
		else
		{
		    LOG.error("wrong GETEVENT_WAY value, GETEVENT_WAY must be PULL or PUSH");
		}
		
		if (SSLENABLE.equals(ConfigProperties.getKey(ConfigList.CONFIG, "SSLEable")))
		{
			prefix = "https://"+ip+":"+port+"/icsgateway/resource/";
		}
		else if (SSLUNABLE.equals(ConfigProperties.getKey(ConfigList.CONFIG, "SSLEable")))
		{
			prefix = "http://"+ip+":"+port+"/icsgateway/resource/";
		}
		else
		{
		    LOG.error("wrong SSLEable value, SSLEable must be SSLENABLE or SSLUNABLE");
		}
	}
	
	public static String getVdnId() 
	{
		return vdnId;
	}

	public static String getPrefix() 
	{
		return prefix;
	}

	public static String getPushURL() 
	{
		return pushURL;
	}

	/**
     * resource clear
     */
    public static void clearResourse(String userName)
    {
    	if (GlobalObjects.GUID_MAP.containsKey(userName))
    	{
    		GlobalObjects.GUID_MAP.remove(userName);
    	}
    	if (GlobalObjects.EVENT_THREAD_MAP.containsKey(userName))
    	{
    		GetEventThread thread = GlobalObjects.EVENT_THREAD_MAP.get(userName);
    		thread.end();
    		GlobalObjects.EVENT_THREAD_MAP.remove(userName);
    	}
    	
    	if (GlobalObjects.EVENT_HEART_MAP.containsKey(userName))
    	{
    		HeartBeatThread thread = GlobalObjects.EVENT_HEART_MAP.get(userName);
    		thread.end();
    		GlobalObjects.EVENT_HEART_MAP.remove(userName);
    	}
    	
    	if (GlobalObjects.COOKIE_MAP.containsKey(userName))
    	{
    		GlobalObjects.COOKIE_MAP.remove(userName);
    	}
    	
    	if (GlobalObjects.GATEWAY_COOKIE_MAP.containsKey(userName))
        {
            GlobalObjects.GATEWAY_COOKIE_MAP.remove(userName);
        }
    	
    	if (GlobalObjects.LOGINED_MAP.containsKey(userName))
    	{
    		GlobalObjects.LOGINED_MAP.remove(userName);
    	}
    }
    
    public static boolean isPullFromICS()
	{
		return isPullFromICS;
	}

	public static void setPullFromICS(boolean isPullFromICS)
	{
		ServiceUtil.isPullFromICS = isPullFromICS;
	}
}
