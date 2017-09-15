//const IndicatorChar = "Gen";

function nextFormStep(id, page, isLastStep){
	isLastStep = isLastStep || false;
	saveHtmlValues(id, id);

	// go to page 2
	window.location.href = "/index.html#?page=" + page;
	if(isLastStep){
		loadDoc(page, "leftContent", genReviewForm); 
	}else{
		loadDoc(page, "leftContent");
	}
}

function genReviewForm(){
	//document.getElementById(placeHolder).innerHTML = "";
	restoreHTMLValues("reg1", "reg1");
	restoreHTMLValues("reg2", "reg2");
}

function saveHtmlValues(id,formRegion) {
    if (!sessionStorage)
        return;
		
	var savedHTML = $(eval('"#' + formRegion + '"')).html();
	//Save all input data in the specific DIV
	var ancestor = document.getElementById(formRegion),
    descendents = ancestor.getElementsByTagName('*');
	
	var i, e;
	var formValues = {};
	for (i = 0; i < descendents.length; ++i) {
		e = descendents[i];
		if (e.tagName == 'INPUT') {
			//Add special character to indicate items being collected
			//var newId = e.id ; + IndicatorChar;
			//Substitute input id with the new one
			//savedHTML = savedHTML.replace(e.id, newId);
			formValues[e.id] = readInputValue(e);
		}
	}
	//Save all HTML elements in the specific DIV	
    var formHTML = {
        id: id,
		html: savedHTML,
		values: formValues
    };
    sessionStorage.setItem(formRegion,JSON.stringify(formHTML));
};

function readInputValue(inputControl){
	switch (inputControl.getAttribute('type')){
		case "checkbox":
			if(inputControl.checked){
				return true;
			}else{
				return false;
			}
		break;
		case "text":
			return inputControl.value;
		break;
		default:
			return null;
	}
}
function setInputValue(inputControl, val){
	switch (inputControl.getAttribute('type')){
		case "checkbox":
			inputControl.checked = val;
			inputControl.value = val;
			break;
		case "text":
			inputControl.value = val;
			break;
		default:
	}
}
function restoreHTMLValues(page,divHolderName) {
    if (!sessionStorage)
        return;
		
    var data = sessionStorage.getItem(page);
    if (!data)
        return null;
		
    var formData = JSON.parse(data);
	var HtmlStr = String(formData.html);
	//HtmlStr = HtmlStr.replace("message","messageGen");
	document.getElementById(divHolderName).innerHTML= HtmlStr;
	//document.getElementById("messageGen").innerHTML = "These fields and values are stored in sessionStorage and then are retrieved back.";

	var formValue = formData.values;
	for (var key in formValue) {
		if (formValue.hasOwnProperty(key)) {
			setInputValue(document.getElementById(key),formValue[key]);
		}
	}
	
};