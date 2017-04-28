// ==UserScript==
// @name         WME G2GMDM
// @name:es      WME Vamoj pa Gaia
// @version      0.2
// @description  WME Go to GaiaMDM. Redirects to Gaia MDM page on current position by clicking on wme coordinates label.
// @description:es WME Vamoj pa Gaia te lleva directito a la mijma posicion en el mapa de gaia pa que no tengas que hacer tantos clics puej.
// @author       abdielisai
// @include      https://www.waze.com/editor/*
// @include      https://www.waze.com/*/editor/*
// @include      https://beta.waze.com/*
// @exclude      https://www.waze.com/user/editor*
// @grant        none
// @license      GPLv3
// @namespace https://greasyfork.org/users/118132
// ==/UserScript==

(function() {

	//> We don't need the whole 
	//> @require      https://greasyfork.org/scripts/24851-wazewrap/code/WazeWrap.js
	//> just this function:
    function bootstrap(tries) {
        tries = tries || 1;

        if (window.W &&
            window.W.map &&
            window.W.model &&
            $) {
            init();
        } else if (tries < 1000) {
            setTimeout(function () {bootstrap(tries++);}, 200);
        }
    }

    bootstrap();

    function init(){
        //> Finds the element containing the coordinates on Waze Map Editor page
        var elements = document.getElementsByClassName("mouse-position");
        if(elements.length > 0){
            //> Listens on click event 
            elements[0].onclick = function(){
                //> Extracts coordinates from element inner text and encode them into base64
                var coords = elements[0].innerText.split(" ");
                window.open("http://gaia.inegi.org.mx/mdm6/?v="+btoa("lat:"+coords[1]+",lon:"+coords[0]+",z:13"));
            };
        }
        console.log("WME G2GMDM " + GM_info.script.version+" is running.");
    }
})();

//> You can paste this section into the console to try it without install it
// document.getElementsByClassName("mouse-position")[0].onclick = function(){
//     var coords = document.getElementsByClassName("mouse-position")[0].innerText.split(" ");
//     window.open("http://gaia.inegi.org.mx/mdm6/?v="+btoa("lat:"+coords[1]+",lon:"+coords[0]+",z:13"));
// };
