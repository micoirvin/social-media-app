import {
    data
} from "./dataOperations.js";

import {
    getElementById,
    autoScrollDown,
    toggle,
    actvFloatingBox
} from "./elementsOperations.js";

import {
    svgAssets
} from "./svgAssets.js"

import {
    getRelativeDate
} from "./time.js"

const createPost = function(btn, dataKey = `posts`) {
    let form = btn.closest(`.post.form`);
    let textarea = form.querySelector(`textarea`);
    let content = textarea.value;
    textarea.value = ``;
    let parentId = form.parentElement.id;

    if (content === `` || typeof content === `undefined` || content === null) {
        return;
    }

    let postId = `p`;
    if (form.classList.contains(`reply`)) {
        postId = `r`;
    } else if (form.classList.contains(`cmmnt`)) {
        postId = `c`;
    } else if (form.classList.contains(`msg`)) {
        postId = `m`;
    }

    data[`globalCurrentId`] += 1;
    postId += data[`globalCurrentId`];

    let createdAt = new Date();

    data[dataKey][postId] = {
        "parentId": parentId,
        "content": content,
        "createdAt": createdAt.getTime(),
        "score": 0,
        "user": data["currentUser"],
        "childrenIds": []
    };

    data[dataKey][parentId]["childrenIds"].push(postId);
    data[`changed`] = true;
    // console.log(data);
    readPost(postId, dataKey);
}
window.createPost = createPost;

const createPostForm = function(id) {
    let allKeys = {
        "x": {
            "btnContent": "POST",
            "placeholder": "What's happening",
            "extraClasses": [`post`, `post`]
        },
        "p": {
            "btnContent": "COMMENT",
            "placeholder": "Send a comment",
            "extraClasses": [`post`, `cmmnt`]
        },
        "c": {
            "btnContent": "REPLY",
            "placeholder": "Send a reply",
            "extraClasses": [`cmmnt`, `reply`]
        },
        "r": {
            "btnContent": "REPLY",
            "placeholder": "Send a reply",
            "extraClasses": [`cmmnt`, `reply`]
        },
        "k": {
            "btnContent": "SEND",
            "placeholder": "Send a message",
            "extraClasses": [`post`, `msg`]
        },
        "m": {
            "btnContent": "SEND",
            "placeholder": "Send a reply",
            "extraClasses": [`msg`, `reply`]
        }
    }
    let keys = allKeys[id[0]];
    let postBox = getElementById(id);
    let form = document.createElement(`div`);
    postBox.appendChild(form);
    form.classList.add(`post`, `form`, `create`, keys[`extraClasses`][0], keys[`extraClasses`][1]);

    let btnContent = ``;
    if (keys[`btnContent`] === `POST`) {
        btnContent = `POST`;
    } else {
        btnContent =
            `<span class="btn-text">${keys[`btnContent`]}</span> ${svgAssets["paper-plane"]}`;
    }
    let formContent =
        `<a href="#" class="avtr"><img src="${data["users"][data["currentUser"]]["image"]["png"]}"></a>
        <button type="submit" class="big-btn">
            ${btnContent}
        </button>`;

    if (keys[`btnContent`] === `POST`) {
        form.innerHTML = `<div class="post-footr">` + formContent + `</div>`;
    } else {
        form.innerHTML = formContent;
    }

    let textarea = document.createElement(`textarea`);
    textarea.setAttribute(`placeholder`, keys[`placeholder`]);
    form.appendChild(textarea);
    if (keys[`btnContent`] !== `POST`) {
        textarea.focus();
    }
}

const readPost = function(id, dataKey = `posts`) {
    // console.log(`reading ${id}`);
    let post = getElementById(id);
    if (typeof post !== `undefined` && post !== null) {
        return; // The post was already read.
    }
    post = data[dataKey][id];

    let parentId = post[`parentId`];
    
    let parentPost = getElementById(parentId);
    if (typeof parentPost === `undefined` || parentPost === null) {
        // If the parent does not exist yet.
        readPost(parentId);
        parentPost = getElementById(parentId);
    }
    
    let keys = {
        "p": {
            "section": "posts",
            "childrenSection" : "comments",
            "btnContent": "Comment",
            "extraClasses": ["post", "post"] 
        },
        "c": {
            "section": "comments",
            "childrenSection" : "replies",
            "btnContent": "Reply",
            "extraClasses": ["post", "cmmnt"] 
        },
        "r": {
            "section": "replies",
            "btnContent": "Reply",
            "childrenSection" : "replies",
            "extraClasses": ["cmmnt", "reply"] 
        },
        "k": {
            "section": "convos",
            "btnContent": "Message",
            "childrenSection" : "messages",
            "extraClasses": ["post", "convo"]
        },
        "m": {
            "section": "messages",
            "btnContent": "Reply",
            "childrenSection" : "replies",
            "extraClasses": ["post", "msg"] 
        }
    };

    let key = id[0];    
    let sectionKey = keys[key][`section`];
    let postSection = parentPost.querySelector(`.${sectionKey}`);
    if (typeof postSection === `undefined` || postSection === null) {
        // If comments section or replies section does not exist yet.
        postSection = document.createElement(`div`);
        postSection.classList.add(sectionKey);
        parentPost.appendChild(postSection);
    }

    let postBox = document.createElement(`div`);
    postBox.classList.add(`post-box`);
    postBox.setAttribute(`id`, id);
    if(/^p|c|r$/.test(key)) {
        postSection.prepend(postBox);
        // post / comment / reply
        // most recent need to be on top
    } else if(/^k|m$/.test(key)) {
        postSection.append(postBox); 
        // convo / message
        // most recent need to be at the bottom
    }

    let cssClass = keys[key][`extraClasses`];
    let postElement = document.createElement(`div`);
    postElement.classList.add(`post`, cssClass[0], cssClass[1]);
    postBox.appendChild(postElement);

    let userRole = ``;
    let footrMore = `No options`;
    let footrUpdtBtns = ``;
    if (post[`user`] === data[`currentUser`]) {
        userRole = `<a class="user-role">you</a>`;
        postElement.classList.add(`self`);
        footrMore = 
            `<button class="small-btn del" type="button" onclick="toggleDelModal('${id}')">Delete</button>
            <button class="small-btn" type="button" onclick="createEditForm('${id}')">Edit</button>`;
        footrUpdtBtns = 
            `<button type="submit" class="small-btn" onclick="closeEditForm('${id}')">Cancel</button>
            <button type="submit" class="big-btn" onclick="updatePost('${id}')">UPDATE</button>`
    }

    let childrenSection = document.createElement(`div`);
    childrenSection.classList.add(keys[key][`childrenSection`]);
    postBox.appendChild(childrenSection);

    if(/^p|c|r$/.test(key)) {
        // Need to see the CSS to see the structuring of certain elements here.
        // post / comment / reply
        postElement.innerHTML = 
        `<div class="post-headr">
            <a href="#" class="avtr"><img src="${data["users"][post["user"]]["image"]["png"]}"></a>
            <span class="usrnme-box">
                <a href="#" class="usrnme">${post["user"]}</a>
                ${userRole}
            </span>
            <a class="post-date time">
                <span class="time-rel-date"></span>
                <span class="time-time"></span>
                <span class="time-full"></span>
                <span class="time-full-full"></span>
            </a>
        </div>
    
        <p class="post-main">${post["content"]}</p>

        <textarea></textarea>

        <div class="post-footr">
            <div class="post-footr footr-main">
                <span class="votes">
                    <button class="vote-btn" type="button" onclick="addScore('${id}', -1)">&minus;</button>
                    <span class="score">${post["score"]}</span>
                    <button class="vote-btn" type="button" onclick="addScore('${id}', 1)">+</button>
                </span>
                
                <button class="small-btn reply" type="button" onclick="toggleChildren(this, '${id}')">${keys[key]["btnContent"]}</button>
            </div>

            <div class="post-footr footr-updt">
                ${footrUpdtBtns}
            </div>
            
            <div class="post-footr footr-more-box">
                <button class="small-btn more" type="button">
                    ${svgAssets["ellipsis"]}
                </button>

                <div class="post-footr footr-more">
                    ${footrMore}
                </div>
            </div>
        </div>`;

        getRelativeDate(post[`createdAt`], postElement);

        let thread = document.createElement(`div`);
        thread.setAttribute(`id`, `thrdln-for-${id}`);
        thread.classList.add(`thread`);
        let thrdln = document.createElement(`span`);
        thrdln.classList.add(`thrdln`);
        thread.appendChild(thrdln);
        postBox.appendChild(thread);
    }
    else if(key === `m`) {
        postElement.innerHTML = 
        `<span class="usrnme">${post["user"]}</span>
        <a href="#" class="avtr"><img src="${data["users"][post["user"]]["image"]["png"]}"></a>
        
        <p class="post-main">
            ${post["content"]}
        </p>
        <button class="small-btn light-btn info" type="button">
            ${svgAssets["info-button"]}
        </button>
        
        <span class="post-date time">
            <span class="time-rel-date"></span>
            <span class="time-time"></span>
            <span class="time-full"></span>
            <span class="time-full-full"></span>
        </span>`;

        getRelativeDate(post[`createdAt`], postElement);

    }
    else if(key === `k`) {
        let chatInfo = document.createElement(`div`);
        chatInfo.classList.add(`convo-info`);
        post[`users`].forEach(function(user){
            if(user === data[`currentUser`]) {
                return;
            }
            chatInfo.innerHTML += 
            `<a href="#" class="avtr"><img src="${data["users"][user]["image"]["png"]}"></a>
            <span class="usrnme">${user}</span>`
        });
        childrenSection.appendChild(chatInfo);
    }

    if(key === `m`) {
        autoScrollDown(postSection, false, postBox);
    }
    // console.log(`done reading ${id}`);
}

const readChildren = function(parentId, dataKey = `posts`) {
    let postsIds = data[dataKey][parentId][`childrenIds`];
    let postsIdsLength = postsIds.length;
    for (let i = 0; i < postsIdsLength; i++) {
        readPost(postsIds[i], dataKey);
    }
    let form = getElementById(parentId).querySelector(`:scope > .post.form.create`);
    if (typeof form === `undefined` || form === null) {
        createPostForm(parentId);
        return `fresh`;
    }
    return false;
}

const toggleChildren = function(btn, parentId, dataKey = `posts`) {
    let keys = {
        "x": ["Post", "posts"],
        "p": ["Comment", "comments"],
        "c": ["Reply", "replies"],
        "r": ["Reply", "replies"],
        "k": ["Message", "messages"],
        "m": ["Reply", "replies"],
        "x1": ["Convo", "convos"]
    } // issue with x1?
    let key = keys[parentId[0]];

    if(readChildren(parentId, dataKey) !== `fresh`) {
        // Form already exists before readChildren call
        let childrenSection = getElementById(parentId).querySelector(`.${key[1]}`);
        let form = getElementById(parentId).querySelector(`:scope > .post.form.create`);
        if(getComputedStyle(form).getPropertyValue(`display`) === `none`) {
            toggle(form, `flex`);
            toggle(childrenSection);
            btn.textContent = `Hide ${key[1]}`;
        } else {
            toggle(form, `none`);
            toggle(childrenSection, `none`);
            btn.textContent = key[0];
        }
    }
    else {
        btn.textContent = `Hide ${key[1]}`;
    }
}
window.toggleChildren = toggleChildren;

const updatePost = function(id) {
    let post = getElementById(id).querySelector(`.post.form`);
    let content = post.querySelector(`textarea`).value;

    data[`posts`][id][`content`] = content;
    data[`changed`] = true;
    // console.log(data);
    post.querySelector(`.post-main`).innerHTML = content;

    post.classList.remove(`form`, `updt`);
}
window.updatePost = updatePost;

const closeEditForm = function(id) {
    let currentForm = getElementById(id).querySelector(`.post.form.updt`);
    currentForm.classList.remove(`form`, `updt`);
}
window.closeEditForm = closeEditForm;

const createEditForm = function(id) {
    let post = getElementById(id).querySelector(`.post`);
    let postMain = post.querySelector(`.post-main`);
    let height = getComputedStyle(postMain).getPropertyValue("height");
    post.classList.add(`form`, `updt`);
    let content = postMain.innerHTML;

    let textarea = post.querySelector(`textarea`);
    // let textarea = document.createElement(`textarea`);
    // post.appendChild(textarea);
    textarea.style.height = height;
    textarea.focus();
    textarea.value = content;
}
window.createEditForm = createEditForm;

const toggleDelModal = function(id) {
    let modalBg = getElementById(`del-modal`);
    toggle(modalBg, `flex`);

    let modalDelBtn = modalBg.querySelector(`.big-btn.yes`);
    modalDelBtn.setAttribute(`onclick`, `deletePost('${id}')`);

}
window.toggleDelModal = toggleDelModal;

const deleteFamily = function(id,dataKey = `posts`) {
    for (let i = data[dataKey][id][`childrenIds`].length; i > 0; i--) {
        let childId = data[dataKey][id][`childrenIds`].pop();
        deleteFamily(childId, dataKey);
    }
    delete data[dataKey][id];
    // console.log(`deleted ${id}`);
}

const deletePost = function(id, dataKey = `posts`) {
    let parentId = data[dataKey][id][`parentId`];
    deleteFamily(id, dataKey);
    getElementById(id).remove();
    let childrenIds = data[dataKey][parentId][`childrenIds`];
    data[dataKey][parentId][`childrenIds`] = childrenIds.filter(item => item !== id);
    data[`changed`] = true;
    if(getElementById(`del-modal`) && dataKey === `posts`) {
        toggleDelModal();
    }
}
window.deletePost = deletePost;

const addScore = function(id, inc) {
    data[`posts`][id][`score`] += inc;
    data[`changed`] = true;
    let score = document.querySelector(`#${id} > .post span.score`);
    score.innerHTML = data[`posts`][id][`score`];
}
window.addScore = addScore;

if (typeof getElementById(`x0`) !== `undefined` && getElementById(`x0`) !== null) {
    getElementById(`x0`).addEventListener(`click`, function(e) {
        let btn = e.target.closest(`.big-btn`);
        if(btn) {
            let form = btn.closest(`.post.form`);
            if(form) {
                if(form.classList.contains(`create`)) {
                    createPost(btn);
                }
            }
            return;
        }
        btn = e.target.closest(`.small-btn`);
        if(btn) {
            if(btn.classList.contains(`more`)) {
                let more = btn.nextElementSibling; // assumes `.post-footr.footr-more`
                toggle(more, `flex`);
                actvFloatingBox.setElem(more);
        
            }
            return;
        }
    });
}

export {
    readPost,
    readChildren,
    createPost,
    deletePost
};























// console.log(JSON.stringify(data).length); // 2016 characters <- current chars used
// let currentSize = JSON.stringify(data).length*16/8/2**10; // 3.9375 kB <- current size used
// console.log(currentSize);
// console.log(currentSize/5*5*2**10); // 4032 posts <- expected max number of posts assuming 5 MB max


// window.addEventListener("beforeunload", function(e){

// });

// STRUCTURE OF DATA BLOCKS
// Global
// current user
// current counter id // something needs to be done with this counter
// posts ids


// Users
// user x
// user id
// image
// contacts
// other info
// convos ids


// Post id = x
// content
// date
// parent id
// score
// user
// children ids

// Convo id = x
// content = none
// date = none
// parent id
// score = none
// users = []
// children ids