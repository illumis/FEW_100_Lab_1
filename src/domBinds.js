export function bindVarsToElements(jsHookedDOM) {
    jsHookedDOM.computed = {
        computedTipAmount: {
            element: document.getElementById('summaryTipAmount'),
            set: function() {
                this.element.innerText = jsHookedDOM.bill.value && jsHookedDOM.tipToggles.value
                    ? formatAsCurrency(jsHookedDOM.bill.value * (jsHookedDOM.tipToggles.value/100))
                    : '';
            }
        },
        computedBillTotal: {
            element: document.getElementById('summaryTotalAmount'),
            set: function () {
                this.element.innerText = jsHookedDOM.bill.value && jsHookedDOM.tipToggles.value
                ? formatAsCurrency(jsHookedDOM.bill.value+(jsHookedDOM.bill.value * (jsHookedDOM.tipToggles.value/100)))
                : '';
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
                    set: setNonComputedObserver
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
                    set: setNonComputedObserver
                },
                toggleTipObserver_Summary: {
                    element: document.getElementById('summaryTipPercentage'),
                    set: setNonComputedObserver
                },
                computedTip: jsHookedDOM.computed.computedTipAmount,
                computedBill: jsHookedDOM.computed.computedBillTotal,
            }
        }
    };
    
    return jsHookedDOM;
}

function setNonComputedObserver(newValue) {
    this.element.innerText = this.isCurrency&&newValue?formatAsCurrency(newValue):newValue
}

function formatAsCurrency(newValue){
    return newValue?newValue.toFixed(2):newValue;
}