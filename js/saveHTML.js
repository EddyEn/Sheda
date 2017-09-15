//** id:= Div or place holder of form controls.
//** page:= url is used to maintain all fields' data when refresh the page.
//** isLastStep:= indicates the last form step and direct to the preview page on the next step.
function nextFormStep(id, page, isLastStep){
	isLastStep = isLastStep || false;
	//Save info of the current step.
	saveHtmlValues(id); 
	// go to next step
	window.location.href = "/index.html#?page=" + page;
	if(isLastStep){
		loadDoc(page, "leftContent", genReviewForm); 
	}else{
		loadDoc(page, "leftContent");
	}
}

//Restore fields' values for all form steps.
function genReviewForm(){
	for(var key in sessionStorage) {
		restoreHTMLValues(key)
	}
}

function saveHtmlValues(formRegionId) {
    if (!sessionStorage)
        return;
		
	var savedHTML = $(eval('"#' + formRegionId + '"')).html();
	//Save all input data in the specific DIV
	var ancestor = document.getElementById(formRegionId),
    descendents = ancestor.getElementsByTagName('*');
	
	var i, e;
	var formValues = {};
	for (i = 0; i < descendents.length; ++i) {
		e = descendents[i];
		if (e.tagName == 'INPUT') {
			formValues[e.id] = readInputValue(e);
		}
	}
	//Save all HTML elements in the specific DIV	
    var formHTML = {
        id: formRegionId,
		html: savedHTML,
		values: formValues
    };
    sessionStorage.setItem(formRegionId,JSON.stringify(formHTML));
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

//Restore fields' values for a single form step.
function restoreHTMLValues(divHolderName) {
    if (!sessionStorage)
        return;
		
    var data = sessionStorage.getItem(divHolderName);
    if (!data)
        return null;
		
    var formData = JSON.parse(data);
	var HtmlStr = String(formData.html);
	//place html string into the control.
	document.getElementById(divHolderName).innerHTML= HtmlStr;

	var formValue = formData.values;
	for (var key in formValue) {
		if (formValue.hasOwnProperty(key)) {
			setInputValue(document.getElementById(key),formValue[key]);
		}
	}
	
};