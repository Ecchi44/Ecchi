function getCookie(key){
	var arr = document.cookie.split("; ");
	for(var i=0;i<arr.length;i++){
		if(arr[i].split("=")[0] === key){
			return arr[i].split("=")[1];
		}
	}
	return "";
}

function removeCookie(key,options){
	options = options || {};
	setCookie(key,null,{
		expires:-1,
		path:options.path
	})
}

function setCookie(key,val,options){
	options = options || {};
	var p = options.path ? ";path="+options.path : "";
	var e = "";
	if(options.expires){
		var d = new Date();
		d.setDate(d.getDate()+options.expires);
		e = ";expires="+d;
	}
	document.cookie = key+"="+ val + e + p;
}

function ajaxGet(url,cb,data){
	data = data || {};
	var str = "";
	for(var i in data){
		str = str + i+"="+data[i]+"&";
	}
	var d = new Date();
	url = url + "?" + str + "__qft="+d.getTime();
	var xhr = new XMLHttpRequest();
	xhr.open("get",url,true);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200){
			cb(xhr.responseText);
		}
	};
	xhr.send();
}

function ajaxPost(url,cb,data){
	var str = "";
	for(var i in data){
		str += `${i}=${data[i]}&`;
	}
	str = str.slice(0,str.length-1);
	var ajax = new XMLHttpRequest();
	ajax.open("post",url,true);
	ajax.onreadystatechange = function(){
		if(ajax.readyState === 4 && ajax.status === 200){
			cb(ajax.responseText);
		}
	}
	ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	ajax.send(str);
}

function jsonp(url,cb,data){
	data = data || {};
	var str = "";
	for(var i in data){
		str += `${i}=${data[i]}&`;
	}
	url = url + "?" + str;
	var script = document.createElement("script");
	script.src = url;
	document.body.appendChild(script);
	window[data[data.colName]] = function(res){
		cb(res);
	}
}
