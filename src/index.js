import { bindVarsToElements } from "./domBinds.js";
import { bindInteractions } from "./interactionBinds";
import './styles.css';
import { ready } from "./utils.js";

export var jsHookedDOM = {};
    
function registerJsInteractiveDOM() {
    console.log('Registering JS Interactive DOM...');
    
    jsHookedDOM = bindVarsToElements(jsHookedDOM);
    jsHookedDOM = bindInteractions(jsHookedDOM);
}
ready(registerJsInteractiveDOM);