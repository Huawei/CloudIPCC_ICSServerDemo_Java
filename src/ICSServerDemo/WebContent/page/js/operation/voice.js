/*
 * voice.ocx Interface
 */
var VTMCtl ;
var WndUiOcx; //Window control(Non-commercial product,ISV needs to develop on demand)
var videoWndMap; //key:conf member;value:hwnd

function init_voice()
{
	VTMCtl = document.getElementById("VoiceOcx");
	SetConfig();
    SetSipInfo();
    SetLocalInfo();
    init_video();
}

function init_video()
{
	VideoWndUi = document.getElementById("WndUiOcx");
	videoWndMap = new HashMap();
	var localHwndInfo = VideoWndUi.CreateWnd("用户侧本地视频");		
	var localHwnd = JSON.parse(localHwndInfo).hWnd;
	videoWndMap.put("用户侧本地视频", localHwnd);
	var remoteHwndInfo = VideoWndUi.CreateWnd("用户侧对端视频");		
	var remoteHwnd = JSON.parse(remoteHwndInfo).hWnd;
	videoWndMap.put("用户侧对端视频", remoteHwnd);

	var result = VTMCtl.SetVideoWindow('{"localVideoWindow":"'+localHwnd+'","remoteVideoWindow":"'+remoteHwnd+'"}');
}

function SetConfig()
{	
	VTMCtl.SetConfig("CALL_D_CFG_SIP_SESSIONTIMER_ENABLE","1");
	VTMCtl.SetConfig("CALL_D_CFG_AUDIO_AEC","1");
	VTMCtl.SetConfig("CONFIG_AUTO_REGISTER_ENABLE","0");
	VTMCtl.SetConfig("CALL_D_CFG_SIP_SESSIONTIME","3600");
}

function SetSipInfo()
{
    var result = VTMCtl.SetSipServerInfo(global_SipServerIP, global_SipServerPort, "");
    if (0 != result)
	{
    	writeLog("VOICE_OCX-SetSipInfo() : " + result);
	}    
}

function SetLocalInfo()
{
    var result = VTMCtl.SetLocalInfo(global_LocalIP, global_LocalSipPort, global_LocalAudioPort);
    if (0 != result)
	{
    	writeLog("VOICE_OCX-SetLocalInfo() : " + result);
	}    
}

function voiceLogin()
{
	var passwd = $("#Phonepassword").val();
	var Account = $("#phonenumber").val();
	var Mode = "1";
	var result = VTMCtl.Register(Account, passwd, Mode);
	if (0 != result)
	{
    	writeLog("VOICE_OCX-Register() : " + result);
	} 
}

function voiceLogout()
{
	var result = VTMCtl.Deregister();
	if (0 != result)
	{
    	writeLog("VOICE_OCX-Deregister() : " + result);
	} 
}

function AnonymousCall(Callee,isVideo)
{
    if ("1" == isVideo)
	{
		var str = '{"anonymousCard":"'+global_AnnonymousCard+'","callee":"'+Callee+'","isVideo":"'+isVideo+'"}';
		var result = VTMCtl.AnonymousCallEx(str);
		if (0 != result)
		{
			writeLog("VOICE_OCX-AnonymousCallEx("+ Callee +") : " + result);
		}  
	}
	else
	{
		var result = VTMCtl.AnonymousCall(global_AnnonymousCard,Callee);
		if (0 != result)
		{
			writeLog("VOICE_OCX-AnonymousCall("+ Callee +") : " + result);
		} 
	}      
}

function phoneAnswer(callId,isVideo)
{
	var str = '{"callid":"'+callId+'",'+'"isVideo":"'+isVideo+'"}';
	
	if ($("#isVideoAgent").attr("checked"))
	{
		var result = VTMCtl.AnswerEx(str);
		if (0 != result)
		{
			writeLog("VOICE_OCX-AnswerEx() : " + result);
		}    
	}
	else
	{
		var result = VTMCtl.Answer(callId);
		if (0 != result)
		{
			writeLog("VOICE_OCX-Answer() : " + result);
		}  
	}
}

function phoneRelease(callId)
{
	var result = VTMCtl.Release(callId);
	if (0 != result)
	{
    	writeLog("VOICE_OCX-Release() : " + result);
	} 
}

function showMemberVideo()
{
	var members = videoWndMap.keys();
	var videoWndHwnds = videoWndMap.values();
	for(var i=0;i<members.length;i++)
	{
		WndUiOcx.ShowWnd(videoWndHwnds[i],352,288);
	}
}

function stopVideo()
{
	var members = videoWndMap.keys();
	var videoWndHwnds = videoWndMap.values();
	for(var i=0;i<members.length;i++)
	{
		WndUiOcx.HideWnd(videoWndHwnds[i]);
	}
}