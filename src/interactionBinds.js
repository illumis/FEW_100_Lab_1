export function bindInteractions(jsHookedDOM) {
    jsHookedDOM.bill.inputs.billInput.addEventListener('input', function(evt) {
        event_BillInputChanged(evt, this, jsHookedDOM);
    });

    Object.values(jsHookedDOM.tipToggles.inputs).forEach(function (tipToggle) {
        tipToggle.addEventListener('click', function(evt) {
            event_TipToggled(evt, this, jsHookedDOM);
        });
    });
}

function event_BillInputChanged(evt, element, jsHookedDOM) {
    let newRawBillValue = parseFloat(element.value);
    applyValidationCSS(newRawBillValue, element);
    
    jsHookedDOM.bill.value = newRawBillValue&&newRawBillValue>=0?newRawBillValue:'';
    Object.values(jsHookedDOM.bill.observers).forEach(function(observer) {
        observer.set(jsHookedDOM.bill.value);
    });
}

function event_TipToggled(evt, toggledTip, jsHookedDOM) {
    toggledTip.disabled = true;
    jsHookedDOM.tipToggles.value = parseInt(isNaN(toggledTip.value)?'':toggledTip.value);

    Object.values(jsHookedDOM.tipToggles.observers).forEach(function(observer) {
        observer.set(jsHookedDOM.tipToggles.value);
    });

    Object.values(jsHookedDOM.tipToggles.inputs).forEach(function(input) {
        if (toggledTip !== input) {
            input.disabled = false;
        }
    });
}

function applyValidationCSS(currentValue, fieldElement) {
    if (currentValue < 0) {
        fieldElement.classList.add('is-negative');
    } else if (fieldElement.classList.contains('is-negative')){
        fieldElement.classList.remove('is-negative');
    }
}