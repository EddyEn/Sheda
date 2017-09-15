var globalXmlHttp;
const DBSOURCE = "db/products.xml";
var isDocLoaded = false;
function asynConnectData(httpCall, page, callback, pageType) {
	httpCall.open("GET", page, true);
	httpCall.onreadystatechange = callback;
	try { xmlHttpresponseType = "msxml-document" } catch (err) { } // Helping IE11
	httpCall.send("");
}

function loadDoc(page, placeHolderName, afterLoadedFunction) {
	afterLoadedFunction = afterLoadedFunction || 0;
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
			asynConnectData(HttpObject, DBSOURCE, function () { xmlReady(HttpObject, page, placeHolderName) },"xml");
			break;
		case "xsl":
			asynConnectData(HttpObject, page, function () { xslReady(HttpObject, page, placeHolderName) },"xsl");
			break;
		default:
			asynConnectData(HttpObject, page, function () { htmlReady(HttpObject, page, placeHolderName, afterLoadedFunction) },"html");
	}
}

// Call back functions when xml file is ready
function xmlReady(HttpObject, page, placeHolderName) {
	if (HttpObject.readyState == 4 && HttpObject.status == 200) {
		var XSLname = "specials.xsl";
		//load XSL after XML is ready
		loadDoc(XSLname, placeHolderName);
	}
}

// Call back functions when html file is ready
function htmlReady(HttpObject, page, placeHolderName, afterLoadedFunction) {
	if (HttpObject.readyState == 4 && HttpObject.status == 200) { 
		document.getElementById(placeHolderName).innerHTML = '';
		document.getElementById(placeHolderName).innerHTML = HttpObject.responseText;
		setMenuMarker(page); // Highlight on the selected page.
		if(afterLoadedFunction==0){
			return;
		}else{
			afterLoadedFunction();
		}
	}
}

// Call back functions when xsl file is ready
function xslReady(HttpObject, page, placeHolderName) {
	if (HttpObject.readyState == 4 && HttpObject.status == 200) {
		if (document.implementation && document.implementation.createDocument) {
			xsltProcessor = new XSLTProcessor();
			xsltProcessor.importStylesheet(HttpObject.responseXML);
			//Apply XSL to XML
			resultDocument = xsltProcessor.transformToFragment(globalXmlHttp.responseXML, document);
			globalXmlHttp = null; // Clear global object after using
			var left = document.getElementById(placeHolderName);
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
		loadDoc("home.html", "leftContent" );
	}else if(urlVal("#?page") == "review.html"){
		loadDoc(urlVal("#?page"), "leftContent", genReviewForm);
	}else{
		loadDoc(urlVal("#?page"), "leftContent");
	}
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

