package com.huawei.userdemo.servlet;

import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.demo.util.StringUtils;
import com.huawei.userdemo.service.MultiMediaConfService;

public class MultiMediaConfServlet extends HttpServlet
{

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static final Logger LOG = LoggerFactory.getLogger(MultiMediaConfServlet.class);
    
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MultiMediaConfServlet()
    {
        super();
        // TODO Auto-generated constructor stub
    }

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
            String callId = request.getParameter("callId");
            String confId = request.getParameter("confId");
            String resultCode = request.getParameter("resultCode");
            String cause = request.getParameter("cause");
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
            case "REQUESTMEETING":
                if (StringUtils.isNullOrBlank(callId))
                {
                    LOG.warn("callId is null or blank");
                    return;
                }
                result = MultiMediaConfService.requestMeeting(userName,callId);
                break;
                
            case "STOPMEETING":
                if (StringUtils.isNullOrBlank(confId))
                {
                    LOG.warn("confId is null or blank");
                    return;
                }
                result = MultiMediaConfService.stopMeeting(userName,confId);
                break;
                
            case "REPORTRESULT":
                if (StringUtils.isNullOrBlank(confId))
                {
                    LOG.warn("confId is null or blank");
                    return;
                }
                if (StringUtils.isNullOrBlank(resultCode))
                {
                    LOG.warn("resultCode is null or blank");
                    return;
                }
                if (StringUtils.isNullOrBlank(cause))
                {
                    LOG.warn("cause is null or blank");
                    return;
                }
                result = MultiMediaConfService.reportResult(userName,confId,resultCode,cause);
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
