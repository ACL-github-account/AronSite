let xmlreq = new XMLHttpRequest();


xmlreq.open("GET", "/api/announcements.json");
xmlreq.setRequestHeader("Content-Type", "json");
xmlreq.responseType = "text";
xmlreq.send("string");

console.log(xmlreq.readyState);
xmlreq.onreadystatechange = ()=>{
    if(xmlreq.readyState === 4 && xmlreq.status === 200){
        console.log("gothere");
        let ans = document.getElementById("announcements");
        let jan = JSON.parse(xmlreq.responseText);
        let index = 0;
        jan.title.forEach(()=>{
            ans.innerHTML = ans.innerHTML + 
            "<div class='announcement'>" +
            "<h1>" + jan.title[index] + "</h1>" + 
            "<p>" + jan.content[index] + "</p>" + 
            "</div>";
            index++;
        })
        console.log(xmlreq.responseText);
        console.log(xmlreq.readyState);
}}

let xmlpostreq = new XMLHttpRequest();

let jsobj = {
    "werd" : "testing"
}
xmlpostreq.open("POST", "/");
xmlpostreq.setRequestHeader("Content-Type", "json");
xmlpostreq.responseType = "text";
xmlpostreq.send(JSON.stringify(jsobj));




