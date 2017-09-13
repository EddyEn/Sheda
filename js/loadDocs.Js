var globalXmlHttp;
const DBSOURCE = "db/products.xml"

function asynConnectData(httpCall, page, callback, pageType) {
	httpCall.open("GET", page, true);
	httpCall.onreadystatechange = callback;
	try { xmlHttpresponseType = "msxml-document" } catch (err) { } // Helping IE11
	httpCall.send("");
}

function loadDoc(page) {
	var HttpObject;
	if (window.ActiveXObject) {
		//For old IE versions.
        HttpObject = new ActiveXObject("Msxml2.XMLHTTP");
    }
    else {
        HttpObject = new XMLHttpRequest();
    }
	
	switch (getPageTypeName(page, "type")) {
		case "xml":
			globalXmlHttp = HttpObject; // this will be used when loading XSL to format data from XML.
			HttpObject.overrideMimeType('text/xml');
			asynConnectData(HttpObject, DBSOURCE, function () { xmlReady(HttpObject, page) },"xml");
			break;
		case "xsl":
			asynConnectData(HttpObject, page, function () { xslReady(HttpObject, page) },"xsl");
			break;
		default:
			asynConnectData(HttpObject, page, function () { htmlReady(HttpObject, page) },"html");
	}
}

// Call back functions when xml file is ready
function xmlReady(HttpObject, page) {
	if (HttpObject.readyState == 4 && HttpObject.status == 200) {
		var XSLname = "specials.xsl";
		//load XSL after XML is ready
		loadDoc(XSLname);
	}
}

// Call back functions when html file is ready
function htmlReady(HttpObject, page) {
	if (HttpObject.readyState == 4 && HttpObject.status == 200) { 
		document.getElementById("leftContent").innerHTML = '';
		document.getElementById("leftContent").innerHTML = HttpObject.responseText;
		setMenuMarker(page); // Highlight on the selected page.
	}
}

// Call back functions when xsl file is ready
function xslReady(HttpObject, page) {
	if (HttpObject.readyState == 4 && HttpObject.status == 200) {
		if (document.implementation && document.implementation.createDocument) {
			xsltProcessor = new XSLTProcessor();
			xsltProcessor.importStylesheet(HttpObject.responseXML);
			//Apply XSL to XML
			resultDocument = xsltProcessor.transformToFragment(globalXmlHttp.responseXML, document);
			globalXmlHttp = null; // Clear global object after using
			var left = document.getElementById("leftContent");
			setMenuMarker(page); // Highlight on the selected page.
			left.innerHTML = ''; //clear old content before displaying a new one
			left.appendChild(resultDocument);
		}

	}
}

function setMenuMarker(page) {
	var lis = document.getElementById("menu").getElementsByTagName("li");
	for (var i = 0; i < lis.length; ++i) {
		if (lis[i].id == getPageTypeName(page, "name")) {
			lis[i].setAttribute("class", "selected");
		} else {
			lis[i].setAttribute("class", "");
		}
	}

}

function getPageFormURL() {
	var lpage = location.hash.substring(2); //take 2 chars out from the start position. take "#" out of the url query string
	if (lpage == "") {
		loadDoc("home.html");
		return;
	}
	loadDoc(urlVal("#?page"));
}

function getPageTypeName(pageName, typeOrName) {
	var parts = pageName.split(".");
	if (typeOrName == "type") {
		return parts[parts.length - 1]; // return file type
	} else { return parts[0]; }
}

function urlVal(val) {
	var str = location.hash.split("&");
	var result;
	//x=str[0].split("=")[0].replace(" ","");
	var arrayLength = str.length;
	for (var i = 0; i < arrayLength; i++) {
		//Be careful about conditinal branches, they have to be discovered and defined.
		var y = decodeURIComponent(str[i]);
		var pName = y.split("=")[0];
		if (pName == val) {
			result = y.split("=")[1];
		} else {
			result = "no val found";
		}
	}
	return result;
}

function storeDataStep1(id){
	savePage(id);
	renderdHtml = restorePage();
	
	// go to page 2
}
function storeDataStep2(){

}

function savePage(id) {
    if (!sessionStorage)
        return;
    
    var data = {
        id: id,
        html: $("#reg1").html()
    };
    sessionStorage.setItem("reg1",JSON.stringify(data));
};

function restorePage() {
    if (!sessionStorage)
        return;    
    var data = sessionStorage.getItem("reg1");
    if (!data)
        return null;
    return JSON.parse(data);
};
