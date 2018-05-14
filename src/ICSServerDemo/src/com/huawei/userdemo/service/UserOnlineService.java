package com.huawei.userdemo.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.demo.bean.ProcessMessageQueue;
import com.huawei.demo.common.GlobalObjects;
import com.huawei.demo.request.Request;
import com.huawei.demo.util.LogUtils;
import com.huawei.demo.util.StringUtils;

public class UserOnlineService {

	/**
	 * log
	 */
	private static final Logger LOG = LoggerFactory.getLogger(UserOnlineService.class);
	
	/**
	 * user login method
	 * request method : POST
	 * @param userName
	 * @return
	 */
	public static String login(String userName)
	{
		String url = ServiceUtil.getPrefix() + "onlinewecc/" + ServiceUtil.getVdnId() + "/" + userName + "/login";        

		String resp = StringUtils.EMPTY_STRING;        

		Map<String, Object> loginParam = new HashMap<String, Object>();
		if (!ServiceUtil.isPullFromICS())
		{
			loginParam.put("pushUrl",ServiceUtil.getPushURL());
		}
		
		LOG.debug("userName = "+LogUtils.encodeForLog(userName)+" received message:loginParam:"+LogUtils.encodeForLog(Request.beanToJson(loginParam)));
		Map<String, Object> result = Request.post(userName,url, loginParam);
		LOG.debug("userName = "+LogUtils.encodeForLog(userName)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));
		resp = StringUtils.beanToJson(result);
		if ("0".equals(result.get("retcode")))
		{
			if (!GlobalObjects.LOGINED_MAP.containsKey(userName))
			{
				GlobalObjects.LOGINED_MAP.put(userName, new ProcessMessageQueue());   // create a event queue for every logged in agent
			}
			if (ServiceUtil.isPullFromICS())
			{//pull mode
				if (!GlobalObjects.EVENT_THREAD_MAP.containsKey(userName))
				{
					GetEventThread thread = new GetEventThread(userName);      // create a get event thread for every logged in agent
					thread.begin();
					GlobalObjects.EVENT_THREAD_MAP.put(userName, thread);
				}
			}
			else
			{//push mode
				if (!GlobalObjects.EVENT_HEART_MAP.containsKey(userName))
				{
					HeartBeatThread thread = new HeartBeatThread(userName);      // create a heat beat thread for every logged in agent
					thread.begin();
					GlobalObjects.EVENT_HEART_MAP.put(userName, thread);
				}
			}
			LOG.info(LogUtils.encodeForLog(userName) + " login success");
		}
		else 
		{
			LOG.info(LogUtils.encodeForLog(userName) + " login failed ---" + LogUtils.encodeForLog(resp));
			ServiceUtil.clearResourse(userName);
		}
		return resp;
	}    

	/**
	 * user logout method
	 * request method : DELETE
	 * @param userName
	 * @return
	 */
	public static String logout(String userName)
	{
		String url = ServiceUtil.getPrefix() + "onlinewecc/" + ServiceUtil.getVdnId() + "/" + userName + "/logout";
		String resp = StringUtils.EMPTY_STRING;
		
		Map<String, Object> result = Request.delete(userName,url,null);
		LOG.debug("userName = "+LogUtils.encodeForLog(userName)+" return message:"+LogUtils.encodeForLog(Request.beanToJson(result)));

		resp = StringUtils.beanToJson(result);
		if ("0".equals(result.get("retcode")))
		{
			ServiceUtil.clearResourse(userName);
			LOG.info(LogUtils.encodeForLog(userName) + " logout success");
		}
		else 
		{
			LOG.info(LogUtils.encodeForLog(userName) + " logout failed ---" + LogUtils.encodeForLog(resp));
		}
		return resp;
	}
}
