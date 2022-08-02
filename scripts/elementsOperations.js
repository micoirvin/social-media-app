const memoizedElements = {};

const getElementById = function(id) {
   if(typeof memoizedElements[id] === `undefined` || memoizedElements[id] === null) {
      memoizedElements[id] = document.getElementById(id);
   }
   return memoizedElements[id];
}

const clearElement = function(e) {
    element = document.querySelector(e);
    while (element.firstChild && element.removeChild(element.firstChild));
}

let zIndexStack = 0;
const toggle = function(element, state="") {
    let elementState = getComputedStyle(element).getPropertyValue("display");
    let newElementState = "";

    if (elementState != "none") {
        newElementState = "none";
    }
    else if (state == "") {
        newElementState = "block";
        zIndexStack += 1;
    }
    else {
        newElementState = state;
        zIndexStack += 1;
    }
    element.style.display = newElementState;
    element.style.zIndex = zIndexStack;
    return newElementState;
}

export {
    memoizedElements,
    getElementById,
    clearElement,
    toggle
}