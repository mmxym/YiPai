function setCookie(name, value, days) {
	// 如果没有传入cookie保存的天数，则 cookie默认保存30天
	if (!days) {
		days = 30;
	}
	var exp = new Date();
	exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function setCookieMinute(name, value, minute) {
	// 如果没有传入cookie保存的分钟数，则 cookie默认保存30分钟
	if (!minute) {
		minute = 30;
	}
	var exp = new Date();
	exp.setTime(exp.getTime() + minute * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}

function getCookie(name)// 取cookies函数
{
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (arr != null) {
		return unescape(arr[2]);
	}
	return null;
}

/**
 * 删除cookie
 * 
 * @param name
 */
function removeCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null) {
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	}
}