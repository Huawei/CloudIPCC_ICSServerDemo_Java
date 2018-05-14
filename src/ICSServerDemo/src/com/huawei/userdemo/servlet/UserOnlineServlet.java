package com.huawei.userdemo.servlet;

import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.Map;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.demo.common.GlobalObjects;
import com.huawei.demo.request.Request;
import com.huawei.demo.util.StringUtils;
import com.huawei.userdemo.service.UserOnlineService;

public class UserOnlineServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private static final Logger LOG = LoggerFactory.getLogger(UserOnlineServlet.class);

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
     *      response)
     */
    protected void doPost(HttpServletRequest request,HttpServletResponse response) 
    {
        try
        {
            try 
            {
                request.setCharacterEncoding("utf-8");
            } 
            catch (UnsupportedEncodingException e1) 
            {
                LOG.error("request set character encoding error");
            }
            response.setCharacterEncoding("utf-8");
            response.setContentType("text/html");
            
            String type = request.getParameter("type"); 
            String userName = request.getParameter("identityMark");
            String result = StringUtils.EMPTY_STRING;
            
            if (StringUtils.isNullOrBlank(userName))
            {
                LOG.warn("username is null or blank");
                return;
            }
            if (StringUtils.isNullOrBlank(type))
            {
                LOG.warn("type is null or blank");
                return;
            }
            
            switch(type)
            {
            case "LOGIN" :
                
                result = UserOnlineService.login(userName);
                Map<String, Object> loginRes = StringUtils.jsonToMap(result);
                if ("0".equals(loginRes.get("retcode")))
                {
                    HttpSession session = request.getSession();
                    String sessionId = session.getId();
                    GlobalObjects.COOKIE_MAP.put(userName, sessionId);
                }           
                break; 
                
            case "LOGOUT":
                result = UserOnlineService.logout(userName);
                Map<String, Object> res1 = StringUtils.jsonToMap(result);
                if ("0".equals(res1.get("retcode")))
                {
                    HttpSession session = request.getSession();
                    session.invalidate();
                }
                break;
                
            default:
                break;
            }
            
            PrintWriter out = null;
            try
            {
                out = response.getWriter();
                out.println(result);
            }
            catch(Exception e)
            {
                LOG.error("PrintWriter println Error");
            }
            finally
            {
                if (null != out)
                {
                    try
                    {
                        out.flush();
                        out.close();
                    }
                    catch(Exception e)
                    {
                        LOG.error("Close PrintWriter error");
                    }
                }
            }

        }
        catch(Throwable throwable)
        {
            LOG.error("catch throwable at EventHandleServlet: ",throwable);
        }
    }

	
}
