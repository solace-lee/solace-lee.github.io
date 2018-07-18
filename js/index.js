window.onload=function(){
}
	function  menu(){
		var menustyle=document.getElementsByClassName("minimenu");
		menustyle[0].style.display='block';
		
	}

	function menuhiden(){
		var menustyle=document.getElementsByClassName("minimenu");
		menustyle[0].style.display='none';
	}

	function more(e){
		e.style.display="none";
		e.parent.children[2].style.overflow="hidden"
	}
