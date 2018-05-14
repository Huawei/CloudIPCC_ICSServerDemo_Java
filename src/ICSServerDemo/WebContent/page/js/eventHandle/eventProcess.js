
//登录成功执行
function Process_IN_SERVER()
{
    $("#status").html("login");
    $("#status").css('color','blue');
    
}

//登出成功执行
function Process_SHUTDOWN()
{
    $("#status").html("not login");
    $("#status").css('color','black');
    
    IN_CALL_QUEUE = false;
    global_userName = "";
    global_callId = "";
    
}

//异常签出处理
function Process_ExceptionLogout()
{
	$("#status").html("Not login");
    $("#status").css('color','black');            
    
    global_userName = "";
    alert("Please reLogin.");
}

//呼叫建立成功
function Process_CALL_CONNECTED(content)
{
    $("#status").html("Talking");
    $("#status").css('color','green');
    UpdateWhenChatContentCleared();
    $("#uvid").val(content.uvid);
    global_callId = content.callId;
    callidChooseOperation("add",content.callId);
    //当启用话机联动且已建立点击通话时，发起匿名呼叫
    if (2 == content.mediaType)
    {
    	var mediaType = $("#mediaType").val();
    	var isVideo = $("#isVideo").val();
    	if (2 == mediaType && "1" == isVideo)
		{
    		showMemberVideo();
		}
        AnonymousCall(content.clickToDial,isVideo);
    } 
   
}

//呼叫断连成功
function Process_CALL_DISCONNECTED(content)
{
	var callidNum = callidChooseOperation("del",content.callId);
	if (0 == callidNum)
	{
		$("#status").html("login");
		$("#status").css('color','blue');
		global_callId = "";
		IN_CALL_QUEUE = false;
		$("#uvid").val("-1");
	}
    //是否启用话机联动
    if (content.mediaType == "2")
    {
    	var mediaType = $("#mediaType").val();
    	var isVideo = $("#isVideo").val();
    	if (2 == mediaType && "1" == isVideo)
		{
    		stopVideo();
		}    	
        //挂断话机
        Release();
    }
}

//呼叫排队
function Process_CALL_QUEUING()
{
    $("#status").html("Queueing-webchat-"); 
    $("#status").css('color','red');
    IN_CALL_QUEUE = true;
}

//取消排队成功
function Process_CANCEL_QUEUE()
{
    if (IN_CALL_QUEUE)
    {
        $("#status").html("login");
        $("#status").css('color','blue');
        global_callId = "";
        IN_CALL_QUEUE = false;
    }
}

function Process_JoinConf(content)
{
	global_confId = content.confId;
	global_confInfo = content.confInfo;
	if (content.resultCode == 0 ) {
		alert("Process_JoinConf");
	}	
}

//清空历史
function UpdateWhenChatContentCleared() {
    $("#ChatTextBox").val("");
}

//将接收到的文字信息存放到交谈框中
function Process_RECEIVEDATA(sender, content) {
    var oldValue = $("#ChatTextBox").val();
    $("#ChatTextBox").val(oldValue + sender + ": " + content + "\n");
    
    var chatText = document.getElementById("ChatTextBox");
    chatText.scrollTop= chatText.scrollHeight * 12;
    var obj = JSON.parse(content);
    if (obj.filePath != null)
    {
    	$("#filePath").val(obj.filePath);
    }
}

//将主动发送的文字消息存放到交谈框中，并清空输入框内容
function UpdateWhenChatContentSent(content) {
    var oldValue = $("#ChatTextBox").val();
    $("#ChatTextBox").val(oldValue + global_userName + ": " + content + "\n");
    $("#ChatMessage").val("");
    
    var chatText = document.getElementById("ChatTextBox");
    chatText.scrollTop= chatText.scrollHeight * 12;
}
function Process_menberEnterConf(content)
{
	//保存会议用户id
	alert("Process_menberEnterConf");
	
}
        	
function Process_menberLeaveConf(content)
{
	alert("Process_menberLeaveConf");
	if (content.isSelf) {
		
	}else{
		//删除离开会议成员的id
		
	}
}

function Process_terminateConf(content)
{
    if (content.resultCode == 0 ) {
		alert("process_terminateConf");
	}	
}

function Process_meetingStop(content)
{
	if (content.resultCode == 0 ) {
		$("#memberList").empty();
		alert("Process_meetingStop");
	}else{
		leaveConf();
	}	
}

