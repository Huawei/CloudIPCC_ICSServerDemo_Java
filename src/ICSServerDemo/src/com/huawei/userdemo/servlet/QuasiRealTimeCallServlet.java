package com.huawei.userdemo.servlet;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.text.Normalizer;
import java.text.Normalizer.Form;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItemFactory;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;
import org.apache.tomcat.util.http.fileupload.servlet.ServletRequestContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.huawei.demo.request.Request;
import com.huawei.demo.util.FileUtil;
import com.huawei.demo.util.LogUtils;
import com.huawei.demo.util.StringUtils;
import com.huawei.userdemo.service.QuasiRealTimeCallService;

public class QuasiRealTimeCallServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private static final Logger LOG = LoggerFactory.getLogger(QuasiRealTimeCallServlet.class);
	
	   /**
     * @throws UnsupportedEncodingException 
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
     *      response)
     */
    protected void doGet(HttpServletRequest request,
            HttpServletResponse response)  
    {
        try
        {
            String filePath = request.getParameter("filePath");
            String identityMark = request.getParameter("identityMark");
            if (null == filePath || "".equals(filePath)) 
            {
                LOG.error("filePath is null or empity.");
                return;
            }
            filePath = Request.getProjectPath()+"/"+"file"+"/"+identityMark+"/"+filePath;         
            String prefix = Request.getProjectPath()+"/file";
            if (!FileUtil.isSafePath(filePath)&&filePath.startsWith(prefix)) 
            {
                LOG.info("filePath is invalid.");
                return;
            }
            filePath = FileUtil.checkFile(filePath);
            File file = new File(filePath);
                
            try
            {
                file = file.getCanonicalFile();
            }
            catch (IOException e)
            {
                LOG.error("IOException \r\n {}", LogUtils.encodeForLog(e.getMessage()));
                return;
            }
            if (file.exists())
            {
                FileInputStream in = null;
                ServletOutputStream out = null;
                try
                {
                    in = new FileInputStream(file);
                    response.addHeader("Cache-Control", "public");
                    response.addHeader("Pragma", "public");
                    String filename = java.net.URLEncoder.encode(file.getName(),"utf-8");
                    response.addHeader("Content-Disposition","attachment;filename=" + filename);
                    out = response.getOutputStream();
                    byte[] bt = new byte[1024];
                    int count;
                    while ((count = in.read(bt)) > 0)
                    {
                        out.write(bt, 0, count);
                    }
                }
                catch(FileNotFoundException e)
                {
                    LOG.error("FileNotFoundException \r\n {}", LogUtils.encodeForLog(e.getMessage()));
                }
                catch(UnsupportedEncodingException e)
                {
                    LOG.error("UnsupportedEncodingException \r\n {}", LogUtils.encodeForLog(e.getMessage()));
                }
                catch(IOException e)
                {
                    LOG.error("IOException \r\n {}", LogUtils.encodeForLog(e.getMessage()));
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
                            LOG.error("Close ServletOutputStream error");
                        }
                    }
                    if (null != in)
                    {
                        try
                        {
                            in.close();
                        }
                        catch(Exception e)
                        {
                            LOG.error("Close PrintWriter error");
                        }
                    }
                }
            }
        }
        catch(Throwable throwable)
        {
            LOG.error("catch throwable at QuasiRealTimeCallServlet: ",throwable);
        }
        
    }

	
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
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
            String userName = request.getParameter("identityMark");
            String mediaType = request.getParameter("mediaType");
            String accessCode = request.getParameter("accessCode");
            String verifyCode = request.getParameter("verifyCode");
            String callData = request.getParameter("callData");
            String callId = request.getParameter("callId");
            String content = request.getParameter("content");
            String type = request.getParameter("type");
            String filePath = request.getParameter("filePath");
            String uvid = request.getParameter("uvid");
            String result = StringUtils.EMPTY_STRING;
            
            if (StringUtils.isNullOrBlank(userName))
            {
                LOG.warn("workNo is null or blank");
                return;
            }
            if (StringUtils.isNullOrBlank(type))
            {
                LOG.warn("type is null or blank");
                return;
            }
            switch(type)
            {
            case "CALL":
                if (StringUtils.isNullOrBlank(mediaType))
                {
                    LOG.warn("mediaType is null or blank");
                    return;
                }
                if (StringUtils.isNullOrBlank(accessCode))
                {
                    LOG.warn("accessCode is null or blank");
                    return;
                }
                result = QuasiRealTimeCallService.doCreatCall(userName,mediaType,accessCode,verifyCode,callData,uvid);
                break;  
            case "RELEASE":
                if (StringUtils.isNullOrBlank(callId))
                {
                    LOG.warn("callId is null or blank");
                    return;
                }
                result = QuasiRealTimeCallService.releaseCall(userName,callId);
                break;
            case "CANCELQUEUE":
                if (StringUtils.isNullOrBlank(callId))
                {
                    LOG.warn("callId is null or blank");
                    return;
                }
                result = QuasiRealTimeCallService.cancelQueue(userName,callId);
                break;      
            case "SENDMESSAGE":
                if (StringUtils.isNullOrBlank(callId))
                {
                    LOG.warn("callId is null or blank");
                    return;
                }
                if (StringUtils.isNullOrBlank(content))
                {
                    LOG.warn("content is null or blank");
                    return;
                }
                result = QuasiRealTimeCallService.sendMessage(userName,callId,content);
                break; 
            case "FILEUPLOAD":
                ServletRequestContext requestContext = new ServletRequestContext(request);
                InputStream is = null;
                byte[] mediaData = null;
                FileItem item = null;
                try {
                    DiskFileItemFactory factory = new DiskFileItemFactory();
                    ServletFileUpload fileUpload = new ServletFileUpload(factory);          
                    List<FileItem> items = fileUpload.parseRequest(requestContext);
                    if (items.size() != 1)
                    {
                        result = "file upload failed, because FileItem is over one.";
                        break;
                    }
                    item = items.get(0);
                    if (item.isFormField())
                    {
                        result = "FileItem is form field.";
                        break;
                    }
                    
                    String fileName = item.getName();
                    
                    is = item.getInputStream();
                    mediaData = FileUtil.inputStreamToByte(is);
                    if (null != mediaData)
                    {
                        result = QuasiRealTimeCallService.uploadFile(userName,callId,mediaData,fileName);
                    }
                    else
                    {
                        result = "input stream to byte failed";
                    }
                    
                } 
                catch (FileUploadException e) 
                {
                    LOG.error("catch FileUploadException");
                }
                catch (IOException e)
                {
                    LOG.error("catch IOException");
                }
                finally
                {
                    if (null != is)
                    {
                        try
                        {
                            is.close();
                        }
                        catch (IOException e)
                        {
                            LOG.error("close inputstream failed");
                        }
                    }
                    if (null != item)
                    {
                        item.delete();
                    }
                }
                break;
                
            case "FILEDOWNLOAD":
                if (StringUtils.isNullOrBlank(filePath))
                {
                    LOG.warn("filePath is null or blank");
                    return;
                }
                result = QuasiRealTimeCallService.downloadFile(userName,filePath);
                if (StringUtils.isNullOrBlank(result))
                {
                    return;
                }
                break;
                
            default:
                break;
            }
            
            PrintWriter out = null;
            try
            {
                out = response.getWriter();
                out.println(encodeHtml(result));
              //  out.println(result);
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
	
	 private String encodeHtml(String result) 
	 {  
	        String normalize = Normalizer.normalize(result, Form.NFKC);
	        return normalize;
	  }  
}
