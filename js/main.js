;$(function(){
	'use strict';
	
	var sidebar = $('#sidebar'),//选择侧栏
		mask = $('.mask'),
	sidebar_trigger = $('#sidebar_trigger'),
	backToTop = $('.backtotop')


	function showsidebar()
	{
		mask.fadeIn();
		sidebar.css('transform','translate(0,0)');
		
	}
	
	function hiddensidebar()
	{
		mask.fadeOut();
		sidebar.css('transform','translate('+ sidebar,width()+'px'+',0)');
	}
		function goTop()
	{
		$('html,body').animate({
			scrollTop:0
		},800)
	}
	
	backToTop.on('click',goTop)	;
	sidebar_trigger.on('click',showsidebar);
	mask.on('click',hiddensidebar);
	
	$(window).on('scroll',function()
	{
		if($(window).scrollTop()>$(window).height())	
		backToTop.fadeIn();
		else
		backToTop.fadeOut();
	});
$(window).trigger('scroll');
	
});
