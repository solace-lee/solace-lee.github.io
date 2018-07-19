//window.onload=function(){
//}
//	function  menu(){
//		var menustyle=document.getElementsByClassName("minimenu");
//		menustyle[0].style.display='block';
//		
//	}

//	function menuhiden(){
//		var menustyle=document.getElementsByClassName("minimenu");
//		menustyle[0].style.display='none';
//	}


$(window).load(function(){	
	$('.minimenu').click(function(){
		$('.minimenu').css('display','none');
	})
})

function menu(){
	$('.minimenu').css('display','block');
}

function more(e){
	e.style.display="none";
	$(e).parent().find('.txt').css('display','block');
	console.log() 
}
