// ==UserScript==
// @name         WME G2GMDM
// @name:es      WME G2GMDM - Vamoj pa Gaia
// @version      1.0.0
// @description  WME Go to GaiaMDM. Redirects to Gaia MDM page on current position by clicking on wme coordinates label.
// @description:es WME Go to GaiaMDM - Vamoj pa Gaia te lleva directito a la mijma posicion en el mapa de gaia pa que no tengas que hacer tantos clics puej.
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

        //> Adds hiperlink element
        createLink();
        
        console.log("WME G2GMDM " + GM_info.script.version+" is running.");
    }

    //> Appends a link to permalinks section on status bar
    function createLink(){
        var $a = $("<a href='#' data-toggle='tooltip' title='Ir a Gaia'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAGUSURBVHjapJO/bhNBEMZ/570zMYazcJQ0LtNEAhHJVUIf+tCkyDOkTIngDdLzCBShygtQIhkJBBEUUf5YJAgpiXPnHLt73h0Kh7szBCQr0+yOZuab3W++CUSE21gA1IF71+c0ZoFhCLTWdl78+DO6s/Zywj95tv4XQufN6/kQaDpxLM0t/Ldd/dHD8ZMDEAHz4SNAMwRU7hypzTjX6T8B8qPj4q7aD5A8B1AhgMktl+aKxFxNFDlrcXpIPW7jk6QkTilGxgAQAmijOdcpic34PZU01+xub9L/+o6NrVf4wWWJLGC1LgF+asMB30lMVuR8+fQeOzyDGc/nvbcsHB4WsVoco1WtCpBRi+7gxRdJZ9kx/fYiqhHj5jqIL2MyytHWV76gDVEzwldE9aT7lFZjFucDuo+XOfXPK4yOMGMSxwBWa0K5S1AhMG60WemuViRXRkUEbSskWmuZQaiPh3KzZKOIooN4TAXAeucZ7J9OFPR6vQm/P7i4Uc4B0AI6wP0pdyEFvgWAul4kNSWAA2xw23X+NQA6rbJDhz7nIAAAAABJRU5ErkJggg==' width='16px' height='16px'></a>");
        $a[0].onclick = go2GMDM;
        $(".WazeControlPermalink").append($a);
    }

    //> Opens a new MDM window on current position
    function go2GMDM(){
        var link = $(".fa.fa-link.permalink")[0].href;
        //> Extracts coordinates from element inner text and encode them into base64
        window.open("http://gaia.inegi.org.mx/mdm6/?v="+btoa("lat:"+getQueryString(link, 'lat')+",lon:"+getQueryString(link,'lon')+",z:"+(parseInt(getQueryString(link,'zoom'))+8)));
    }

    //> Taken from WME Permalink to serveral Maps by AlexN-114
    function getQueryString(link, name){
        var pos = link.indexOf( name + '=' ) + name.length + 1;
        var len = link.substr(pos).indexOf('&');
        if (-1 == len) len = link.substr(pos).length;
        return link.substr(pos,len);
    }
})();