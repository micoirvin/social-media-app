import { data } from "./dataOperations.js";

const createUserLi = function(user) {
    let li = document.createElement(`li`);
    let avtr = document.createElement(`span`);
    avtr.classList.add(`avtr`);
    let img = document.createElement(`img`);
    img.setAttribute(`src`, data["users"][user]["image"]["png"]);
    avtr.appendChild(img);
    let usrnme = document.createElement(`span`);
    usrnme.classList.add(`usrnme`);
    usrnme.textContent = user;
    li.appendChild(avtr);
    li.appendChild(usrnme);
    li.classList.add(`user`);

    return li;
}

const addAddUserBtn = function(li, user) {
    let btn = document.createElement(`button`);
    btn.classList.add(`small-btn`, `light-btn`);
    btn.id = `add-user-${user}`;
    btn.innerText = `+`;
    li.appendChild(btn);
    return li;
}

const addUser = function(user) {
    data[`users`][data[`currentUser`]][`contacts`].push(user);
    data[`changed`] = true;
    // console.log(data);
}

export {
    createUserLi,
    addAddUserBtn,
    addUser
};