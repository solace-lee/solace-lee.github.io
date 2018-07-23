//声明一个全局对象存储Jason数据
var database = {};
//声明一个全局数组存取标签
var tag=[];

$(window).load(function() {
	main();
})



//加载首页主数据和最近更新的数据
function main() {
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
				var limit = '<div class="article"><div class="title"><a href="">' + database[i].title + '</a></div><div class="info"><div class="time">' + database[i].date + '</div><div class="tag">' + database[i].label + '</div></div><div class="txt">' + database[i].content + '</div><div class="more" onclick="more(this)">MORE ></div><div class="hide" onclick="hide(this)">HIDE ></div></div>';
				//同时将标题也追加到右侧最近更新中去
				var limitrecent = '<li><a href="#">' + database[i].title + '</a></li>';
				$left.append(limit);
				$('.recent-ul').append(limitrecent);
			}
		}
			tagname();
	})
};


//获取Jason数据流中的标签名,并把存储标签名的数组进行排序并去重，然后append到首页
function tagname(){
	$.each(database,function(index,tags){
		tag.push(tags['label']);
	});
	$.unique(tag.sort()); 
	for(var i=0;i<tag.length;i++){
	var label='<li><a href="#">'+tag[i]+'</a></li>';	
	$('.label-ul').append(label);
	};
};


//响应式-小屏状态下的菜单按钮动作
$('.menu').click(function() {
	$('.menu').css('right', '-100%');
	$('.menu-ul').css('right','-150px');
});

function menu() {
	$('.menu').css('right', '0');
	$('.menu-ul').css('right','0');
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
function active(e){
	$('.active').removeClass('active');
	$(e).addClass('active');
	var txt=$(e).text();
	switch(txt){
		case('首页'):
		break;
		case('时间轴'):
		timeline();
		break;
		case('标签'):
		label();
		break;
		case('项目'):
		project();
		break;
		case('关于我'):
		about();
		break;
	}
};

function timeline(){
	$('#welcome').css('display','none');
	$('.article').text('');
	$.each(database, function(index, info) {
				var article = info['title'] + '<div class="info"><div class="time">' + info['date'] + '</div></div>';
				$('.article').append(article);
			});
}
