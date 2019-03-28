//Storeing values in browser, deleted on end of session
window.onload = function(){
	var incompat = 0;
	try {
		document.cookie = "testcookie=0";
	}
	catch(eer) {
		incompat = 1;
	}
	if (document.cookie[0] == undefined){
		alert("please note that Chrome does not support cookies for html files opened with the file manager. Use localhost if you intend to view this website in Chrome.")
		incompat = 1;
	}
	switch (incompat){
		case 0:
			//getting elements
			let options = document.getElementById("options");
			let openmenu = document.getElementById("openmenu");
			
			//function for opening and closeing menu
			function displayops(e) {
				if (options.style.visibility == "visible"){
					options.style.visibility = "hidden";
				}
				else {
					options.style.visibility = "visible";
				}
			}

			console.log(document.cookie);

			function getCookie(cname){
				let name = cname + "=";
				let cooki = document.cookie;
				console.log(cooki.indexOf(name));
				console.log(cooki[cooki.indexOf(name) + name.length]);
				return(cooki[cooki.indexOf(name) + name.length]);
			}
			 
			if (getCookie("highcont") == "1"){
				let tar = document.getElementsByTagName("*");
				let except = document.getElementsByClassName("exception");
				for (let x = 0; x<tar.length; x++) {
					document.getElementById("body").style.backgroundImage="url(backgroundAlt.jpg)";
					tar[x].style.backgroundColor="#FFFFFF";
					if (except[0] != null){
						except[0].style.color = "#000000";
					}
				}
			}
			if (getCookie("csans") == "1"){
				let tar = document.getElementsByTagName("*");
				for (let x = 0; x<tar.length; x++) {
					tar[x].style.fontFamily = "Comic Sans MS";
				}
			}
			
			// enables and disables options
			function highcontrastoption(e){
				if(getCookie("highcont") == "1"){
					document.cookie = "highcont=0";
				}
				else {
					document.cookie = "highcont=1";
				}
				location.reload();
			}
			function csansoption(e){
				if(getCookie("csans") == "1"){
					document.cookie = "csans=0";
				}
				else {
					document.cookie = "csans=1";
				}
				location.reload();
			}
			 
			//adding event listeners (done last so functions and variables are declared first to prevent issues with spider-monkey)
			openmenu.addEventListener("click", displayops, false);
			document.getElementById("hightcontrast").addEventListener("click", highcontrastoption, false);
			document.getElementById("comicsans").addEventListener("click", csansoption, false);
			break;
			
		default:
			alert("Web storeage is either turned off or your browser does not support it");
			openmenu = document.getElementById("openmenu");	
			function errormsg(){
				alert("FUNCTION UNAVILABLE: OPEN IN DIFFERENT BROWSER, ENABLE WEBSTORAGE AND OR COOKIES!")
			}
			openmenu.value = "OPTIONS UNAVAILABLE";
			openmenu.addEventListener("click", errormsg, false);
		break;
	}
			
	//favbar imgs
	let pictures = document.getElementsByTagName("img");

	//coppies the img elements in content to favbar for quick access
	if (document.title == "Galary"){
		let bodypictures = document.getElementById("content").getElementsByTagName("img");
		let favbar = document.getElementsByClassName("favbar")[0];

		for (let x = 0; x<bodypictures.length; x++){
			let clones = bodypictures[x].cloneNode(true);
			favbar.appendChild(clones);

		}
	}

	//sets X back to 0

	/*its messy but it works; i could probebly change the code so it went though all images on
	the page instead of within a specific div. I will probebly do this so i can use this code
	on all pages*/


	
	//adds events
	for (let x = 0; x<pictures.length; x++){
		pictures[x].addEventListener("click", eachimg, false);
	}
	
	//self explanatory
	function eachimg(e) {
		let imgfixed = document.getElementById("imgzoom")
		let navbar = document.getElementById("header");
		imgfixed.style.display="block";
		navbar.style.display="none";
		document.getElementById("mainimg").src = e.target.src;
	}
	
	//messy code for the close button, could probebly have used an arrow function.
	if (document.getElementById("closebutton") != null) {
		function close(){
			document.getElementById("imgzoom").style.display="none";
			document.getElementById("header").style.display="block";
		}
		document.getElementById("closebutton").addEventListener("click", close, false);
	}

	//search function

	var searchbar = document.getElementsByClassName("searchbar")[0];

	function searching(){
		//if statement to confirm user is on the right page to prevent errors if they are not.
		if (document.title == "Galary"){
			//i dont want to use a global but i have to D=
			var images = document.getElementById("content").getElementsByTagName("img");
		}	else if(document.title == "Theater"){
			var images = document.getElementById("content").getElementsByTagName("video");
		}
		

		for (let x = 0; x<images.length; x++){
			images[x].style.display = "block";
		}

		if (document.title == "Galary"){
			document.getElementsByClassName("favbarparent")[0].style.display="none";
		}

		let searchval = searchbar.value;
			
		
		let similarity = new Array();

		/*compares the src of an image to the input, first it gets the src, then it removes the location, It then compares the characters of the input and the image srcs side by side, going to the next
		character useing a incrementing loop, if a image dose not have the maxium score or a score of 0 it is deleted; the ressult is a less strict binary search*/
		function getimgsrcs(elem){
			let locdone = elem.src.lastIndexOf("/")+1;
			return(elem.src.substring(locdone));
		}
		console.log(searchval);
		for (let x = 0; x < images.length; x++) {
			getimgsrcs(images[x]);
			console.log(getimgsrcs(images[x]));
		}

		console.log(searchval.length);
		let i = 0;
		while (i < images.length){
			similarity[i] = 0;
			i++;
		}
		i=0;
		let compitteration = 0;
		function compare(imgno){
			while (i < searchval.length){
				console.log(imgno);
				console.log(i);
				if (searchval[i] == getimgsrcs(images[imgno])[i]){
					similarity[imgno]++;
					console.log(similarity[imgno]);				
				}
				i++;
			}
		i = 0;
		compitteration + 1;
		}
		for (let x = 0; x<images.length; x++){
			compare(x)
		}

		console.log(similarity);

		for (let x = 0; x<images.length; x++){
			if (similarity[x] <= 0){
				images[x].style.display = "none";
			}
			else if (similarity[x] < Math.max(...similarity)){
				images[x].style.display = "none";
			}
		}
	}

	if (document.title == "Galary" || document.title == "Theater"){
		document.getElementById("searchbutton").addEventListener("click", searching, false);
	}

};	