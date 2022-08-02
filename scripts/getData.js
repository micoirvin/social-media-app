import { initData } from "./initData.js";

const getData = new Promise((resolve) => {
    let data = JSON.parse(localStorage.getItem(`data-social-media-app-by-mico-irvin`));
    if(typeof data !== `undefined` && data !== null) {
        resolve(data);
    } else {
        resolve(
            new Promise((fetchResolve) => { 
                fetch(`./data.json`)
                .then(response => {
                    return response.json();
                })
                .then(fetchedData => {
                    // For web-based access.
                    console.log(`JSON file was fetched!`);
                    localStorage.setItem(`data-social-media-app-by-mico-irvin`, JSON.stringify(fetchedData));
                    fetchResolve(fetchedData);
                })
                .catch(error => {
                    // For local file-based access.
                    console.log(`Data object was accessed locally.`);
                    localStorage.setItem(`data-social-media-app-by-mico-irvin`, JSON.stringify(initData));
                    fetchResolve(initData);
                });
            })
        );
    }
});

export default await getData;