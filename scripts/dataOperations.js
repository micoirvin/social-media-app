import getData from "./getData.js";

let data = getData;
console.log(data);

const updateLocalStorage = function() {
    console.log(`Local storage updated.`);
    localStorage.setItem(`data-social-media-app-by-mico-irvin`, JSON.stringify(data));
}
 
const clearLocalStorage = function() {
    localStorage.removeItem(`data-intrctv-cmmnts-by-mico-irvin`);
    for (let k in data) delete data[k];
    data = null;
}

export {
    data,
    updateLocalStorage,
    clearLocalStorage,
}