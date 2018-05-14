function IsNullOrBlank(obj)
{
	if (obj == undefined || obj == null)
	{
    	return true;
	}
	else if (typeof(obj) == "string")
	{
		if (trimStr(obj) == "")
		{
			return true;
		}
	}
	else
	{
		return false;
	}
}

function trimStr(str)
{
	return str.replace(/(^[\s|　]*)|([\s|　]*$)/g, ""); 
}

//VDN validate 
function isValidVDN(input)
{
	if (IsNullOrBlank(input))
	{
		alert("VDN cannot be blank!");
		return false;
	}
	var v = new RegExp();
	v.compile("^[\\d]{1,3}$");
	if (!v.test(input))
	{
		alert("VDN must between 0-999!");
		return false;
	}
	return true;
}

//accessCode validate 
function isValidAccessCode(input)
{
	if (IsNullOrBlank(input))
	{
		alert("AccessCode cannot be blank!");
		return false;
	}
	var v = new RegExp();
	v.compile("^[\\d]{1,24}$");
	if (!v.test(input))
	{
		alert("AccessCode length must between 1 to 24!");
		return false;
	}
	return true;
}

//accessCode validate 
function isValidUserName(input)
{
	if (IsNullOrBlank(input))
	{
		alert("UserName cannot be blank!");
		return false;
	}
	var v = new RegExp();
	v.compile("^[0-9a-zA-Z]{1,20}$");
	if (!v.test(input))
	{
		alert("UserName must be number or alphabet  between 1 to 20 length!");
		return false;
	}
	return true;
}

//log print
function writeLog(content)
{
    var oldValue = $("#LogInfo").val();
    var time = getNowTime();
    $("#LogInfo").val(oldValue + "["+time+"][" + global_workNo + "]: " + content + "\n\n");
}

//log clear
function clearLog()
{
    $("#LogInfo").val("");
}

function getNowTime()
{
	var date = new Date();
	return date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
}