import {
    data,
    updateLocalStorage
} from "./dataOperations.js";

import {
    getElementById,
    toggle
} from "./elementsOperations.js"

const login = function(user) {
    data[`currentUser`] = user;
    updateLocalStorage();
    window.location.href = `./`;
}

const shakeInputField = function(input) {
    input.classList.remove(`field-is-empty`);
    void input.offsetWidth;
    input.classList.add(`field-is-empty`);
    input.focus();
}

const checkUsername = function(username) {
    let userCheck = /^[A-Za-z]\w{2,19}$/;
    // 3 to 20 chars
    // Starts with letter only
    // _ and digits allowed

    if(userCheck.test(username)) {
        return true;
    } else {
        return `Username is not valid. Valid username must be 3 to 20 characters (alphanumeric and underscore only) and must start with a letter.`;
    }
}

const checkInput = function(loginOption) {
    let input = loginOption.querySelector(`input`);
    let value;
    if(typeof input !== `undefined` && input !== null) {
        value = input.value;
    }
    if(typeof value !== `undefined` && value !== null) {
        let validInput = checkUsername(value);
        if(validInput === true) {
            return value;
        } else {
            shakeInputField(input);
            let errMsg = loginOption.querySelector(`.err-msg`);
            toggle(errMsg, `none`);
            toggle(errMsg);
            errMsg.textContent = validInput;
            return false;
        }
    }
}

const loginVerify = function(username, mode) {
    if(mode === `login`) {
        if(data[`users`].hasOwnProperty(username)) {
            return true;
        } else {
            return `Username does not exist.`;
        }
    } else if(mode === `sign-in`) {
        if(data[`users`].hasOwnProperty(username)) {
            return `Username is not available.`;
        } else {
            data[`users`][username] = {
                "image" : {
                    "png" : "./images/avatars/default-image.png",
                    "webp" : ""
                },
                "contacts" : [],
                "convosIds" : []
            }
            return true;
        }
    }
}

const loginFlow = function(loginOption) {
    if(typeof loginOption === `undefined` || loginOption === null) return;

    let validUsername = checkInput(loginOption);
    console.log(`validUsername: ${validUsername}`);
    if(!validUsername) return;
    
    let verify = loginVerify(validUsername, loginOption.id);
    console.log(`verify: ${verify}`);

    let errMsg = loginOption.querySelector(`.err-msg`);
    if(verify === true) {
        toggle(errMsg, `none`);
        login(validUsername);
    } else {
        let input = loginOption.querySelector(`input`);
        shakeInputField(input);
        toggle(errMsg, `none`);
        toggle(errMsg);
        errMsg.textContent = verify;
    }
}

const fragment = document.createDocumentFragment();

for(let user in data[`users`]) {
    let li = document.createElement(`li`);
    li.innerHTML = 
        `<div class="avtr"><img src="${data["users"][user]["image"]["png"]}"></div>
        <div class="usrnme">${user}</div>`;
    li.setAttribute(`id`, `user-${user}`);
    fragment.appendChild(li);
}
getElementById(`users`).appendChild(fragment);

getElementById(`login-box`).addEventListener(`click`, function(e) {
    if(e.target.classList.contains(`big-btn`)) {
        let loginOption = e.target.closest(`.login-option`);
        loginFlow(loginOption);
    }

    let usersList = e.target.closest(`#users`);
    if(typeof usersList !== undefined && usersList !== null) {
        let user = e.target.closest(`li`).id.slice(5);
        login(user);
    }
});


// Add event listener on keydown
document.addEventListener('keydown', function(e) {
    let key = e.key;

    if(key !== `Enter`) return;
    let actvEl = document.activeElement;
    if(typeof actvEl !== `undefined` && actvEl !== null) {
        let loginOption = actvEl.closest(`.login-option`);
        loginFlow(loginOption);
    }
});

