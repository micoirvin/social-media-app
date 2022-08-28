import { 
    getElementById,
    toggle,
    clearElement
} from "./elementsOperations.js";

import {
    createUserLi,
    addAddUserBtn,
    addUser
} from "./user.js"

import { data } from "./dataOperations.js";

import {
    getConvoDetails
} from "./messages.js"

let searchElem = getElementById(`search`);

const discoverPeopleAlgo = function() {
    // Placeholder algo at the moment
    // Just adds at most 6 users that are not in the current user's contacts
    let n = 6;
    let result = [];
    let i = 0;
    for(let user in data[`users`]) {
        if(data[`users`][data[`currentUser`]][`contacts`].indexOf(user) === -1 && user !== data[`currentUser`]) {
            result.push(user);
            i += 1;
        }
        if(i >= n) {
            break;
        }
    }
    return result;
}

const discoverPeople = function() {
    let resultList = discoverPeopleAlgo();
    let fragment = document.createDocumentFragment();
    // console.log(resultList);
    resultList.forEach(function(user) {
        let li = createUserLi(user);
        li = addAddUserBtn(li, user);
        fragment.appendChild(li);
    });
    clearElement(getElementById(`srch-dscvr`));
    getElementById(`srch-dscvr`).appendChild(fragment);
}
discoverPeople();

searchElem.addEventListener(`click`, function(e) {
    let btn = e.target.closest(`.small-btn`);
    if(btn) {
        if(btn.id.indexOf(`add-user-`) === 0) {
            addUser(btn.id.slice(9));
            btn.innerHTML = `&#x2713;`; // Check symbol
            btn.disabled = true;
            btn.style.border = `none`;
            btn.style.outline = `none`;
            // btn.closest(`li`).remove();
        }
    }
});

const searchAlgo = function(kw, listKey) {
    let currentUser = data[`users`][data[`currentUser`]];
    let results = {};
    let list = {};
    if(listKey === `users`) {
        list = data[`users`];
    } 
    else if(listKey === `convos`) {
        let convos = currentUser[`convosIds`];
        convos.forEach(function(id) {
            let details = getConvoDetails(id);
            // For convos, convo details are needed
            list[details[`convoName`]] = details;
        });
    } 
    else if(listKey === `contacts`) {
        list = currentUser[`contacts`];
    }

    for(let item in list) {
        if(Array.isArray(list)) {
            // Case for listKey = contacts
            item = list[item];
        }
        let kwRegEx = new RegExp(kw, `gi`);
        if(kwRegEx.test(item)) {
            // Main algo
            // Simply checks if keyword is a substring of the item
            if(listKey === `convos`) {
                // For convos, convo details are needed
                results[item] = list[item];
            } else {
                results[item] = null;
            }
        };
    }
    return results;
}

const search = function(input) {
    let results = {};
    let kw = input.value;
    let listKey = ``;
    let location = ``;
    let resultsBox = null;
    let defaultElem = null;

    if(input.id === `headr-btn-search-f`) {
        resultsBox = searchElem.querySelector(`.srch-rslts`);
        listKey = `users`;
        location = `search`;
        defaultElem = getElementById(`srch-dscvr`);
    }
    
    else if(input.closest(`.msgs-side`)) {    
        location = `messages`;   
        if(input.placeholder === `Search chat`) {
            listKey = `convos`;
            defaultElem = getElementById(`msgs-inbox`).querySelector(`.main`);
            resultsBox = getElementById(`msgs-inbox`).querySelector(`.srch-rslts`);
        } else if(input.placeholder === `Search contacts`) {
            listKey = `contacts`;
            defaultElem = getElementById(`msgs-cntcts`).querySelector(`.main`);
            resultsBox = getElementById(`msgs-cntcts`).querySelector(`.srch-rslts`);
        }
    }

    else if(getElementById(`new-convo`).contains(input)) {
        listKey = `users`;
        location = `messages`;
        defaultElem = getElementById(`new-convo`).querySelector(`.main`);
        resultsBox = getElementById(`new-convo`).querySelector(`.srch-rslts`)
    }


    clearElement(resultsBox);
    toggle(defaultElem, `none`);
    toggle(resultsBox, `none`);
    

    if(kw === ``) {
        toggle(defaultElem);
    }
    
    else {
        results = searchAlgo(kw, listKey);
        let fragment = document.createDocumentFragment();

        if(Object.keys(results).length === 0) {
            fragment.textContent = `No results`;
        }

        for(let item in results) {
            let li;
            if(listKey === `convos`) {
                li = document.createElement(`li`)
                li.innerHTML = 
                `<span class="avtr"><img src="${results[item]["convoImage"]}"></span>
                <span class="usrnme">${results[item]["convoName"]}</span>
                <p class="chat-prvw">${results[item]["convoPreview"]}</p>`;
                li.setAttribute(`id`, `srch-rslt-msgs-btn-targ-main-${results[item]["id"]}`)
                // The id will be used by messages.js to handle a click. Check click handler in messages.js
            }
            
            else if(listKey === `contacts` && location === `messages`) {
                li = createUserLi(item);
                li.setAttribute(`id`, `srch-rslt-msgs-btn-cntct-${item}`);
                // The id will be used by messages.js to handle a click. Check click handler in messages.js
            }
            
            else if(listKey === `users`) {
                li = createUserLi(item);
                if(location === `messages`) {
                    li.setAttribute(`id`, `srch-rslt+msgs-btn-cntct-${item}`);
                } else if(location === `search`) {
                    if(data[`users`][data[`currentUser`]][`contacts`].indexOf(item) === -1 && item !== data[`currentUser`]) {
                        // If the item is not a contact && not self
                        addAddUserBtn(li, item);
                    }
                }
            }
            fragment.appendChild(li);
        }

        resultsBox.appendChild(fragment);
        toggle(resultsBox);
    }
}

document.body.addEventListener(`focus`, function(e) {
    let input = e.target;
    if(input.tagName === `INPUT` && input.closest(`.srch-form`)) {
        if(searchElem.contains(input)) {
            discoverPeople();
        }
        search(input);
    } 
}, true);

document.addEventListener('keyup', function() {
    let input = document.activeElement;
    if(input && input.tagName === `INPUT` && input.closest(`.srch-form`)) {
        search(input);
    }
});
