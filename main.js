let data = JSON.parse(localStorage.getItem(`data-intrctv-cmmnts-by-mico-irvin`));

const updateLocalStorage = function() {
   localStorage.setItem(`data-intrctv-cmmnts-by-mico-irvin`, JSON.stringify(data));
   console.log(`Local storage updated.`)
}

const createPost = function(btn) {
   let post = btn.parentElement;
   let textarea = post.querySelector(`textarea`);
   let content = textarea.value;
   textarea.value = ``;
   let parentId = post.parentElement.id;

   if (parentId[0] !== `p`) {
      post.remove(); // Comment form does not disappear. Reply form disappears.
   }

   if (content === `` || typeof content === `undefined` || content === null) {
      return;
   }

   let postId = `p`;
   if (post.classList.contains(`reply`)) {
      postId = `r`;
   }
   else if (post.classList.contains(`cmmnt`)) {
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

   if (parentId !== `p0`) {
      data[`posts`][parentId]["childrenIds"].push(postId);
   }

   console.log(data);
   updateLocalStorage();
   readPost(postId);
}

const createPostForm = function(id, type = `reply`) {
   let postBox = document.querySelector(`#${id}`);
   let form = document.createElement(`div`);
   postBox.appendChild(form);
   form.classList.add(`post`, `form`, `create`);
   let placeholder = `What's on your mind...`;
   let btnContent = `POST`;

   if (type === `cmmnt`) {
      form.classList.add(`cmmnt`);
      placeholder = `Add a comment...`;
      btnContent = `SEND`;
   }
   else if (type === `reply`) {
      let currentForm = document.querySelector(`.post.form.create.cmmnt.reply`);
      if (typeof currentForm !== `undefined` && currentForm !== null){
         currentForm.remove();
      }
      form.classList.add(`cmmnt`, `reply`);
      placeholder = `Send a reply...`;
      btnContent = `REPLY`;
   }

   let textarea = document.createElement(`textarea`);
   textarea.setAttribute(`placeholder`, placeholder);
   
   form.innerHTML =  
   `<a href="#" class="avtr"><img src="${data["users"][data["currentUser"]]["image"]["png"]}"></a>
   <button type="submit" name="send-reply" class="big-btn" onclick="createPost(this)">${btnContent}</button>`;
   
   form.appendChild(textarea);
   if(type === `reply`) textarea.focus();
}

const readPost = function(id) {
   let post = document.querySelector(`#${id}`);
   if (typeof post !== `undefined` && post !== null) {
      return; // The post was already read.
   }
   post = data[`posts`][id];
   let parentId = post[`parentId`];
   // console.log(
   //    `parentId = ${parentId}
   //    id = ${id}
   //    post = ${post["content"]}`
   // );

   let parentPost = document.querySelector(`#${parentId}`);
   if (typeof parentPost === `undefined` || parentPost === null) {
      // If the parent does not exist yet.
      readPost(parentId);
      parentPost = document.querySelector(`#${parentId}`);
      // Only works if the parent is a comment.
      // Still need to create a CSS class for a parent that is a post. 
      // Right now it is main#p0.
   }
   
   let sections = {
      "p": "posts",
      "c": "comments",
      "r": "replies"
   };
   let sectionKey = sections[id[0]];
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
   postSection.appendChild(postBox);
   
   let cssClass = ``;
   if (sectionKey === `comments`) cssClass = `cmmnt`;
   else if (sectionKey === `replies`) cssClass = `cmmnt reply`;

   let userRole = ``;
   let smallBtns = 
   `<button class="small-btn reply" type="button" onclick="createPostForm('${id}')"><i class="fa-solid fa-reply"></i>Reply</button>`;
   if (post[`user`] === data[`currentUser`]){
      userRole = `<a class="user-role">you</a>`;
      smallBtns = 
      `<button class="small-btn del" type="button" onclick="trigDelModal('${id}')"><i class="fa-solid fa-trash"></i>Delete</button>
      <button class="small-btn edit" type="button" onclick="createEditForm('${id}')"><i class="fa-solid fa-pen"></i>Edit</button>
      <button type="submit" class="small-btn cncl" onclick="closeEditForm()">Cancel</button>
      <button type="submit" class="big-btn" onclick="updatePost('${id}')">UPDATE</button>
      <textarea></textarea>`;
   }
   
   postBox.innerHTML =
   `<div class="post ${cssClass}">
   <a href="#" class="avtr"><img src="${data["users"][post["user"]]["image"]["png"]}"></a>
   <span class="usrnme-box">
      <a href="#" class="usrnme">${post["user"]}</a>
      ${userRole}
   </span>
   <a class="post-date">${post["createdAt"]}</a>

   <p class="post-main">${post["content"]}</p>
   
   <span class="votes">
      <button class="vote-btn" type="button" onclick="addScore('${id}', 1)">+</button>
      <span class="score">${post["score"]}</span>
      <button class="vote-btn" type="button" onclick="addScore('${id}', -1)">&minus;</button>
   </span>

   ${smallBtns}
   </div>
      `;   
}

const updatePost = function(id) {
   let post = document.querySelector(`#${id} > .post.form`);
   let content = post.querySelector(`textarea`).value;

   data[`posts`][id][`content`] = content;
   console.log(data);
   updateLocalStorage();
   post.querySelector(`.post-main`).innerHTML = content;

   closeEditForm();
}

const closeEditForm = function() {
   let currentForm = document.querySelector(`.post.form.updt`);
   if (typeof currentForm !== `undefined` && currentForm !== null){
      currentForm.classList.remove(`form`, `updt`);
   }

}

const createEditForm = function(id) {
   closeEditForm();
   let post = document.querySelector(`#${id}`).querySelector(`.post`);
   post.classList.add(`form`, `updt`);
   let content = post.querySelector(`.post-main`).innerHTML;

   let textarea = post.querySelector(`textarea`);
   textarea.value = content;
}

const trigDelModal = function(id) {
   let modalBg = document.querySelector(`#del-modal`);
   modalBg.style.display = `flex`;
   
   let modalDelBtn = modalBg.querySelector(`.big-btn.yes`);
   modalDelBtn.setAttribute(`onclick`, `deletePost('${id}')`);

}

const closeDelModal = function() {
   let modalBg = document.querySelector(`#del-modal`);
   modalBg.style.display = `none`;
}

const deleteFamily = function(id) {
   for(let i = data[`posts`][id][`childrenIds`].length; i > 0; i--) {
      let childId = data[`posts`][id][`childrenIds`].pop();
      deleteFamily(childId);
   }
   delete data[`posts`][id];
   console.log(`deleted ${id}`);
   console.log(data[`posts`]);
}

const deletePost = function(id) {
   let postBox = document.querySelector(`#${id}`);
   deleteFamily(id);
   postBox.remove();
   updateLocalStorage();
   closeDelModal();
}

const addScore = function(id, inc) {
   data[`posts`][id][`score`] += inc;
   updateLocalStorage();
   let score = document.querySelector(`#${id} > .post span.score`);
   score.innerHTML = data[`posts`][id][`score`];
}

const changeUser = function() {
   let newUser = document.querySelector(`#chng-user`).value;
   if (data[`currentUser`] !==  newUser) {
      data[`currentUser`] = newUser;
      updateLocalStorage();
      clearElement(`main`);
      programFlow();
      // console.log(newUser);
   }

}

const clearElement = function(e) {
   element = document.querySelector(e);
   while(element.firstChild && element.removeChild(element.firstChild));
}

const programFlow = function() {
   // console.log(`Nice flow.`);
   for(let id in data[`posts`]) {
      readPost(id);
   }

   let selectUser = document.querySelector(`#chng-user`);
   while(selectUser.firstChild && selectUser.removeChild(selectUser.firstChild));

   for(let user in data[`users`]) {
      let option = document.createElement(`option`);
      option.value = user;
      option.innerHTML = user;
      selectUser.appendChild(option);
      if(user === data[`currentUser`]) {
         option.setAttribute(`selected`, true);
      }
   }

   createPostForm("p0", "cmmnt");
}

const fetchData = function() {
   const initialize = function(fetchedData) {
      data = fetchedData;
      console.log(data);
      updateLocalStorage();
      programFlow();
   }

   fetch(`./data.json`)
   .then(response => {
      return response.json();
   })
   .then(fetchedData => {
      // For web-based access.
      console.log(`JSON file was fetched!`);
      initialize(fetchedData);

   })
   .catch(error => {
      // For local file-based access.
      console.log(`Data object was accessed locally.`)
      initialize(initData);
   });
}

const clearData = function() {
   localStorage.removeItem(`data-intrctv-cmmnts-by-mico-irvin`);
   for (let k in data) delete data[k];
   data = undefined;
   clearElement(`main`);
}

const refresh = function(){
   if (typeof data !== `undefined` && data !== null) {
      // Let's go!
      programFlow();
   }
   else {
      // Data does not exist in the localStorage.
      fetchData();
   }

}

refresh();
