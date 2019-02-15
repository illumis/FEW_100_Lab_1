import './styles.css';
import { ready } from "./utils.js";

let 
    jsHookedDOM = {};
    
function registerJsInteractiveDOM() {
    console.log('Registering JS Interactive DOM...');
    
    bindVarsToElements();   //Step 1
    bindInteractions();     //Step 2
}

/*==============================================================================
====================================Step 1======================================
==============================================================================*/
function bindVarsToElements() {
    jsHookedDOM.computed = {
        computedTipAmount: {
            element: document.getElementById('summaryTipAmount'),
            set: function() {
                let newRawValue = jsHookedDOM.bill.value * (jsHookedDOM.tipToggles.value/100);
                this.element.innerText = isNaN(newRawValue)?'':newRawValue.toFixed(2);
            }
        },
        computedBillTotal: {
            element: document.getElementById('summaryTotalAmount'),
            set: function () {
                let newRawValue = jsHookedDOM.bill.value+(jsHookedDOM.bill.value * (jsHookedDOM.tipToggles.value/100));
                this.element.innerText = isNaN(newRawValue)?'':newRawValue.toFixed(2);
            }
        },
    };
    jsHookedDOM = {
        bill: {
            value: undefined,
            inputs: {
                billInput: document.getElementById('billInputField'),
            },
            observers: {
                billAmount: {
                    isCurrency: true,
                    element: document.getElementById('summaryBillAmount'),
                    set: helper_setHtmlElement
                },
                computedTip: jsHookedDOM.computed.computedTipAmount,
                computedBill: jsHookedDOM.computed.computedBillTotal,
            }
        },
        tipToggles: {
            value: undefined,
            inputs: {
                toggleTip10Pct: document.getElementById('toggle10PercentTip'),
                toggleTip15Pct: document.getElementById('toggle15PercentTip'),
                toggleTip20Pct: document.getElementById('toggle20PercentTip'),
            },
            observers: {
                toggleTipObserver_Description: {
                    element: document.getElementById('toggleTipPercentage'),
                    set: helper_setHtmlElement
                },
                toggleTipObserver_Summary: {
                    element: document.getElementById('summaryTipPercentage'),
                    set: helper_setHtmlElement
                },
                computedTip: jsHookedDOM.computed.computedTipAmount,
                computedBill: jsHookedDOM.computed.computedBillTotal,
            }
        }
    };

    console.log('Completed - binding vars to elements')
    console.log(jsHookedDOM);
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