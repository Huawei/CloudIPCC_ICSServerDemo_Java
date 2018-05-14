// 获取事件
var getEventLisnter = function()
{
    if (global_userName == "")
    {
        return;
    }
    
    $.post('/'+WEB_NAME+'/event.do', 
    {
    	identityMark : global_userName
    },
    function(data)
    {
        try
        {   
            if (data == null || data == "")
            {
                setTimeout("getEventLisnter()", 500);
                return;
            }
            
            var event = JSON.parse(data);
            if (event == undefined || null == event || event.length == 0)
            {
                setTimeout("getEventLisnter()", 500);
                return;
            }
            /*
             * net work error, get RELOGIN mark.
             * next login request get net work error remind.
             */
            if ("RELOGIN"==event.message)
        	{
            	Process_ExceptionLogout();
        	}
            
            var eventType = event.eventType;
            if (eventType == undefined || null == eventType || eventType.length == 0)
            {
                setTimeout('getEventLisnter()', 500);
                return;
            }
            
            eventHandle(event);
            getEventLisnter();
        }
        catch(err)
        {
            setTimeout("getEventLisnter()", 500);
        }
    });    
};


function eventHandle(event)
{
    var eventType = event.eventType;
    writeLog(JSON.stringify(event));
    switch(eventType)
    {
        case "WECC_PROVIDER_IN_SERVER":  //登录成功
            Process_IN_SERVER();
            break;
        case "WECC_PROVIDER_SHUTDOWN":   //登出成功
            Process_SHUTDOWN();
            break;
        case "WECC_USER_LONGTIME_NOOPERATE":   //用户长时间久不操作
            break;
            
        case "WECC_WEBM_CALL_CONNECTED":   //呼叫建立成功
            Process_CALL_CONNECTED(event.content);
            break;    
        case "WECC_WEBM_CALL_DISCONNECTED":  //呼叫断连
            Process_CALL_DISCONNECTED(event.content);
            break;
        case "WECC_WEBM_CALL_QUEUING":  //呼叫排队等待
            Process_CALL_QUEUING();
            break;
        case "WECC_WEBM_QUEUE_TIMEOUT":  //排队超时
            break;
        case "WECC_WEBM_CANCEL_QUEUE":  //用户取消排队
            Process_CANCEL_QUEUE();
            break;
        case "WECC_WEBM_CALL_FAIL":  //呼叫失败
        	break;  
        case "WECC_WEBM_CALL_TRANSFER":  //呼叫转移
            break; 
        case "WECC_CHAT_POSTDATA_SUCC":  //发送消息成功
            break;
        case "WECC_CHAT_POSTDATA_FAIL":  //发送消息失败
            break;
        case "WECC_CHAT_RECEIVEDATA":  //接收到座席消息
            Process_RECEIVEDATA(event.content.sender, event.content.chatContent);
            break;
        case "WECC_MEETING_PREPARE_JOIN":  //准备加入多媒体会议
        	Process_JoinConf(event.content);
        	joinConf();
            break;
        case "WECC_MEETING_STOP":  //会议结束通知事件
        	Process_meetingStop(event.content);
            break;
        case "WECC_MEETING_STATUS":  //会议状态通知事件
        	
            break;
            
        default:
            break;
    }

}
