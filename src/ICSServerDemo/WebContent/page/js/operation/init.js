
$(function() {
	    
    $("#Login").click(function() {
        var userName = $("#userName").val();
        if (!isValidUserName(userName))
        {
            return;
        }
       
        login(userName);
    });
    
    $("#Logout").click(function() {
        var userName = global_userName;
        if (!isValidUserName(userName))
        {
            return;
        }
        
        logout(userName);
    });
        
    //Clear Log Button
    $("#clearLog").click(function()
    {
    	 $("#LogInfo").val("");
    });
    
    //Clear chat record Button
    $("#textChatClear").click(function()
    {
    	$("#ChatTextBox").val("");
    });
});

/*
 * Agent Login
 */
function login(userName)
{
    $.post("/"+WEB_NAME+"/useronline.do", 
    {
    	identityMark : userName,
        type : "LOGIN"
    },
    function(data){
    	writeLog("[Login]"+data);
        var retcode = (JSON.parse(data)).retcode;
        switch(retcode)
        {
        case global_resultCode_SUCCESSCODE:
            global_userName = userName;
            setTimeout('getEventLisnter()', 500);//Start a thread to get agent event
            break;
        }
    });
}

/*
 * Agent logout 
 */
function logout(userName)
{
    $.post("/"+WEB_NAME+"/useronline.do", 
    {
    	identityMark : userName,
        type : "LOGOUT"
    },
    function(data){ 
    	writeLog("[Logout]"+data);
        var retcode = (JSON.parse(data)).retcode;
        switch(retcode)
        {
        case global_resultCode_SUCCESSCODE:
        	$("#status").html("Not login");
            $("#status").css('color','black');
            global_userName = "";
            break;
        }
    });
}

function OnClickMediaType()
{
	var mediaType = document.getElementById("mediaType").value;
	if (mediaType == "1")
	{
		$("#isVideoSpan").hide();
		$("#isVideo").hide();
	}
	if (mediaType == "2")
	{
		
		$("#isVideoSpan").show();
		$("#isVideo").show();
	}
	
}

