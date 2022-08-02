import {
    data
} from "./dataOperations.js";

import {
    getElementById
} from "./elementsOperations.js";

import {
    svgAssets
} from "./svgAssets.js"

const createPost = function(btn) {
    let post = btn.closest(`.post`);
    let textarea = post.querySelector(`textarea`);
    let content = textarea.value;
    textarea.value = ``;
    let parentId = post.parentElement.id;

    if (parentId[0] !== `x`) {
        post.remove();
    }

    if (content === `` || typeof content === `undefined` || content === null) {
        return;
    }

    let postId = `p`;
    if (post.classList.contains(`reply`)) {
        postId = `r`;
    } else if (post.classList.contains(`cmmnt`)) {
        postId = `c`;
    }

    data[`globalCurrentId`] += 1;
    postId += data[`globalCurrentId`];

    data[`posts`][postId] = {
        "parentId": parentId,
        "content": content,
        "createdAt": "Just now",
        "score": 0,
        "user": data["currentUser"],
        "childrenIds": []
    };

    data[`posts`][parentId]["childrenIds"].push(postId);

    console.log(data);
    readPost(postId);
}

const createPostForm = function(id) {
    let allKeys = {
        "x": {
            "btnContent": "POST",
            "placeholder": "What's happening",
            "extraClasses": []
        },
        "p": {
            "btnContent": "COMMENT",
            "placeholder": "Send a comment",
            "extraClasses": [`cmmnt`]
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
        }
    }

    let keys = allKeys[id[0]];
    let postBox = getElementById(id);
    let form = document.createElement(`div`);
    postBox.appendChild(form);
    form.classList.add(`post`, `form`, `create`);

    // if(!mediumMq.matches) {
    //    let currentForm = document.querySelector(`.post.form.create.cmmnt`);
    //    if (typeof currentForm !== `undefined` && currentForm !== null){
    //       currentForm.remove();
    //    }
    // }

    for (let i = 0; i < keys[`extraClasses`].length; i++) {
        form.classList.add(keys[`extraClasses`][i]);
    }

    let btnContent = ``;
    if (keys[`btnContent`] === `POST`) {
        btnContent = `POST`;
    } else {
        btnContent =
            `<span class="btn-text">${keys[`btnContent`]}</span> ${svgAssets["paper-plane"]}`;
    }
    let formContent =
        `<a href="#" class="avtr"><img src="${data["users"][data["currentUser"]]["image"]["png"]}"></a>
        <button type="submit" name="send-reply" class="big-btn" onclick="createPost(this)">
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

const readPost = function(id) {
    let post = getElementById(id);
    if (typeof post !== `undefined` && post !== null) {
        return; // The post was already read.
    }
    post = data[`posts`][id];
    let parentId = post[`parentId`];

    let parentPost = getElementById(parentId);
    if (typeof parentPost === `undefined` || parentPost === null) {
        // If the parent does not exist yet.
        readPost(parentId);
        parentPost = getElementById(parentId);
        // Only works if the parent is a comment.
        // Still need to create a CSS class for a parent that is a post. 
        // Right now it is main#p0.
    }

    let keys = {
        "p": ["posts", "Comment", ""],
        "c": ["comments", "Reply", "cmmnt"],
        "r": ["replies", "Reply", "cmmnt reply"]
    };

    let key = id[0];
    let sectionKey = keys[key][0];
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
    postSection.prepend(postBox);

    let cssClass = keys[key][2];

    let userRole = ``;
    let smallBtns =
        `<button class="small-btn reply" type="button" onclick="readChildren('${id}')">${keys[key][1]}</button>`;
    if (post[`user`] === data[`currentUser`]) {
        userRole = `<a class="user-role">you</a>`;
        // smallBtns = 
        // `<button class="small-btn del" type="button" onclick="trigDelModal('${id}')"><i class="fa-solid fa-trash"></i>Delete</button>
        // <button class="small-btn edit" type="button" onclick="createEditForm('${id}')"><i class="fa-solid fa-pen"></i>Edit</button>
        // <button type="submit" class="small-btn cncl" onclick="closeEditForm()">Cancel</button>
        // <button type="submit" class="big-btn" onclick="updatePost('${id}')">UPDATE</button>
        // <textarea></textarea>`;
    }

    postBox.innerHTML =
        `<div class="post ${cssClass}">
      <div class="post-headr">
         <a href="#" class="avtr"><img src="${data["users"][post["user"]]["image"]["png"]}"></a>
         <span class="usrnme-box">
            <a href="#" class="usrnme">${post["user"]}</a>
            ${userRole}
         </span>
         <a class="post-date">${post["createdAt"]}</a>
      </div>

      <p class="post-main">${post["content"]}</p>
      
      <div class="post-footr">
         <span class="votes">
            <button class="vote-btn" type="button" onclick="addScore('${id}', -1)">&minus;</button>
            <span class="score">${post["score"]}</span>
            <button class="vote-btn" type="button" onclick="addScore('${id}', 1)">+</button>
         </span>

         ${smallBtns}
         <button class="small-btn more" type="button">More</button>
      </div>
   </div>
   
   <div id="thrdln-for-${id}" class="thread">
      <span class="thrdln"></span>
   </div>`;
}

const updatePost = function(id) {
    let post = getElementById(id).querySelector(`.post.form`);
    let content = post.querySelector(`textarea`).value;

    data[`posts`][id][`content`] = content;
    console.log(data);
    post.querySelector(`.post-main`).innerHTML = content;

    closeEditForm();
}

const closeEditForm = function() {
    let currentForm = document.querySelector(`.post.form.updt`);
    if (typeof currentForm !== `undefined` && currentForm !== null) {
        currentForm.classList.remove(`form`, `updt`);
    }

}

const createEditForm = function(id) {
    closeEditForm();
    let post = getElementById(id).querySelector(`.post`);
    post.classList.add(`form`, `updt`);
    let content = post.querySelector(`.post-main`).innerHTML;

    let textarea = post.querySelector(`textarea`);
    textarea.value = content;
}

const trigDelModal = function(id) {
    let modalBg = getElementById(`del-modal`);
    modalBg.style.display = `flex`;

    let modalDelBtn = modalBg.querySelector(`.big-btn.yes`);
    modalDelBtn.setAttribute(`onclick`, `deletePost('${id}')`);

}

const closeDelModal = function() {
    let modalBg = getElementById(`del-modal`);
    modalBg.style.display = `none`;
}

const deleteFamily = function(id) {
    for (let i = data[`posts`][id][`childrenIds`].length; i > 0; i--) {
        let childId = data[`posts`][id][`childrenIds`].pop();
        deleteFamily(childId);
    }
    delete data[`posts`][id];
    console.log(`deleted ${id}`);
    console.log(data[`posts`]);
}

const deletePost = function(id) {
    let postBox = getElementById(id);
    deleteFamily(id);
    postBox.remove();
    closeDelModal();
}

const addScore = function(id, inc) {
    data[`posts`][id][`score`] += inc;
    let score = document.querySelector(`#${id} > .post span.score`);
    score.innerHTML = data[`posts`][id][`score`];
}

const readChildren = function(parentId) {
    let postsIds = data[`posts`][parentId][`childrenIds`];
    let postsIdsLength = postsIds.length;
    for (let i = 0; i < postsIdsLength; i++) {
        readPost(postsIds[i]);
    }
    let form = getElementById(parentId).querySelector(`:scope > .post.form.create`);
    if (typeof form === `undefined` || form === null) {
        createPostForm(parentId);
    }

}

export {
    readChildren, 
    createPost, 
    addScore
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