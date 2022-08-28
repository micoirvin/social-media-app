import { 
    getElementById,
    toggle,
    actvFloatingBox
} from "./elementsOperations.js";

import { data } from "./dataOperations.js";

const mediumMq = window.matchMedia(`(min-width: 39rem) and (min-height: 400px)`);
const header = document.querySelector(`header`);
let actvBtn = null;

const headerToggle = function(btn, state=``) {
    let target = btn.id.slice(10);
    let targetKeys = target.split(`-`);
    let newState = `none`;

    if(mediumMq.matches && targetKeys[1] === `f`) {
        // Floatable
        if (targetKeys[0] === `messages`) state = `grid`;   
        newState = toggle(getElementById(targetKeys[0]), state);
    }
    else {
        // Not floatable. Link to own html page
        if (targetKeys[1] === `x`) {
            btn.blur();
            // DO: remove the contents of input 
            return;
        }
        window.location.href = `./${targetKeys[0]}.html`;
    }

    if(newState !== `none`) {
        actvBtn = btn;
        if(targetKeys[0] === `messages`) {
            // Messages sticks below
            btn.classList.add(`focus`);
        } else {
            // Others float
            actvFloatingBox.setElem(getElementById(targetKeys[0]));
            // This ensures that any external click will close a floating box.
        }
    }
    else {
        if(targetKeys[0] === `messages`) {
            btn.classList.remove(`focus`);
        }
        if (btn.tagName === `INPUT` && btn === actvBtn) {
            // Reactivate input, so it does not close when button is re-clicked
            toggle(getElementById(targetKeys[0]), state);
            actvFloatingBox.closable = false;
        } else {
            actvBtn = null;
            btn.blur();
        }
    }
}

header.addEventListener(`click`, function(e) {
    let btn = e.target.closest(`button`);

    if(typeof btn === `undefined` || btn === null) {
        btn = e.target.closest(`input`);
    }

    if(typeof btn !== `undefined` && btn !== null && !btn.disabled) {
        if(btn.id.slice(0, 9) === `headr-btn`) {
                headerToggle(btn);
        }
    }
});

const setCurrentUserAvtr = function() {
    let currentUserAvtr = document.createElement(`img`);
    let currentUser = data[`currentUser`];
    currentUserAvtr.setAttribute(`src`, data[`users`][currentUser][`image`][`png`]);
    getElementById(`current-user-avtr`).append(currentUserAvtr);
}
setCurrentUserAvtr();

export { headerToggle };