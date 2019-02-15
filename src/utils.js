export function ready(cb) {
    document.onreadystatechange = function() {
        //This DOM function is called multiple times on load, where readystate changes
        console.log(document.readyState);
        if(document.readyState === "interactive") {
            cb();
        }
    }
}