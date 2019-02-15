
export function bindVarsToElements(jsHookedDOM) {
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
    
    return jsHookedDOM;
}

//HELPER - Element Setters
function helper_setHtmlElement(newValue) {
    this.element.innerText = this.isCurrency?newValue.toFixed(2):newValue;
}