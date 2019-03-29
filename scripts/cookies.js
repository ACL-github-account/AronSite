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
