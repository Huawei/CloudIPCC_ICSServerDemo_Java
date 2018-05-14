package com.huawei.userdemo.servlet;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.demo.request.Request;
import com.huawei.userdemo.service.ServiceUtil;
import com.huawei.demo.config.ConfigProperties;


/**
 * <p>Title: Listener for initialization </p>
 * <p>Description: Listener for initialization </p>
 */
public class InitServletListener implements ServletContextListener
{
	private static final Logger LOG = LoggerFactory.getLogger(InitServletListener.class);
    
	@Override
    public void contextDestroyed(ServletContextEvent arg0)
    {
		
    }

	@Override
    public void contextInitialized(ServletContextEvent arg0)
    {
        boolean loadConfig = ConfigProperties.loadConfig();
        if (!loadConfig)
        {
            LOG.error("load config failed");
        }
        
        ServiceUtil.serviceInit();
        Request.init();
	    
		LOG.info("contextInitialized detected.");
    }
}
