
	
$(function(){
	
	$("#requestMeeting").click(function()
	{
		var userName = global_userName;
	    var callId = global_callId;
	    if (!isValidUserName(userName))
	    {
	        return;
	    }
	    requestMeeting(userName,callId);
	});
	
    $("#leaveConf").click(function()
    {
    	leaveConf();
    });
    
	$("#stopMeeting").click(function()
	{
		var userName = global_userName;
		var confId = global_confId;
		if (!isValidUserName(userName))
		{
			return;
		}
		var result = terminateConf();
		if ("0" == result) {
			stopMeeting(userName,confId);
		}
	});
	
	//屏幕共享
	$("#startShareScreen").click(function(){
		startShareScreen();		
	});
	
	$("#storeShareFile").click(function(){
		var addressInfo = prompt("please input local path","");
		storeShareFile(addressInfo);		
	});
	
	$("#stopShareScreen").click(function(){
		stopShareScreen();		
	});
	
	$("#requestControl").click(function(){
		requestControl();		
	});
	
	$("#previousPage").click(function(){
		previousPage();
	});
	
	$("#nextPage").click(function(){
		nextPage();
	});
	
	
	$("#addOperationPrivilege").click(function(){
		if ("" ==meetingAgentId) {
			var requester = prompt("The one you add operation privilege:","");
			addOperationPrivilege(requester);		
		} else {
			addOperationPrivilege(meetingAgentId);		
		}
	});
	
	$("#deleteOperationPrivilege").click(function(){
		var requester = meetingAgentId;
		deleteOperationPrivilege(requester);
	});
	
	$("#refuseControl").click(function(){
		var requester = meetingAgentId;
		refuseControl(requester);
	});
	
	//文档共享
	$("#startShareFile").click(function(){
		startShareFile();		
	});
	
	$("#storeShareFile").click(function(){
		storeShareFile();		
	});
	
	$("#stopShareFile").click(function(){
		stopShareFile();		
	});
	
	
	
});


/****************************conferenceOCX method***********************************************/
var ConferenceOcx; //Multimedia control
var WndUiOcx; //Window control(Non-commercial product,ISV needs to develop on demand)

var screenShareWndMap; //key:window describe;value:hwnd
var fileShareWndMap;
var meetingAgentId=""; //与会坐席
var shareFileId; //共享文档id
var shareFileName;
var shareFileDisplaySize = {
		sWidth : 1000,
        sHeight : 1000
};

function init_conf()
{
	ConferenceOcx = document.getElementById("ConferenceOcx");
	WndUiOcx = document.getElementById("WndUiOcx");
	desktopShareWndMap = new HashMap();
	fileShareWndMap = new HashMap();
	
	
	screenShareWndMap = new HashMap();
	fileShareWndMap = new HashMap();
	
	var screenShareHwndInfo = WndUiOcx.CreateWnd("屏幕共享窗口用户");
	var screenShareHwnd = JSON.parse(screenShareHwndInfo).hWnd;
	screenShareWndMap.put("屏幕共享窗口用户",screenShareHwnd);
	
	var fileShareHwndInfo = WndUiOcx.CreateWnd("文档共享窗口用户");
	var fileShareHwnd = JSON.parse(fileShareHwndInfo).hWnd;
	fileShareWndMap.put("文档共享窗口用户",fileShareHwnd);
	
	var result = ConferenceOcx.SetDisplayShareScreenWnd(screenShareHwnd);
	
	var result = ConferenceOcx.ShareFileSetDisplayWnd(fileShareHwnd);
}

	
function joinConf()
{
	var split=global_confInfo.split("|");
	var userId = split[1].substring(7);
	global_userId = userId;
	var result = ConferenceOcx.JoinConf(global_confInfo);
}

function leaveConf()
{
	ConferenceOcx.LeaveConf();
}

function terminateConf()
{
	ConferenceOcx.TerminateConf();
}



function showDesktopShareScreen()
{
	WndUiOcx.ShowWnd(screenShareWndMap.get("屏幕共享窗口用户"),"820","490");
}

function closeDesktopShareScreen()
{
	WndUiOcx.HideWnd(screenShareWndMap.get("屏幕共享窗口用户"));
}

function showShareFileWnd()
{
	var result = ConferenceOcx.ShareFileSetDisplaySize(1000,1000);
	WndUiOcx.ShowWnd(fileShareWndMap.get("文档共享窗口用户"),1020,1040);
}

function closeShareFileWnd()
{
	WndUiOcx.HideWnd(fileShareWndMap.get("文档共享窗口用户"));
}

function showApplication(hwnd)
{
	var result = ConferenceOcx.AddApplicationToShare(hwnd);
}

function startShareScreen()
{
	var screenShareType = $("#screenShareType").val();
	ConferenceOcx.StartShareScreen(screenShareType);
}

function stopShareScreen()
{
	ConferenceOcx.StopShareScreen();
}

function requestControl()
{
	var result = ConferenceOcx.RequestOperationPrivilege("remotectl");
}

function addOperationPrivilege(requester)
{
	var result = ConferenceOcx.SetOperationPrivilege(requester,"remotectl","Add");
	if (0 != result) 
	{
		meetingAgentId ="";
	}
	else
	{
		meetingAgentId = requester;
	}
}

function deleteOperationPrivilege(requester)
{
	var result = ConferenceOcx.SetOperationPrivilege(requester,"remotectl","Delete");
	if (0 == result) {
		meetingAgentId ="";
	}
}

function refuseControl(requester)
{
	var result = ConferenceOcx.SetOperationPrivilege(requester,"remotectl","Reject");
	if (0 == result) {
		meetingAgentId = "";
	}
}

//文档共享
function startShareFile()
{
	var sFileName = $("#shareFilePath").val();
	if ("" == sFileName)
	{
		alert("shareFilePath is empty");
		return;
	}
	var result = ConferenceOcx.ShareFileSetDisplaySize(shareFileDisplaySize.sWidth,shareFileDisplaySize.sHeight);
	WndUiOcx.ShowWnd(fileShareWndMap.get("文档共享窗口用户"),1020,1040);
	var result = ConferenceOcx.ShareFileOpen(sFileName);
}

function  clearConfResource()
{
    WndUiOcx.HideWnd(screenShareWndMap.get("屏幕共享窗口用户"));
	WndUiOcx.HideWnd(fileShareWndMap.get("文档共享窗口用户"));
}

function closeShareFileWind()
{
	shareFileId="";
	shareFileName="";
	WndUiOcx.HideWnd(fileShareWndMap.get("文档共享窗口用户"));
}

function stopShareFile()
{
	var result = ConferenceOcx.ShareFileClose(shareFileId);
	$("#currentPage").empty();
	$("#totalPage").empty();
	closeShareFileWind();
}

function storeShareFile(addressInfo)
{
	var result = ConferenceOcx.ShareFileSave (shareFileId, addressInfo);
}

function previousPage()
{
	var result = ConferenceOcx.ShareFilePreviousPage(shareFileId,1);
}

function nextPage()
{
	var result = ConferenceOcx.ShareFileNextPage(shareFileId,1);
}

function SpecifiedPage(sPageNo)
{
	var result = ConferenceOcx.ShareFileSpecifiedPage(shareFileId,sPageNo,0);
}

/**************************conferenceOCX method*********************************************/

/*
 * request meeting
 */
function requestMeeting(userName,callId)
{
	$.post("/"+WEB_NAME+"/multimedia.do",
	{
		identityMark : userName,
    	callId : callId,
		type : "REQUESTMEETING"
	},function(data){
		writeLog("[request meeting]"+data);		
	});
}

/*
 * stop meeting
 */
function stopMeeting(userName,confId)
{
	$.post("/"+WEB_NAME+"/multimedia.do",
	{
		identityMark : userName,
		confId : confId,
		type : "STOPMEETING"
	},function(data){
		writeLog("[stop meeting]"+data);
	});
}

/*
 * report result
 */
function JoinConfResult(confId, resultCode)
{
    var userName = $("#userName").val();
    if (!isValidUserName(userName) )
    {
        return;
    }
    
	$.post("/"+WEB_NAME+"/multimedia.do",
	{
		identityMark : userName,
		confId : confId,
		resultCode : resultCode,
		cause : 0,
		type : "REPORTRESULT"
	},function(data){
		writeLog("[report result]"+data);		
	});
}

/*
 * the member list in conference
 */
function addToMemberList(userId)
{
	var member = "<a href=\"#\" id=\"member_"+userId+"\">"+userId+"&nbsp;</a>";
	document.getElementById("memberList").innerHTML += member;
}

/*
 * remove from list
 */
function removeFromMemberList(userId)
{
	var elem = document.getElementById("member_"+userId);
	elem.parentNode.removeChild(elem);
}

/*
 * clear member list
 */
function clearMemberList()
{
	document.getElementById("memberList").innerHTML = "会议成员：";
}


function sleep(milliSeconds) 
{
	var startTime = new Date().getTime();
	while (new Date().getTime() < startTime + milliSeconds);
}

