import getData from "./getData.js";

let data = getData;
console.log(data);

const updateLocalStorage = function() {
    console.log(`Local storage updated.`);
    localStorage.setItem(`data-social-media-app-by-mico-irvin`, JSON.stringify(data));
}
 
const clearLocalStorage = function() {
    localStorage.removeItem(`data-social-media-app-by-mico-irvin`);
    for (let k in data) delete data[k];
    data = null;
}

const currentValidDate = "August 28, 2022 17:02:00";

const validateData = function() {
    if(!data.hasOwnProperty(`valid`) || data[`valid`] !== currentValidDate) {
        clearLocalStorage();
        window.location = window.location.href+'?eraseCache=true';
    }
}
validateData();




export {
    data,
    updateLocalStorage,
    clearLocalStorage,
}