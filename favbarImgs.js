export default class favbarImgs{
    constructor(){
        let pictures = document.getElementsByTagName("img");
        //favbar imgs
        //coppies the img elements in content to favbar for quick access
        if (document.title == "Galary"){
            let bodypictures = document.getElementById("content").getElementsByTagName("img");
            let favbar = document.getElementsByClassName("favbar")[0];

            for (let x = 0; x<bodypictures.length; x++){
                let clones = bodypictures[x].cloneNode(true);
                favbar.appendChild(clones);

            }
        }
    }
}