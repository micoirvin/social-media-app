import {
    readChildren,
    createPost,
    addScore
} from "./posts.js";

import {
    data,
    updateLocalStorage,
    clearLocalStorage
} from "./dataOperations.js";

window.readChildren = readChildren;
window.createPost = createPost;
window.addScore = addScore;

window.addEventListener("beforeunload", updateLocalStorage);


const programFlow = function() {
    if(data[`currentUser`] === null) {
        window.location.href = `./login.html`;
    } else {
        readChildren(`x0`);
    }
}
programFlow();



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