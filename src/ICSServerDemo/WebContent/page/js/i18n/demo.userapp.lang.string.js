// language string definition file
// Copyright Huawei Technologies Co., Ltd. 2016. All rights reserved.
/*
 * this file defines the language strings of diference language , 
 * the LangugePageClass has a public interface GetLanguagePage which returns the language string define page of specified language for self attributed  element. 
 *
 * Notice:
 * To Add a new language you need to as following
 * 1. In the LANGUGE_SUPPORT object , add a new member like LANGUAGE_SUPPORT_XXX:"XXX", NOTE That the javascript object members sperated by ","
 * 2. Copy the Language.English object definition, changes to Languge.XXX . Modify the member value to the string of specified string for language XXX
 * 3. In the GetLanguagePage method of LanguagePageClass, add an else if branch which enables the function to return the languagepage of specified language xxx.
 * 4. Done.
 */
//language supported  
LANGUAGE_SUPPORT = {
	LANGUAGE_SUPPORT_CHINESE:"Chinese",
	LANGUAGE_SUPPORT_ENGLISH:"English"
}

//LanguagePageClass
function LanguagePageClass()
{
	// function
	// desc: the function reture the language string define page for specified language
	// params：
	// [IN] lan : string of language
	// return： void
	this.GetLanguagePage = function(language){
		if (language === LANGUAGE_SUPPORT.LANGUAGE_SUPPORT_CHINESE){
			return LanguageString.Chinese;
		}
		else if (language === LANGUAGE_SUPPORT.LANGUAGE_SUPPORT_ENGLISH){
			return LanguageString.English;
		}
		else{
			return LanguageString.English;
		}
	}
}

var LanguageString = {};
LanguageString.Chinese = {
	I18N_USERAPPDEMO_INITIALIZE_INTERFACE:"初始化接口",
	I18N_USERAPPDEMO_USER_NAME:"用户名",
	I18N_USERAPPDEMO_CURRENT_STATE:"当前状态",
	I18N_USERAPPDEMO_LOGIN:"登录",
	I18N_USERAPPDEMO_CALL_LOGOUT:"登出",
	I18N_USERAPPDEMO_CALL_RELATED:"呼叫相关",
	I18N_USERAPPDEMO_VERIFYCODE:"验证码",
	I18N_USERAPPDEMO_GETVERIFYCODE:"获取验证码",
	I18N_USERAPPDEMO_MEDIATYPE:"媒体类型",
	I18N_USERAPPDEMO_WEBCHAT:"1-文字交谈",
	I18N_USERAPPDEMO_VOICECALL:"2-点击通话",
	I18N_USERAPPDEMO_CALLBACK:"4-电话回呼",
	I18N_USERAPPDEMO_VIDEO_OPTION:"是否视频",
	I18N_USERAPPDEMO_VIDEO_YES:"音视频模式",
	I18N_USERAPPDEMO_VIDEO_NO:"音频模式",
	I18N_USERAPPDEMO_ACCESSCODE:"接入码",
	I18N_USERAPPDEMO_CALLDATA:"随路数据",
	I18N_USERAPPDEMO_CALL:"呼叫",
	I18N_USERAPPDEMO_RELEASE:"释放",
	I18N_USERAPPDEMO_RELEASE_WHICH:"选择释放的呼叫",
	I18N_USERAPPDEMO_CANCEL_QUEUE:"取消排队",
	
	I18N_USERAPPDEMO_ICP20:"ICP2.0特性",
	I18N_USERAPPDEMO_UPLOAD_FILE:"上传文件",
	I18N_USERAPPDEMO_DOWNLOAD_FILE:"下载文件",
	I18N_USERAPPDEMO_FILE_PATH:"文件路径",
	I18N_USERAPPDEMO_WEBCHAT_RELATED:"文字交谈相关",
	I18N_USERAPPDEMO_MESSAGE:"消息",
	I18N_USERAPPDEMO_SEND_MESSAGE:"发送消息",
	I18N_USERAPPDEMO_CLEAR_CHAT_HISTORY:"清除聊天记录",
	
	I18N_USERAPPDEMO_MULTIMEDIA_RELATED:"多媒体相关",
	I18N_USERAPPDEMO_CONFERENCE_MEMBER:"会议成员",
	I18N_USERAPPDEMO_CREATE_MEETING:"创建会议",
	I18N_USERAPPDEMO_RELEASE_MEETING:"结束会议",
	I18N_USERAPPDEMO_SHARE_DESKTOP:"桌面共享",
	I18N_USERAPPDEMO_SHARE_APPLICATION:"程序共享",
	I18N_USERAPPDEMO_START_DESKTOP_SHARE:"开始桌面共享",
	I18N_USERAPPDEMO_STOP_DESKTOP_SHARE:"结束桌面共享",
	I18N_USERAPPDEMO_ASK_REMOTE_CTRL:"请求远程控制",
	I18N_USERAPPDEMO_ALLOW_REMOTE_CTRL:"赋予控制权限",
	I18N_USERAPPDEMO_STOP_REMOTE_CTRL:"收回控制权限",
	I18N_USERAPPDEMO_REFUSE_REMOTE_CTRL:"拒绝远程控制",
	I18N_USERAPPDEMO_DOCUMENT_SHARE_PATH:"共享文档绝对路径: ",
	I18N_USERAPPDEMO_DOCUMENT_SHARE_START:"发起文档共享",
	I18N_USERAPPDEMO_DOCUMENT_SHARE_SAVE:"保存共享文档",
	I18N_USERAPPDEMO_DOCUMENT_SHARE_STOP:"关闭文档共享",
	I18N_USERAPPDEMO_DOCUMENT_LAST_PAGE:"上一页",
	I18N_USERAPPDEMO_DOCUMENT_NEXT_PAGE:"下一页",
	I18N_USERAPPDEMO_LOG:"日志",
	I18N_USERAPPDEMO_LOG_CLEAR:"清空",
}
LanguageString.English = {
	I18N_USERAPPDEMO_INITIALIZE_INTERFACE:"Initialize Interface",
	I18N_USERAPPDEMO_USER_NAME:"UserName",
	I18N_USERAPPDEMO_CURRENT_STATE:"CurrentStatus: ",
	I18N_USERAPPDEMO_PHONE_STATE:"PhoneStatus",
	I18N_USERAPPDEMO_LOGIN:"Login",
	I18N_USERAPPDEMO_CALL_LOGOUT:"Logout",
	I18N_USERAPPDEMO_CALL_RELATED:"Call Related",
	I18N_USERAPPDEMO_MEDIATYPE:"Media Type",
	I18N_USERAPPDEMO_WEBCHAT:"1-WebChat",
	I18N_USERAPPDEMO_VOICECALL:"2-VoiceCall",
	I18N_USERAPPDEMO_CALLBACK:"4-CallBack",
	I18N_USERAPPDEMO_VIDEO_OPTION:"Video Ability",
	I18N_USERAPPDEMO_VIDEO_YES:"Audio&Video Mode",
	I18N_USERAPPDEMO_VIDEO_NO:"Audio Mode",
	I18N_USERAPPDEMO_ACCESSCODE:"AccessCode",
	I18N_USERAPPDEMO_CALLDATA:"Call Data",
	I18N_USERAPPDEMO_CALL:"Call",
	I18N_USERAPPDEMO_RELEASE:"Release",
	I18N_USERAPPDEMO_RELEASE_WHICH:"Which Call To Release",
	I18N_USERAPPDEMO_CANCEL_QUEUE:"Cancel Queuing",
	
	I18N_USERAPPDEMO_WEBCHAT_RELATED:"WebChat-related",
	I18N_USERAPPDEMO_MESSAGE:"Message:",
	I18N_USERAPPDEMO_SEND_MESSAGE:"SendMessage",
	I18N_USERAPPDEMO_CLEAR_CHAT_HISTORY:"ClearChatHistory",
	
	I18N_USERAPPDEMO_ICP20:"ICP2.0 Speciality",
	I18N_USERAPPDEMO_UPLOAD_FILE:"Upload File",
	I18N_USERAPPDEMO_DOWNLOAD_FILE:"Download File",
	I18N_USERAPPDEMO_FILE_PATH:"File Path: ",
	
	I18N_USERAPPDEMO_MULTIMEDIA_RELATED:"Multimedia Related",
	I18N_USERAPPDEMO_CONFERENCE_MEMBER:"Conference Participant: ",
	I18N_USERAPPDEMO_CREATE_MEETING:"Create Conference",
	I18N_USERAPPDEMO_RELEASE_MEETING:"End Conference",
	I18N_USERAPPDEMO_SHARE_DESKTOP:"Share Desktop",
	I18N_USERAPPDEMO_SHARE_APPLICATION:"Share Application",
	I18N_USERAPPDEMO_START_DESKTOP_SHARE:"Start DesktopShare",
	I18N_USERAPPDEMO_STOP_DESKTOP_SHARE:"Stop DesktopShare",
	I18N_USERAPPDEMO_ASK_REMOTE_CTRL:"Ask RemoteCtrl",
	I18N_USERAPPDEMO_ALLOW_REMOTE_CTRL:"Authorize RemoteCtrl",
	I18N_USERAPPDEMO_STOP_REMOTE_CTRL:"Revoke RemoteCtrl",
	I18N_USERAPPDEMO_STOP_REMOTE_CTRL:"Refuse RemoteCtrl",
	I18N_USERAPPDEMO_DOCUMENT_SHARE_PATH:"Absolute Document Path For Sharing: ",
	I18N_USERAPPDEMO_DOCUMENT_SHARE_START:"Start Document Sharing",
	I18N_USERAPPDEMO_DOCUMENT_SHARE_SAVE:"Save Document",
	I18N_USERAPPDEMO_DOCUMENT_SHARE_STOP:"Stop Document Sharing",
	I18N_USERAPPDEMO_DOCUMENT_LAST_PAGE:"Last Page",
	I18N_USERAPPDEMO_DOCUMENT_NEXT_PAGE:"Next Page",
	
	
	I18N_USERAPPDEMO_LOG:"LOG",
	I18N_USERAPPDEMO_LOG_CLEAR:"Clear Log",
}