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
