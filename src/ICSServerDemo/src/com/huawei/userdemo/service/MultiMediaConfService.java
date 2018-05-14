package com.huawei.userdemo.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.demo.request.Request;
import com.huawei.demo.util.LogUtils;
import com.huawei.demo.util.StringUtils;

public class MultiMediaConfService 
{
	 private static final Logger LOG = LoggerFactory.getLogger(MultiMediaConfService.class);
	 
	/**
     * request meeting method
     * request method : POST
     * @param userName
     * @param callId
     * @return
     */
    public static String requestMeeting(String userName,String callId)
    {
        String url = ServiceUtil.getPrefix() + "meetingcall/" + ServiceUtil.getVdnId() + "/" + userName + "/requestmeeting?callId=" + callId;
        
        Map<String, Object> result = Request.post(userName,url,null);
        LOG.debug("userName = " + LogUtils.encodeForLog(userName)+" return message:" + LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }
    
    /**
     * stop meeting method
     * request method : POST
     * @param userName
     * @param confId
     * @return
     */
    public static String stopMeeting(String userName,String confId)
    {
    	String url = ServiceUtil.getPrefix() + "meetingcall/" + ServiceUtil.getVdnId() + "/" + userName + "/stopmeeting?confId=" + confId;
    	
    	Map<String, Object> result = Request.post(userName,url,null);
    	LOG.debug("userName = " + LogUtils.encodeForLog(userName)+" return message:" + LogUtils.encodeForLog(Request.beanToJson(result)));
    	       	
    	return StringUtils.beanToJson(result);
    	
    }
    
    /**
     * report Result method
     * request method : POST
     * @param userName
     * @param confId
     * @param resultCode
     * @param cause
     * @return
     */
    public static String reportResult(String userName,String confId, String resultCode, String cause)
    {
    	String url = ServiceUtil.getPrefix() + "meetingcall/" + ServiceUtil.getVdnId() + "/" + userName + "/reportresult";
    	
    	Map<String, Object> reportResult = new HashMap<String, Object>();
        reportResult.put("confId", confId);
        reportResult.put("result", resultCode);
        reportResult.put("cause", cause);
    	
    	Map<String, Object> result = Request.post(userName,url,reportResult);
    	LOG.debug("userName = " + LogUtils.encodeForLog(userName) + " return message:" + LogUtils.encodeForLog(Request.beanToJson(result)));
    	return StringUtils.beanToJson(result);    	
    }
}
