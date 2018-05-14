package com.huawei.userdemo.service;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.demo.request.Request;
import com.huawei.demo.util.LogUtils;
import com.huawei.demo.util.StringUtils;

public class VerifiyCodeService {
	
    /**
     * log
     */
    private static final Logger LOG = LoggerFactory.getLogger(QuasiRealTimeCallService.class);	
	
    /**
     * Obtain the verification code before the user initiates a call, and check the verification code in the call initiation interface.
     * @param userName
     * @return
     */
	public static String getVerifyCode(String userName) {
		String url = ServiceUtil.getPrefix() + "verifycode/" + ServiceUtil.getVdnId() + "/" + userName + "/verifycodeforcall";
		
		Map<String, Object> result = Request.get(userName, url);
		LOG.debug("userName = "+LogUtils.encodeForLog(userName)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
        
        return StringUtils.beanToJson(result);
	}

}