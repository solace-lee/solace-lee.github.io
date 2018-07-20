$(window).load(function() {
	$.getJSON("jason/database.json", function(data) {
		var $left = $('.left');
		$.each(data, function(infoindex,info) {
			$left.append('<div class="title"><a href="'+info["code_link"]+'">'+info["title"]+'</a></div>');
		});
	})
})

$('.minimenu').click(function() {
	$('.minimenu').css('display', 'none');
})

function menu() {
	$('.minimenu').css('display', 'block');
}

function more(e) {
	e.style.display = "none";
	$(e).parent().find('.txt').css('display', 'block');
	$('.hide').css('display', 'block');
}

function hide(e) {
	e.style.display = "none";
	$(e).parent().find('.txt').css('display', '-webkit-box');
	$('.more').css('display', 'block')
}