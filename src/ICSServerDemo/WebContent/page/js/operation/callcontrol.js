
$(function(){
	
	$("#call").click(function(){
        var userName = global_userName;
        var mediaType = $("#mediaType").val();
        var accessCode = $("#accessCode").val();
        var callData = $("#callData").val();
        var verifyCode = $("#verifyCode").val();
        var uvid = $("#uvid").val();
        if (!isValidUserName(userName)  
        		|| IsNullOrBlank(mediaType) || !isValidAccessCode(accessCode))
        {
            return;
        }
        if (IsNullOrBlank(uvid))
        {
        	uvid = "-1";
        }
		call(userName,mediaType,accessCode,verifyCode,callData,uvid);
	});
	
	$("#release").click(function(){
        var userName = global_userName;
        var callId = document.getElementById("releaseCallidChoose").value;
        if (!isValidUserName(userName) || IsNullOrBlank(callId))
        {
            return;
        }
		release(userName,callId);
	});
	
	$("#cancelQueue").click(function(){
        var userName = global_userName;
        var callId = global_callId;
        if (!isValidUserName(userName) 
        		|| IsNullOrBlank(global_callId))
        {
            return;
        }
		cancelQueue(userName,callId);
	});
	
	$("#textChatSend").click(function(){
        var userName = global_userName;
        var callId = global_callId;
        var content = $("#ChatMessage").val();
        if (!isValidUserName(userName) 
        		|| IsNullOrBlank(global_callId) || IsNullOrBlank(content))
        {
            return;
        }
		sendMessage(userName,callId,content);
	});
	
	$("#fileUpload").click(function(){
        var userName = global_userName;
        var callId = global_callId;
        if (!isValidUserName(userName) 
        		|| IsNullOrBlank(global_callId))
        {
            return;
        }
        fileUpload(userName,callId);
	});
	
	$("#fileDownload").click(function()
    {
        var userName = global_userName;
    	var filePath = $("#filePath").val();
    	if (!isValidUserName(userName) 
        		|| IsNullOrBlank(filePath))
        {
            return;
        }
        fileDownload(userName,filePath);
    });
	
	$("#getVerifyCode").click(function()
	{
        var userName = global_userName;
        if (!isValidUserName(userName))
        {
            return;
        }
        getVerifyCode(userName);
	});
});

/*
 * create realtime call
 */
function call(userName,mediaType,accessCode,verifyCode,callData,uvid)
{
	$.post("/"+WEB_NAME+"/quasirealtimecall.do",
	{
		identityMark : userName,
    	mediaType : mediaType,
    	accessCode : accessCode,
    	verifyCode : verifyCode,
    	callData : callData,
    	uvid : uvid,
		type : "CALL"
	},function(data){
		writeLog("[creat call]"+data);
		var res = JSON.parse(data);
		switch(res.retcode)
		{
		case "0" :
			global_callId = res.result;
			break;		
		}
	});
}

/*
 * release call
 */
function release(userName,callId)
{
	$.post("/"+WEB_NAME+"/quasirealtimecall.do",
	{
		identityMark : userName,
    	callId : callId,
		type : "RELEASE"
	},function(data){
		writeLog("[release call]"+data);		
	});
}

/*
 * cancel queue
 */
function cancelQueue(userName,callId)
{
	$.post("/"+WEB_NAME+"/quasirealtimecall.do",
	{
		identityMark : userName,
    	callId : callId,
		type : "CANCELQUEUE"
	},function(data){
		writeLog("[cancel queue]"+data);		
	});
}

/*
 * send message
 */
function sendMessage(userName,callId,content)
{
	$.post("/"+WEB_NAME+"/quasirealtimecall.do",
	{
		identityMark : userName,
    	callId : callId,
    	content : content,
		type : "SENDMESSAGE"
	},function(data){
		writeLog("[send message]"+data);
		var res = JSON.parse(data);
		switch(res.retcode)
		{
		case "0" :
			UpdateWhenChatContentSent(content);
			break;		
		}
	});
}

/*
 * file upload
 */
function fileUpload(userName,callId)
{
	var fd = new FormData();
	var url = "/"+WEB_NAME+"/quasirealtimecall.do?identityMark="+userName+"&callId="+callId+"&type=FILEUPLOAD&timeStamp=" + new Date().getTime();
	var input = $("#upfile").get(0);
	if (!input.value)
	{
		return;
	}
	fd.append('file', input.files[0]);
    $.ajax({
    	url : url,
    	type : 'post',
    	data : fd,
    	processData : false,
    	contentType : false,
    	success : function(data)
    	{
    		writeLog("[file upload]"+data);
    	}
    });
}

/*
 * File Download
 */
function fileDownload(userName,filePath)
{
	//first : download file from agentgateway
    $.post("/"+WEB_NAME+"/quasirealtimecall.do", 
    {
    	identityMark : userName,
    	filePath : filePath,
        type : "FILEDOWNLOAD"      
    },function(data)
    {
    	writeLog("[file download]"+data);
    	//second :download file from tomcat 
    	window.location.href="/"+WEB_NAME+"/quasirealtimecall.do?identityMark="+userName+"&filePath="+data;
    });
    
}

/*
 *get VerifyCode
 */
function getVerifyCode(userName)
{
	$.post("/"+WEB_NAME+"/verifiycode.do",
	{
    	identityMark : userName,
    	type : "GETVERIFYCODE"
	},function(data)
	{
		var res = JSON.parse(data);
		writeLog("[get verifycode] result: "+res.retcode);
		switch(res.retcode)
		{
		case "0" :
			var imgResult = "data:image/jpeg;base64," + res.result;
			$("#verifyCodeImg").attr('src',imgResult);
			break;		
		}
	});

}


function callidChooseOperation(operation,callid)
{
	var obj = document.getElementById("releaseCallidChoose");
	switch(operation)
	{
	case "add" :
		if (null != callid)
		{
			obj.options.add(new Option(callid,callid));
		}
		return obj.options.length;
		break;
	case "del":
		var len = obj.options.length;
		var values = new Array();
		for(var i=0; i<len; i++)
		{
			if (obj.options[i].value == callid)
			{
				continue;
			}
			values.push(obj.options[i].value);
		}
		obj.options.length=0;
		for(var i=0; i<values.length;i++)
		{
			obj.options.add(new Option(values[i],values[i]));
		}
		return obj.options.length;
		break;
	}
}


function refreshCallIdChoice(map)
{
	var obj = document.getElementById("releaseCallidChoose");
	obj.empty();
	for(var key in map)
	{
		obj.options.add(new Option(map[key],key));
	}
}



