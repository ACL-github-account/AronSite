let incompat = 0;
let openmenu = document.getElementById("openmenu");
try {
    document.cookie = "testcookie=0";
}
catch(error) {
    incompat = NaN;
}
if (document.cookie[0] == undefined){
    incompat = NaN;
}
switch (incompat){
    case 0:
        //getting elements
        let options = document.getElementById("options");                   

        console.log(document.cookie);

        function getCookie(cname){
            let name = cname + "=";
            let cooki = document.cookie;
            return(cooki[cooki.indexOf(name) + name.length]);
        }
                            
        if (getCookie("highcont") == "1"){
            let tar = document.getElementsByTagName("*");
            let except = document.getElementsByClassName("exception");
            for (let x = 0; x<tar.length; x++) {
                document.getElementById("body").style.backgroundImage="url(Images/backgroundAlt.jpg)";
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
        openmenu.addEventListener("click", ()=>{
		//function for opening and closeing menu
            if (options.style.visibility == "visible"){
                options.style.visibility = "hidden";
            }
            else {
                options.style.visibility = "visible";
            }
            }, false);
        document.getElementById("hightcontrast").addEventListener("click", highcontrastoption, false);
        document.getElementById("comicsans").addEventListener("click", csansoption, false);
        break;
        
    default:
        openmenu.value = "OPTIONS UNAVAILABLE";
        openmenu.addEventListener("click", ()=>{alert("FUNCTION UNAVILABLE: OPEN IN DIFFERENT BROWSER, ENABLE WEBSTORAGE AND OR COOKIES!")}, false);
    break;
}
