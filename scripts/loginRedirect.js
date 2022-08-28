import {
  data
} from "./dataOperations.js";

import {
  getElementById
} from "./elementsOperations.js";

let location = window.location.toString();
let x = location.indexOf(`.html`);

if(data[`currentUser`] === null) {
  if(location.slice(x-5, x) !== `login`) {
    window.location.href = `./login.html`;
  }
} else {
  if(location.slice(x-5, x) === `login`) {
    getElementById(`login-box`).innerHTML = `<p>Cannot access login. Go to <a href="./">home</a>.</p>`;
  }
}