package com.huawei.userdemo.service;

import java.text.Normalizer;
import java.text.Normalizer.Form;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.demo.request.Request;
import com.huawei.demo.util.LogUtils;
import com.huawei.demo.util.StringUtils;

public class QuasiRealTimeCallService {
	
    /**
     * log
     */
    private static final Logger LOG = LoggerFactory.getLogger(QuasiRealTimeCallService.class);
	
    /**
     * user creat call method
     * request method : POST
     * @param userName
     * @param mediaType
     * @param accessCode
     * @param verifyCode
     * @param callData
     * @return
     */
    public static String doCreatCall(String userName,String mediaType,String accessCode,String verifyCode,String callData,String uvid)
    {
        String url = ServiceUtil.getPrefix() + "realtimecall/" + ServiceUtil.getVdnId() + "/" + userName + "/docreatecall";
        
        Map<String, Object> realTimeCallParam = new HashMap<String, Object>();
        realTimeCallParam.put("mediaType", mediaType);
        realTimeCallParam.put("accessCode", accessCode);
        realTimeCallParam.put("verifyCode", verifyCode);
        realTimeCallParam.put("callData", callData);
        realTimeCallParam.put("uvid", uvid);
                
        LOG.debug("userName = "+LogUtils.encodeForLog(userName)+" received message:loginParam:"+LogUtils.encodeForLog(Request.beanToJson(realTimeCallParam)));
        Map<String, Object> result = Request.post(userName,url, realTimeCallParam);
        LOG.debug("userName = "+LogUtils.encodeForLog(userName)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        
        return StringUtils.beanToJson(result);
    }
    /**
     * user release call method
     * request method : DELETE
     * @param userName
     * @param callId
     * @return
     */
    public static String releaseCall(String userName,String callId)
    {
        String url = ServiceUtil.getPrefix() + "realtimecall/" + ServiceUtil.getVdnId() + "/" + userName + "/dodropcall?callId="+callId;
        
        Map<String, Object> result = Request.delete(userName,url,null);
        LOG.debug("userName = "+LogUtils.encodeForLog(userName)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }
    
    /**
     * user send message method
     * request method : POST
     * @param userName
     * @param callId
     * @param content
     * @return
     */
    public static String sendMessage(String userName,String callId,String content)
    {
        String url = ServiceUtil.getPrefix() + "realtimecall/" + ServiceUtil.getVdnId() + "/" + userName + "/dosendmessage";
        
        Map<String, Object> chatMessage = new HashMap<String, Object>();
        chatMessage.put("callId", callId);
        chatMessage.put("content", content);
        
        LOG.debug("userName = "+LogUtils.encodeForLog(userName)+" received message:loginParam:"+LogUtils.encodeForLog(Request.beanToJson(chatMessage)));
        Map<String, Object> result = Request.post(userName,url, chatMessage);
        LOG.debug("userName = "+LogUtils.encodeForLog(userName)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        
        return StringUtils.beanToJson(result);
    }
    
    
    /**
     * user upload file method
     * request method : POST
     * @param userName
     * @param callId
     * @param mediaData
     * @param fileName
     * @return
     */
    public static String uploadFile(String userName,String callId,byte[] mediaData,String fileName)
    {
        String url = ServiceUtil.getPrefix() + "realtimecall/" + ServiceUtil.getVdnId() + "/" + userName + "/mediafile?callId="+callId+"&isNeedConfirm=false"
        		+"&chatId=1&remark=test";
        
        Map<String, Object> result = Request.postMedia(userName, url, mediaData, fileName);
        LOG.debug("userName = "+LogUtils.encodeForLog(userName)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        
        return StringUtils.beanToJson(result);
    }
    
    /**
     * download file method
     * @param userName
     * @param filePath
     * @return
     */
    public static String downloadFile(String userName,String filePath)
    {
    	String resp = StringUtils.EMPTY_STRING;
    	if (StringUtils.isNullOrBlank(filePath) || StringUtils.isNullOrBlank(userName))
    	{
    		LOG.error("filePath or userName is null");
    		return resp;
    	}
    	
    	filePath = Normalizer.normalize(filePath, Form.NFKC);
        String url = ServiceUtil.getPrefix() + "realtimecall/" + ServiceUtil.getVdnId() + "/" + userName + "/mediafile?filePath="+filePath;
        
        int suffixBegin = filePath.lastIndexOf(".");
        String suffix = filePath.substring(suffixBegin);
        resp = Request.getMedia(userName, url,suffix); 
        return resp;
    }
    
    
    /**
     * user cancel queue method
     * request method : DELETE
     * @param userName
     * @param callId
     * @return
     */
    public static String cancelQueue(String userName,String callId)
    {
        String url = ServiceUtil.getPrefix() + "realtimecall/" + ServiceUtil.getVdnId() + "/" + userName + "/docancelqueuecall?callId="+callId;
        
        Map<String, Object> result = Request.delete(userName,url,null);
        LOG.debug("userName = "+LogUtils.encodeForLog(userName)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        return StringUtils.beanToJson(result);
    }    
}
