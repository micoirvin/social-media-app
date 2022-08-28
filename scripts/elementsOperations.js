const memoizedElements = {};

const getElementById = function(id, clear = false) {
    if(typeof memoizedElements[id] === `undefined` || memoizedElements[id] === null) {
        memoizedElements[id] = document.getElementById(id);
    }
    if(clear) {
        memoizedElements[id] = null;
    }
    return memoizedElements[id];
}

const clearElement = function(element) {
    while(typeof element.firstChild !== `undefined` && element.firstChild !== null) {
        if(element.firstChild.id) {
            getElementById(element.firstChild.id, true);
        }
        element.removeChild(element.firstChild);
    }
}

let zIndexStack = 0;
const toggle = function(element, state="") {
    let elementState = getComputedStyle(element).getPropertyValue("display");
    let newElementState = "";

    if (elementState !== "none") {
        newElementState = "none";
    }
    else if (state === "") {
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

const autoScrollDown = function(cntner, firstTime = true, child) {
    if(firstTime) {
        cntner.scrollTop = cntner.scrollHeight;
    } 
    else {
        let extraHeight = 0;
        if(child) {
            extraHeight = child.clientHeight;
        }
        let swipedHeight = cntner.scrollTop + cntner.clientHeight;
        if(swipedHeight + extraHeight <= cntner.scrollHeight + 1 
            && swipedHeight + extraHeight >= cntner.scrollHeight - 1) {
            // Don't scroll down if the user is scrolling up (trying to read past messages)
            cntner.scrollTop = cntner.scrollHeight;
        }
    }
}

document.body.addEventListener(`click`, function(e) {
    if(actvFloatingBox.element !== null && !actvFloatingBox.element.contains(e.target)) {
        if(actvFloatingBox.closable) {
            actvFloatingBox.setElem(null);
            actvFloatingBox.closable = false;
        } else {
            actvFloatingBox.closable = true;
        }
    }
}); 

let actvFloatingBox = {
    element : null,
    closable: false,
    setElem: function(newElem) {
        if(this.element !== null && newElem !== this.element) {
            toggle(this.element, `none`);
        }
        this.element = newElem;
        this.closable = false;
    }
}

export {
    memoizedElements,
    getElementById,
    clearElement,
    toggle,
    autoScrollDown,
    actvFloatingBox
}