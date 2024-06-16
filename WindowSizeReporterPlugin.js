function reportWindowSize() {
    spanW.textContent = window.innerWidth;
    spanH.textContent = window.innerHeight;
    if(window.innerWidth >= 1000) {
        document.querySelector('#windowsizewidth').style.fontSize = "23px";
    } else{
        document.querySelector('#windowsizewidth').style.fontSize = "20px";
    }
    if(window.innerHeight >= 500) {
        document.querySelector('#windowsizeheight').style.fontSize = "23px";
    } else {
        document.querySelector('#windowsizeheight').style.fontSize = "20px";
    }

}
window.onresize = reportWindowSize;

let pW = document.createElement('p');
pW.textContent = "视口宽度: ";
pW.setAttribute('id', 'paraconstwidth');
document.body.prepend(pW);
let spanW = document.createElement('span');
spanW.setAttribute('id', 'windowsizewidth');
pW.appendChild(spanW);

let pH = document.createElement('p');
pH.textContent = "视口高度: ";
pH.setAttribute('id', 'paraconstheight');
document.body.prepend(pH);
let spanH = document.createElement('span');
spanH.setAttribute('id', 'windowsizeheight');
pH.appendChild(spanH);

document.querySelector('#paraconstwidth').style.width = "120px";
document.querySelector('#paraconstwidth').style.height = "30px";
document.querySelector('#paraconstwidth').style.color = "white";
document.querySelector('#paraconstwidth').style.fontFamily = "Helvetica";
document.querySelector('#paraconstwidth').style.fontSize = "15px";
document.querySelector('#paraconstwidth').style.position = "absolute";
document.querySelector('#paraconstwidth').style.top = "5px";
document.querySelector('#paraconstwidth').style.left = "600px";

document.querySelector('#windowsizewidth').style.fontFamily = "fantasy";

document.querySelector('#paraconstheight').style.width = "120px";
document.querySelector('#paraconstheight').style.height = "30px";
document.querySelector('#paraconstheight').style.color = "white";
document.querySelector('#paraconstheight').style.fontFamily = "Helvetica";
document.querySelector('#paraconstheight').style.fontSize = "15px";
document.querySelector('#paraconstheight').style.position = "absolute";
document.querySelector('#paraconstheight').style.top = "5px";
document.querySelector('#paraconstheight').style.left = "770px";

document.querySelector('#windowsizeheight').style.fontFamily = "fantasy";




