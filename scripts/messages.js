// let firstTime = true;
// let container = document.querySelector(`.messages`);
// if (firstTime) {
//     container.scrollTop = container.scrollHeight;
//     firstTime = false;
// } else if (container.scrollTop + container.clientHeight === container.scrollHeight) {
//     container.scrollTop = container.scrollHeight;
// }

import { 
    getElementById,
    toggle
} from "./elementsOperations.js";

import { headerToggle } from "./header.js";

let messages = getElementById(`messages`);

let msgsBtns = messages.querySelectorAll(`button`);

let actvSide = `.msgs-list.rcnt-chat`;
let actvMain = ``;

const msgsToggle = function(btn) {
    let key = btn.id.slice(19);

    if(key === `lis`) {
        messages.classList.toggle(`focus-chat`);
    }    
    else if(key === `clo`) {
        headerToggle(getElementById(`headr-btn-messages-f`));
    }
    else if(key === `max`) {
        window.location.href = `./messages.html`;
    }
    else if(key === `min`) {
        messages.classList.toggle(`mnmzd`);
    }

}

let actvBtnTargSide = null;
let actvBtnTargMain = null;

const msgsSideToggle = function(btn) {
    let key = btn.id.slice(19);
    let srchForm = messages.querySelector(`.msgs-side .srch-form input`);
    let h3 = messages.querySelector(`h3`);

    let keys = {
        "con" : [".cntcts", "Contacts"], 
        "set" : [".msgs-sttngs", "Settings"]
    }

    let keysKey0 = keys[key][0];
    let keysKey1 = keys[key][1]

    if(toggle(messages.querySelector(keysKey0)) === `none`) {
        srchForm.placeholder = `Search chat`;
        h3.innerText = `Chat`;
        actvBtnTargSide = null;
    }
    else {
        srchForm.placeholder = `Search ${keysKey1.toLowerCase()}`;
        h3.innerText = keysKey1;
        actvBtnTargSide = btn;
    }

    toggle(messages.querySelector(`.msgs-headr.left button.back`), `flex`);
    btn.classList.toggle(`focus`);
    toggle(messages.querySelector(`.rcnt-chat`));
    
}

const msgsMainToggle = function(btn) {
    let key = btn.id.slice(19);
    let tabLabel = messages.querySelector(`.tab-label`);

    let targetElement = null;

    if(key === `new`) {
        targetElement = messages.querySelector(`#new-convo`);
        tabLabel.textContent = `New conversation`;
    }

    else if (key.indexOf(`convo`) === 0) {
        targetElement = messages.querySelector(`#${key}`);
        if (typeof targetElement === `undefined` || targetElement === null) {
            targetElement = messages.querySelector(`#convo-1-1`);
        }
        tabLabel.textContent = `User name`;
    }

    if(toggle(targetElement, `grid`) === `none`) {
        actvBtnTargMain = null;
    }
    else {
        actvBtnTargMain = btn;
    }

    btn.classList.toggle(`focus`);
    if(messages.classList.contains(`unfloat`)) {
        messages.classList.toggle(`focus-chat`);
    }
}

messages.addEventListener(`click`, function(event) {
    let btn = event.target.closest(`button`);
    
    if(typeof btn === `undefined` || btn === null) {
        btn = event.target.closest(`li`);
    }

    if(typeof btn !== `undefined` && btn !== null) {
        if(btn.id.indexOf(`msgs-btn-targ-wndw`) === 0) {
            msgsToggle(btn);
        }

        else if(btn.id.indexOf(`msgs-btn-targ-main`) === 0) {
            if(actvBtnTargMain !== null && btn !== actvBtnTargMain) {
                msgsMainToggle(actvBtnTargMain);
                console.log(`cleared current btn`);
            }

            if(btn.tagName === `BUTTON` || (btn.tagName === `LI` && btn !== actvBtnTargMain)) {
                console.log(`toggle new btn`)
                msgsMainToggle(btn);
            }
        }

        else if(btn.id.indexOf(`msgs-btn-targ-side`) === 0) {
            if(actvBtnTargSide !== null && btn !== actvBtnTargSide) {
                msgsSideToggle(actvBtnTargSide);
            }
            msgsSideToggle(btn);
        }

        else if(btn.classList.contains(`back`)) {
            if(btn.closest(`.msgs-headr`).classList.contains(`left`)) {
                if(actvBtnTargSide !== null) {
                    msgsSideToggle(actvBtnTargSide);
                }
            }
            else if(btn.closest(`.msgs-headr`).classList.contains(`right`)) {
                if(actvBtnTargMain !== null) {
                    msgsMainToggle(actvBtnTargMain);
                }
            }
        }
    }
});

// messages.style.display = `grid`;