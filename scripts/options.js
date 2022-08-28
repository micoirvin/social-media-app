import {
    data,
    updateLocalStorage
} from "./dataOperations.js"

import {
    getElementById
} from "./elementsOperations.js"

import { createUserLi } from "./user.js";

let optionsBox = getElementById(`options`);

const listOptions = function() {
    let currentUserLi = createUserLi(data[`currentUser`]);
    optionsBox.prepend(currentUserLi);
    currentUserLi.setAttribute(`id`, `options-current-user`);
}
listOptions();

const openOption = function(key) {
    if (key === `logout`) {
        data[`currentUser`] = null;
        updateLocalStorage();
        window.location.href = `./login.html`;
    }
}

optionsBox.addEventListener(`click`, function(e) {
    let target = e.target.closest(`li`);
    if (typeof target !== `undefined` && target !== null) {
        let key = target.id.slice(8);
        openOption(key);
    }
});