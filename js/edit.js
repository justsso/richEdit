window.onload = function() {
	document.onclick = function(e) {
		return false;
	}
	reset();
}

var richedit = document.getElementById("richedit");
//功能性按钮
var codeBtn = document.querySelector('.code');
var bBtn = document.querySelector('.b');
var underline = document.querySelector('.underline');
var iBtn = document.querySelector('.i');
var txt = document.querySelector('.txt');
var list = document.querySelector('.list');
var tlink = document.querySelector('.link');
var send = document.querySelector('.send');
var colorBtn = document.querySelector('.color');
var imgBtn = document.querySelector('.img');

var justify = document.querySelector('.justify');
list.onchange = function() {
	switch(list.value) {
		case "ol":
			document.execCommand("insertorderedlist", false, null);
			break;
		case "ul":
			document.execCommand("insertunorderedlist", false, null);
			break;
		default:
			console.log('没有选择')
			break;
	}
}
//文本类型
txt.onchange = function() {
	console.log(this.value);

	document.execCommand('removeformat', false, null);

	switch(this.value) {
		case "h1":
			document.execCommand("formatblock", false, "<" + this.value + ">");
			break;
		case "h2":
			document.execCommand("formatblock", false, "<" + this.value + ">");
			break;
		case "h3":
			document.execCommand("formatblock", false, "<" + this.value + ">");
			break;
		case "h4":
			document.execCommand("formatblock", false, "<" + this.value + ">");
			break;
		case "h5":
			document.execCommand("formatblock", false, "<" + this.value + ">");
			break;
		case "h6":
			document.execCommand("formatblock", false, "<" + this.value + ">");
			break;
		default:
			document.execCommand("formatblock", false, "<p>");
	}
}
justify.onchange = function() {
	switch(this.value) {
		case "left":
			document.execCommand("justifyleft", false, null);
			break;
		case "center":
			document.execCommand("justifycenter", false, null);
			break;
		default:
			break;
	}
}
var insertSureBtn = document.querySelector('.insert-code-btn'); //确定插入代码
var insertBan = document.querySelector('.insert'); //代码textarea
var insertCode = document.querySelector('.insert-code'); //真正的代码
var colorBan = document.querySelector('.ban'); //颜色板
var colorText = document.getElementById("color");
var colorSure = document.getElementById("colorSure");
var linkBan = document.querySelector('.addLink');
var linkSure = document.getElementById("linkSure");
var imgSrc = document.getElementById("img");
var imgSure = document.getElementById("imgSure");
var imgBan = document.querySelector('.imgBan');
var imgCancel = document.getElementById("imgCancel");
//确定代码
insertSureBtn.onclick = function() {
	insertBan.style.display = "none";
	var len = richedit.getElementsByClassName("mycode").length;
	var mycode = richedit.getElementsByClassName("mycode")[len - 1];
	var replceStr1 = insertCode.value.replace(/</g, "&lt;");
	var replaceStr2 = replceStr1.replace(/>/g, "&gt;");
	//替换掉所有的<>
	mycode.innerHTML = replaceStr2;
	var div = document.createElement("div");
	richedit.appendChild(div);
	div.style.minHeight = 40 + "px";
}

codeBtn.onclick = function() {
	insertBan.style.display = "block"; //插入代码
	var pre = document.createElement("pre");
	var code = document.createElement("code");
	code.className = "mycode";
	pre.appendChild(code);
	richedit.appendChild(pre);
	richedit.contentEditable = "true";
}
colorBtn.onclick = function() {
	colorBan.style.display = "block";
}

colorSure.onclick = function() {
	colorBan.style.display = "none";
	document.execCommand("forecolor", false, colorText.value);
}
tlink.onclick = function() {
	linkBan.style.display = "block";
}
linkSure.onclick = function() {
	this.parentNode.style.display = "none";
	document.execCommand("createlink", false, this.previousElementSibling.value);
}
imgBtn.onclick = function() {
	imgBan.style.display = "block";
}
imgSure.onclick = function() {
	this.parentNode.style.display = "none";
	document.execCommand("insertimage", false, imgSrc.value);
}

var cancelBtns = document.getElementsByClassName('cancelBtn');

for(var i = 0; i < cancelBtns.length; i++) {
	cancelBtns[i].onclick = function() {
		this.parentNode.style.display = "none";
	}
}
iBtn.onclick = function() {
	italic(); //斜体
}

bBtn.onclick = function() {
	blod(); //加粗
};
underline.onclick = function() {
	document.execCommand('underline', false, null);
}

send.onclick = function() {
	console.log(richedit.innerHTML);
}

////////////////////////////////
function blod() {
	document.execCommand("bold", false, null);
}

function italic() {
	document.execCommand('italic', false, null);
}

function addLink() {
	document.execCommand("createLink", false, "www.hixiaoya.com");
}

//获取选中的文字
function getSelectTxt() {
	var selection = document.getSelection();
	var selectText = selection.toString();
	var range = selection.getRangeAt(0);
	return range;
}

//清除所有样式,恢复默认样式
function reset() {
	document.execCommand("formatblock", false, "<p>");
}

var sendBtn = document.querySelector('.send');

sendBtn.onclick = function() {
	//创建一个formData对象
	var form = new FormData();
	form.append("user", "安妮小雅");
	form.append("views", 0);
	form.append("link", "artical.html");
	form.append("img", "img/01.jpg");
	form.append("likes", 0);
	var h1 = richedit.getElementsByTagName('h1')[0];
	if(h1.innerHTML == "") {
		alert('设置标题');
		return;
	}
	form.append("title", h1.innerHTML);
	if(this.nextElementSibling.value == "") {
		alert('输入类别');
		return;
	}
	form.append("category", this.nextElementSibling.value);
	form.append("content", richedit.innerText.substr(0, 160)); //简介
	form.append("s", richedit.innerHTML); //全部内容
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
				//把接受到的数据添加近artical.php中
				console.log(xhr.responseText);
			} else {
				alert("Request was unsuccessful:" + xhr.responseText);
			}
		}
	}
	xhr.open("POST", "/Myblog/myphp/inputArtical.php", true);
	//	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send(form);
}

var editwrap = document.getElementById("richeditwrap");
addScroll(editwrap, upFn, downFn);

function upFn() {
	console.log('向上');
	//元素向下走
}

function downFn() {
	console.log('向下');
	//元素位置应该向上  top --
}

//给元素obj添加鼠标滚轮事件
function addScroll(obj, upFn, downFn) {
	obj.onmousewheel = fn;
	obj.addEventListener("DOMMouseScroll", fn);

	function fn(e) {
		if(e.wheelDelta) { //chrome
			if(e.wheelDelta > 0) { //上
				upFn();
			} else { //下
				downFn();
			}
		} else if(e.detail) { //firefox
			if(e.detail < 0) { //上
				upFn();
			} else { //下
				downFn();
			}
		}
	}
}

//调色板
function $$(id) {
	return document.getElementById(id);
}
var canvas = $$("canvas");
var cxt = canvas.getContext('2d');
//宽255  高255
for(var i = 0; i < 256; i++) {
	for(var j = 0; j < 256; j++) {
		cxt.fillStyle = "rgb(" + i + "," + j + ",120)";
		cxt.fillRect(i, j, 1, 1);
	}
}

canvas.onclick = function(e) {
	var boundingbox = this.getBoundingClientRect();
	
	var mousex = e.clientX - boundingbox.left
	var mousey = e.clientY - boundingbox.top

	var imgData = cxt.getImageData(mousex, mousey, 1, 1);
	var data = imgData.data;
	//				console.log(data);
	var str = "";
	str += "rgba(" + data[0] + "," + data[1] + "," + data[2] + "," + data[3] + ")";
	console.log(str);
	this.nextElementSibling.value = str;
	this.nextElementSibling.style.color = str;
	this.nextElementSibling.style.fontWeight ="bold";
}