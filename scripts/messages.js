import { 
    getElementById,
    toggle,
    autoScrollDown,
    clearElement
} from "./elementsOperations.js";

import { headerToggle } from "./header.js";

import {
    data
} from "./dataOperations.js"

import {
    createPost,
    readChildren,
    readPost,
    deletePost
} from "./posts.js";

import {
    createUserLi
} from "./user.js"

import {
    getRelativeDate
} from "./time.js"

let messages = getElementById(`messages`);

const msgsToggle = function(btn) {
    let key = btn.id.slice(19);
    btn.blur();

    if(key === `lis`) {
        // Collapse the inbox panel
        messages.classList.toggle(`focus-chat`);
    }    
    else if(key === `clo`) {
        // Close the chat window
        headerToggle(getElementById(`headr-btn-messages-f`));
    }
    else if(key === `max`) {
        // Open a full-window view
        window.location.href = `./messages.html`;
    }
    else if(key === `min`) {
        //  Minimize the chat window
        messages.classList.toggle(`mnmzd`);
        messages.classList.remove(`focus-chat`); // solves isssue
        if(actvBtnTargSide !== null) {
            msgsSideToggle(actvBtnTargSide); // solves the issue of open contacts messing the minimized chat
        }
    }

}

let actvBtnTargSide = null;
let actvBtnTargMain = null;

const msgsSideToggle = function(btn) {
    let key = btn.id.slice(19);
    let srchForm = messages.querySelector(`.msgs-side .srch-form input`);
    let h3 = messages.querySelector(`h3`);

    let keys = {
        "con" : ["msgs-cntcts", "Contacts"], 
        "set" : ["msgs-sttngs", "Settings"]
    }

    let keysKey0 = keys[key][0];
    let keysKey1 = keys[key][1];
    let main = null;
    let others = null;

    if(toggle(getElementById(keysKey0)) === `none`) {
        // Show default sidebar (inbox)
        srchForm.placeholder = `Search chat`;
        h3.innerText = `Chat`;
        actvBtnTargSide = null;
        main = getElementById(`msgs-inbox`).querySelector(`.main`);
        others = getElementById(`msgs-inbox`).querySelectorAll(`:scope > :not(.main)`);
        btn.blur();
    }
    else {
        srchForm.placeholder = `Search ${keysKey1.toLowerCase()}`;
        h3.innerText = keysKey1;
        actvBtnTargSide = btn;
        main = getElementById(keysKey0).querySelector(`.main`);
        others = getElementById(keysKey0).querySelectorAll(`:scope > :not(.main)`);
    }

    toggle(messages.querySelector(`.msgs-headr.left button.back`), `flex`);
    btn.classList.toggle(`focus`);
    toggle(getElementById(`msgs-inbox`));
    if(main) {
        toggle(main, `none`);
        toggle(main);
    }
    others.forEach(function(other) {
        // Solves the issue of persisting `.srch-rslts`
        toggle(other, `none`);
    });

    
}

const msgsMainToggle = function(btn) {
    let key = btn.id.slice(19);
    let tabLabel = messages.querySelector(`.tab-label`);

    let targetElement = null;

    if(key === `new`) {
        targetElement = getElementById(`new-convo`);
        tabLabel.textContent = `New conversation`;
    }
    else if(/^k\d{1,}$/.test(key)) {
        // if id is a convo id, read convo
        targetElement = getElementById(key);
        clearElement(tabLabel);
        tabLabel.append(btn.querySelector(`.usrnme`).cloneNode(true));
    }

    if(toggle(targetElement, `grid`) === `none`) {
        actvBtnTargMain = null; 
        tabLabel.textContent = ``;
    }
    else {
        actvBtnTargMain = btn;
        data[`users`][data[`currentUser`]][`openConvo`] = key;
        data[`changed`] = true;
        if(/^k\d{1,}$/.test(key)) {
            let cntnerMsgs = targetElement.querySelector(`.messages`);
            autoScrollDown(cntnerMsgs);      
        }
    }

    btn.classList.toggle(`focus`);
    if(messages.classList.contains(`unfloat`)) {
        // Show the chat thread only, collapse inbox sidebar
        messages.classList.toggle(`focus-chat`);
    }
}

const clickEventHandler = function(btn) {
    if(btn.id.indexOf(`msgs-btn-targ-wndw`) === 0) {
        msgsToggle(btn);
    }

    else if(btn.id.indexOf(`msgs-btn-targ-main`) === 0) {
        if(actvBtnTargMain) {
            msgsMainToggle(actvBtnTargMain);
            // console.log(`cleared current btn`);
        }
        msgsMainToggle(btn);
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
                data[`users`][data[`currentUser`]][`openConvo`] = null;
                data[`changed`] = true;
            }
        }
    }
    
    else if(btn.id.indexOf(`msgs-btn-cntct`) === 0) {
        // console.log(`reading contact`);
        readContact(btn.id.slice(15));
    }

    else if(btn.classList.contains(`big-btn`)) {
            let form = btn.closest(`.post.form`);
            if(form) {
                if(form.classList.contains(`create`)) {
                    createMsg(btn);
                }
            }
    }
    
    else if(btn.id.indexOf(`srch-rslt`) === 0) {
        // clickEventHandler(getElementById(btn.id.slice(10)));
        readContact(btn.id.slice(25));
        // only works if id format is always `msgs-btn-cntct-user` (Check search.js)
        // Might be a problem when group convos
    }

    else if(btn.classList.contains(`close`)) {
        let srchForm = btn.closest(`.srch-form`);
        if(srchForm) {
            let input =  srchForm.querySelector(`input`);
            input.value = ``;
            input.focus();
            input.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
            input.blur();
        }
    }

    else if(btn.classList.contains(`info`) || btn.classList.contains(`post-main`)) {
        let parent = btn.closest(`.post.msg`);
        toggle(parent.querySelector(`.usrnme`));
        toggle(parent.querySelector(`.post-date`));
    }

    else if(btn.classList.contains(`cncl-convo`)) {
        let convo = btn.closest(`.post-box`);
        deletePost(convo.id, `messages`);
        let convos = data[`users`][data[`currentUser`]][`convosIds`];
        data[`users`][data[`currentUser`]][`convosIds`] = convos.filter(item => item !== convo.id);
        data[`users`][data[`currentUser`]][`openConvo`] = `new`;
        data[`changed`] = true;
    }

}

const createMsg = function(btn) {
    createPost(btn, `messages`);
}

const createNewConvo = function(user) {
    data["globalCurrentId"] += 1;
    let kId = `k${data["globalCurrentId"]}`;
    data[`messages`][kId] = {
        "convoName": null,
          "convoImage": {
            "png": null,
            "webp": null
          },
          "parentId": "x1",
          "users": [data["currentUser"], user],
          "childrenIds": []
        };
    data[`messages`][`x1`][`childrenIds`].push(kId);
    data[`users`][data[`currentUser`]][`convosIds`].push(kId);
    data[`users`][data[`currentUser`]][`openConvo`] = kId;
    data[`changed`] = true;
    // console.log(data);
}

const readContact = function(user) {
    // console.log(`reading contact ${user}`);
    let convos = data[`users`][data[`currentUser`]][`convosIds`];
    let currentUser = data[`currentUser`];
    let existingConvo = convos.find(function(k) {
        let kUsers = data[`messages`][k][`users`];
        if(kUsers[0] === currentUser && kUsers[1] === user || kUsers[1] === currentUser && kUsers[0] === user) {
            return k;
        }
        return false;
    });
    if(existingConvo) {
        clickEventHandler(getElementById(`msgs-btn-targ-main-${existingConvo}`));
    } else {
        createNewConvo(user);
    }
}

const getConvoDetails = function(id) {
    let convo = data[`messages`][id];
    let convoName = convo[`convoName`];
    let convoUsers = convo[`users`];

    if(convoName === null) {
        // Convo name is not set.
        convoName = convoUsers[0];
        if(convoName === data[`currentUser`]) {
            // Convo name is the name of the user on the other side.
            convoName = convoUsers[1];
        }
        if(convoUsers.length > 2) {
            convoName += `+ ${convoUsers.length - 1}`;
        }
    }
    let convoImage = convo[`convoImage`][`png`];
    if(convoImage === null) {
        if(convoUsers.length <= 2) {
            convoImage = data[`users`][convoName][`image`][`png`];
        } else {
            // I want something like in Facebook, where the circle images are like collaged, but I'll implement it next time.
            convoImage = data[`users`][convoName][`image`][`png`];
        }
    }

    let convoPreview = ``;
    let convoPreviewDate = null;
    if(convo[`childrenIds`].length >= 1) {
        let lastMsg = data[`messages`][convo[`childrenIds`][convo[`childrenIds`].length - 1]];
        convoPreview = lastMsg[`content`];
        convoPreviewDate = lastMsg[`createdAt`];
    }

    return {
        "id": id,
        "convoName": convoName,
        "convoImage": convoImage,
        "convoPreview": convoPreview,
        "convoPreviewDate": convoPreviewDate
    }
}

const readInbox = function() {
    let convos = data[`users`][data[`currentUser`]][`convosIds`];
    let fragment = document.createDocumentFragment();
    convos.forEach(function(id) {
        let convoDetails = getConvoDetails(id);
        let convoLi = getElementById(`msgs-btn-targ-main-${id}`);
        if(typeof convoLi === `undefined` || convoLi === null) {
            convoLi = document.createElement(`li`);
            convoLi.setAttribute(`id`, `msgs-btn-targ-main-${id}`);
        }

        convoLi.innerHTML = 
            `<span class="avtr"><img src="${convoDetails["convoImage"]}"></span>
            <span class="usrnme">${convoDetails["convoName"]}</span>
            <p class="chat-prvw">${convoDetails["convoPreview"]}</p>
            <span class="post-date time">
                <span class="time-rel-date"></span>
                <span class="time-time"></span>
                <span class="time-full"></span>
                <span class="time-full-full"></span>
            </span>`;
        fragment.appendChild(convoLi);
        getRelativeDate(convoDetails[`convoPreviewDate`], convoLi);

        readPost(id, `messages`);
        readChildren(id, `messages`);

        let convoInfo = getElementById(id).querySelector(`.convo-info`);
        let cancelConvoBtn = convoInfo.querySelector(`.cncl-convo`);
        if(data[`messages`][id][`childrenIds`].length <= 0) {
            // If a convo is new or has no messages yet, it can be canceled.
            if(!cancelConvoBtn) {
                cancelConvoBtn = document.createElement(`button`);
                cancelConvoBtn.classList.add(`small-btn`, `cncl-convo`);
                cancelConvoBtn.innerText = `Cancel conversation`;
                convoInfo.appendChild(cancelConvoBtn);
            }
        } else {
            if(cancelConvoBtn) {
                cancelConvoBtn.remove();
            }
        }
    });

    let inbox = getElementById(`msgs-inbox`).querySelector(`.main`);
    clearElement(inbox);
    inbox.appendChild(fragment);
    
    if(!window.matchMedia(`(min-width: 39rem)`).matches && messages.classList.contains(`unfloat`)) {
        // When the screen is small and in the full page mode,
        // Don't open the openConvo.
        // Stay at the inbox.
        return;
    }

    let openConvo = data[`users`][data[`currentUser`]][`openConvo`];
    let openConvoBtn = null;
    if(openConvo) {
        openConvoBtn = getElementById(`msgs-btn-targ-main-${openConvo}`);
    }
    if(openConvoBtn && openConvoBtn !== actvBtnTargMain) {
        // Open the open convo
        clickEventHandler(openConvoBtn);
    }
}

const readContacts = function() {
    let contacts = data[`users`][data[`currentUser`]][`contacts`];
    let fragment = document.createDocumentFragment();
    contacts.forEach(function(contact) {        
        let contactId = `msgs-btn-cntct-${contact}`;
        let contactLi = getElementById(contactId);
        if(typeof contactLi !== `undefined` && contactLi !== null) {
            return;
        }
        contactLi = createUserLi(contact);
        contactLi.setAttribute(`id`, contactId);
        fragment.appendChild(contactLi);
    });
    let contactList = getElementById(`msgs-cntcts`).querySelector(`.main`);
    contactList.appendChild(fragment);
}

const messagesProgramFlow = function() {
    readInbox();
    readContacts();
}

messages.style.display = `grid`;
messagesProgramFlow();
messages.style.display = ``;

messages.addEventListener(`click`, function(event) {
    // console.log(event.target);
    let btn = event.target.closest(`button`);
    
    if(typeof btn === `undefined` || btn === null) {
        btn = event.target.closest(`li`);
        // console.log(btn);
    }

    if(typeof btn === `undefined` || btn === null) {
        if(window.matchMedia(`(hover: none)`).matches) {
            btn = event.target.closest(`.post.msg > .post-main`);
        } else {
            return;
        }
        // console.log(btn);
    }

    if(typeof btn !== `undefined` && btn !== null) {
        clickEventHandler(btn);
    }
});

export {
    messagesProgramFlow,
    getConvoDetails
};