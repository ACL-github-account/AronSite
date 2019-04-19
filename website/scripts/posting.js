//Show and hide the window for posting
document.getElementById("post").addEventListener("click", ()=>{
    if (document.getElementById("postingWindow").style.display == "none"){
        document.getElementById("postingWindow").style.display = "block";
    } else {
        document.getElementById("postingWindow").style.display = "none";
    }
});

//POST's password to server for verification
function password(){
    let pass = prompt("Password:");
    let passParse = new XMLHttpRequest;
    let postObj = {
        "password" : pass,
        "Title" : document.getElementById("posttitle").value,
        "Body" : document.getElementById("postbody").value,

    }
    passParse.open("POST", "/password");
    passParse.setRequestHeader("Content-Type", "json");
    passParse.responseType = "text";
    passParse.send(JSON.stringify(postObj));

    passParse.onreadystatechange = ()=>{
        if (passParse.readyState === 4 && passParse.status === 200){
            if (passParse.responseText === "yes"){
               alert("Password correct");
            }
        }
    }
}

//TODO:
//add event listeners to post buttons
/*Uppon post button being pressed assign the title and body of the
text inputs to a javascript object*/
/*upon clicking the post button prompt the user for a password, upon receiveing
parse it through the server to check if its correct and return a boolian value
wether or not it is correct*/
/*Stringify the javascript object and then send it to server via POST request,
it should then be parsed and added to a announcements and or updates .json with
an index number serverside*/