//adds events
let pictures = document.getElementsByTagName("img");
for (let x = 0; x<pictures.length; x++){
	pictures[x].addEventListener("click",
		(e) => {
		//self explanatory
		let imgfixed = document.getElementById("imgzoom");
		let navbar = document.getElementById("header");
		imgfixed.style.display="block";
		navbar.style.display="none";
		document.getElementById("mainimg").src = e.target.src;
	},false)
}
		
//the close button.
if (document.getElementById("closebutton") != null) {
	document.getElementById("closebutton").addEventListener("click", () => {
	document.getElementById("imgzoom").style.display="none";
	document.getElementById("header").style.display="block";
	}, false);
}