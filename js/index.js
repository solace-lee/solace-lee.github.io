//声明一个全局对象存储Jason数据
var database = {};
//声明一个全局数组存取标签
var tag = [];

$(window).load(function() {
	//通过Ajax获取Jason数据并保存到一个全局变量中
	$.getJSON("jason/database.json", function(data) {
		database = data;
		main(database);
	})

})

//加载首页主数据和最近更新的数据
function main(database) {
	var $left = $('.left');
	if(database.length < 5) {
		//如果Jason中的数据少于5条则遍历数据并append到left中
		$.each(database, function(index, info) {
			var article = '<div class="article"><div class="title"><a onclick="mainbody(this)" >' + info['title'] + '</a></div><div class="info"><div class="time">' + info['date'] + '</div><div class="tag">' + info['label'] + '</div></div><div class="txt">' + info['content'] + '</div><div class="more" onclick="more(this)">MORE ></div><div class="hide" onclick="hide(this)">HIDE ></div></div>';
			var recent = '<li><a href="#">' + info['title'] + '</a></li>';
			$left.append(article);
			$('.recent-title').find('ul').append(recent);
		});
	} else {
		//如果Jason中的数据大于5条则取最前的5条数据append到left中
		for(var i = 0; i < 5; i++) {
			var limit = '<div class="article"><div class="title"><a onclick="mainbody(this)" >' + database[i].title + '</a></div><div class="info"><div class="time">' + database[i].date + '</div><div class="tag">' + database[i].label + '</div></div><div class="txt">' + database[i].content + '</div><div class="more" onclick="more(this)">MORE ></div><div class="hide" onclick="hide(this)">HIDE ></div></div>';
			$left.append(limit);
			//同时将标题也追加到右侧最近更新中去
			var limitrecent = '<li><a onclick="mainbody(this)" href="#">' + database[i].title + '</a></li>';
			$('.recent-ul').append(limitrecent);
		}
	}
	//调用生成标签方法
	tagname();
	//调用标签批量改名方法
	tagChange();
};

//获取Jason数据流中的标签名,并把存储标签名的数组进行排序并去重，然后append到首页
function tagname() {
	$.each(database, function(index, tags) {
		//		判断标签中是否含有数组
		if($.isArray(tags['label'])) {
			for(var i = 0; i < tags['label'].length; i++) {
				tag.push(tags['label'][i]);
			}
		} else {
			tag.push(tags['label']);
		}
	});
	//对数组经行排序和去重
	$.unique(tag.sort());
	for(var i = 0; i < tag.length; i++) {
		var label = '<li><a onclick="label(this)">' + tag[i] + '</a></li>';
		$('.label-ul').append(label);
	};
};

//响应式-小屏状态下的菜单按钮动作
function menuhide() {
	$('.menu').css('right', '-100%');
	$('.menu-ul').css('right', '-150px');
};

function menu() {
	$('.menu').css('right', '0');
	$('.menu-ul').css('right', '0');
};

//主页中显示更多和隐藏的动作
function more(e) {
	e.style.display = "none";
	$(e).parent().find('.txt').css('-webkit-line-clamp', '10');
	$(e).parent().find('.hide').css('display', 'block');
};

function hide(e) {
	e.style.display = "none";
	$(e).parent().find('.txt').css('-webkit-line-clamp', '3');
	$(e).parent().find('.more').css('display', 'block')
};

//nav点击事件
function active(e) {
	$('.active').removeClass('active');
	$(e).addClass('active');
	//根据点击的文本来区分点击需要调用的函数
	var txt = $(e).text();
	switch(txt) {
		case('首页'):
			$('.left').text('');
			$('.recent-ul').text('');
			$('.label-ul').text('');
			main(database);
			break;
		case('时间轴'):
			timeline();
			break;
		case('标签'):
			var a;
			label(a);
			break;
		case('项目'):
			project();
			break;
		case('关于我'):
			about();
			break;
	}
};

//时间轴点击事件,加工.left中的数据
function timeline() {
	$('.left').text('');
	var article = "<div class='article'></div>";
	$('.left').append(article);
	var ul = "<ul class='timeline-ul'></ul>";
	$('.article').append(ul);
	//遍历Jason数据，按顺序append到主体部位
	$.each(database, function(index, info) {
		var content = '<li>' + info['date'] + '<a onclick="mainbody(this)">' + info['title'] + '</a><div class="tag">' + info['label'] + '</li>';
		$('.timeline-ul').append(content);
	});
	//批量修改时间轴中主体的标签
	tagChange();
	//避免标签页中，页面滚动到底部，所以需要回滚到顶部
	$('body').animate({
		scrollTop: 0
	}, 500);
};

//搜索.tag将字符串tag转化为独立切带有span标签的标签,为方便后面坐标签的点击动作
function tagChange() {
	//生成标签数组
	var tags = $('.tag');
	//对数组经行切割
	for(var i = 0; i < tags.length; i++) {
		var str = tags[i].innerHTML;
		var arr = str.split(',');
		$(tags[i]).text('');
		//切割后的数组经行单独包装，添加点击事件并替换到原来的位置
		for(var j = 0; j < arr.length; j++) {
			var span = '<span onclick="label(this)">' + arr[j] + '</span>';
			var $a = $(tags[i]);
			$a.append(span);
		}
	}

};

//点击标签事件
function label(e) {
	$('.left').text('');
	//如果点击的按钮length值为0，则为点击到菜单栏中的标签
	if($(e).length == 0) {
		//调用标签主体内容生成方法
		tagbody();
	}
	//否则为点击到博客中的标签，把标签内容传入为后续定位做准备
	else {
		$('.active').removeClass('active');
		$('.label-nav').addClass('active');
		var txt = $(e).text();
		$('.left').text('');
		tagbody();
		//清空内容区域后生成标签正文，下面该开始做滚动定位事件
		for(var k = 0; k < $('.tagtitle').length; k++) {
			var n = $('.tagtitle')[k];
			//搜索和点击的标签相同的分类标题，比对后滚到对应的标签位置
			if($(n).text() == txt) {
				$('body').animate({
					scrollTop: $(n).offset().top - $('.left').offset().top
				}, 800);
			}
		}
	}
};

//标签页主体内容生成方法
function tagbody() {
	for(var i = 0; i < tag.length; i++) {
		var box = '<div class="article"><div class="tagtitle">' + tag[i] + '</div><ul class="timeline-ul"></ul></div>';
		$('.left').append(box);
		//按tag的顺序遍历Jason数据，把匹配的数据append到对应分类下
		$.each(database, function(index, info) {
			for(var j = 0; j < info['label'].length; j++) {
				if(info['label'][j] == tag[i]) {
					var txt = '<li>' + info['date'] + '<a onclick="mainbody(this)">' + info['title'] + '</a><div class="tag">' + info['label'] + '</li>';;
					var a = $('.timeline-ul')[$('.timeline-ul').length - 1];
					$(a).append(txt);
				}
			}
		});
	}
	//经行标签的转换，同时添加标签点击事件
	tagChange();
};

//博客正文事件，传入点击的文本
function mainbody(e) {
	//清除菜单中的选中效果
	$('.active').removeClass('active');
	var txt = $(e).text();
	//搜索Jason数据中和点击的文本相同的标题，并获取到下标位置
	$.each(database, function(index, info) {
		if(info['title'] == txt) {
			//清空主体内容展示区
			$('.left').text('');
			var body = '<div class="bodyarticle"><div class="bodytitle"><a onclick="mainbody(this)" href="' + info['code_link'] + '">' + info['title'] + '</a></div><div class="bodyinfo"><div class="time">' + info['date'] + '</div><div class="tag">' + info['label'] + '</div></div><div class="bodytxt">' + info['content'] + '</div></div>';
			$('.left').append(body);
			tagChange();
			//			console.log(info['title']+index);
		}
	});
	//避免标签页中，页面滚动到底部，所以需要回滚到顶部
	$('body').animate({
		scrollTop: 0
	}, 500);
};

//项目事件
function project() {

};