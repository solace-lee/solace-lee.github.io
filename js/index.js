//声明一个全局对象存储Jason数据
var database = {};

//网页加载完毕后动态加载database中的数据到首页
$(window).load(function() {
	$.getJSON("jason/database.json", function(data) {
		database = data;
		var $left = $('.left');
		if(database.length < 5) {
			//如果Jason中的数据少于5条则遍历数据并append到left中
			$.each(database, function(index, info) {
				var article = '<div class="article"><div class="title"><a href="">' + info['title'] + '</a></div><div class="info"><div class="time">' + info['date'] + '</div><div class="tag">' + info['label'] + '</div></div><div class="txt">' + info['content'] + '</div><div class="more" onclick="more(this)">MORE ></div><div class="hide" onclick="hide(this)">HIDE ></div></div>';
				var recent = '<li><a href="#">' + info['title'] + '</a></li>';
				$left.append(article);
				$('.recent-title').find('ul').append(recent);
			});
		} else {
			//如果Jason中的数据大于5条则取最前的5条数据append到left中
			for(var i = 0; i < 5; i++) {
				//console.log(database[i].title);
				var limit = '<div class="article"><div class="title"><a href="">' + database[i].title + '</a></div><div class="info"><div class="time">' + database[i].date + '</div><div class="tag">' + database[i].label + '</div></div><div class="txt">' + database[i].content + '</div><div class="more" onclick="more(this)">MORE ></div><div class="hide" onclick="hide(this)">HIDE ></div></div>';
				//同时将标题也追加到右侧最近更新中去
				var limitrecent = '<li><a href="#">' + database[i].title + '</a></li>';
				$left.append(limit);
				$('.recent-ul').append(limitrecent);
			}
		}

		//		var line=data[0];
		//		var article='<div class="article"><div class="title"><a href="main.html">node.js入门-1-简介</a></div><div class="info"><div class="time">2018-7-16</div><div class="tag">node.js</div></div><div class="txt">Node.js 前言 Node.js之父 Ryan Dahl : 2009年推出Node.js, 2012年退出Node.js, 转战Go语言 Node.js出现的背景</div><div class="more" onclick="more(this)">MORE ></div><div class="hide" onclick="hide(this)">HIDE ></div></div>';
		//		$left.append(article);
		//		$.each(data, function(infoindex,info) {
		//		$left.append('<div class="title"><a href="'+info["code_link"]+'">'+info["title"]+'</a></div>');
		//		});
	})
})

//响应式-小屏状态下的菜单按钮动作
$('.minimenu').click(function() {
	$('.minimenu').css('display', 'none');
})

function menu() {
	$('.minimenu').css('display', 'block');
}

//主页中显示更多和隐藏的动作
function more(e) {
	e.style.display = "none";
	$(e).parent().find('.txt').css('-webkit-line-clamp', '10');
	$(e).parent().find('.hide').css('display', 'block');
}

function hide(e) {
	e.style.display = "none";
	$(e).parent().find('.txt').css('-webkit-line-clamp', '3');
	$(e).parent().find('.more').css('display', 'block')
}