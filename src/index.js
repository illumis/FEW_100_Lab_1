import { bindVarsToElements } from "./bindingDOM.js";
import './styles.css';
import { ready } from "./utils.js";

var jsHookedDOM = {};
    
function registerJsInteractiveDOM() {
    console.log('Registering JS Interactive DOM...');
    
    jsHookedDOM = bindVarsToElements(jsHookedDOM);   //Step 1
    bindInteractions();     //Step 2
}

/*==============================================================================
====================================Step 2======================================
==============================================================================*/
function bindInteractions() {
    jsHookedDOM.bill.inputs.billInput.addEventListener('input', event_BillInputChanged);

    Object.values(jsHookedDOM.tipToggles.inputs).forEach(function (tipToggle) {
        tipToggle.addEventListener('click', event_TipToggled);
    });
}

function event_BillInputChanged(evt) {
    let newRawBillValue = parseFloat(this.value);
    helper_ValidateInput(newRawBillValue, this);
    
    jsHookedDOM.bill.value = isNaN(newRawBillValue)?'':newRawBillValue;
    Object.values(jsHookedDOM.bill.observers).forEach(function(observer) {
        observer.set(jsHookedDOM.bill.value);
    });
}

function event_TipToggled(evt) {
    let toggledTip = this;
    toggledTip.disabled = true;
    jsHookedDOM.tipToggles.value = parseInt(isNaN(this.value)?'':this.value);
    Object.values(jsHookedDOM.tipToggles.observers).forEach(function(observer) {
        observer.set(jsHookedDOM.tipToggles.value);
    });
    Object.values(jsHookedDOM.tipToggles.inputs).forEach(function(input) {
        if (toggledTip !== input) {
            input.disabled = false;
        }
    });
}

//===================================== helpers ==============================================
function helper_ValidateInput(currentValue, fieldElement) {
    if (currentValue < 0) {
        fieldElement.classList.add('is-negative');
        shouldRenderSummary = false;
    } else if (fieldElement.classList.contains('is-negative')){
        fieldElement.classList.remove('is-negative');
        shouldRenderSummary = true;
    }
}


//Element Setters
function helper_setHtmlElement(newValue) {
    this.element.innerText = this.isCurrency?newValue.toFixed(2):newValue;
}

/*==============================================================================
======================================END=======================================
==============================================================================*/
ready(registerJsInteractiveDOM);