let xmlreq2 = new XMLHttpRequest();



xmlreq2.open("GET", "/api/updates.json");
xmlreq2.setRequestHeader("Content-Type", "json");
xmlreq2.responseType = "text";
xmlreq2.send("string");

console.log(xmlreq2.readyState);
xmlreq2.onreadystatechange = ()=>{
    if(xmlreq2.readyState === 4 && xmlreq2.status === 200){
        console.log("gothere");
        let ans = document.getElementById("updates");
        let jan = JSON.parse(xmlreq2.responseText);
        let index = 0;
        jan.title.forEach(()=>{
            ans.innerHTML = ans.innerHTML + 
            "<div class='update'>" +
            "<h1>" + jan.title[jan.title.length - index - 1] + "</h1>" + 
            "<p>" + jan.content[jan.content.length - index - 1] + "</p>" + 
            "</div>";
            index++;
        })
        console.log(xmlreq2.responseText);
        console.log(xmlreq2.readyState);
}}





