import { 
    getElementById,
    toggle
} from "./elementsOperations.js";


const mediumMq = window.matchMedia(`(min-width: 39rem) and (min-height: 400px)`);
const header = document.querySelector(`header`);
const buttons = header.querySelectorAll(`button, input`);
let actvBtn = null;

const headerToggle = function(btn, state=``) {
    let target = btn.id.slice(10);
    let targetKeys = target.split(`-`);
    let newState = `none`;

    if(mediumMq.matches && targetKeys[1] === `f`) {
        if (btn.tagName === `INPUT` && btn === actvBtn && state !==`none`) return;
        if (targetKeys[0] === `messages`) state = `grid`;   
        newState = toggle(getElementById(targetKeys[0]), state);
    }
    else {
        if (targetKeys[1] === `x`) return; // nothing to do yet.
        window.location.href = `./${targetKeys[0]}.html`;
    }
    if(newState === `none`) {
        btn.style.outline = `none`;
        actvBtn = null;
    }
    else {
        btn.style.outline = `1px solid #5457b6`;
        actvBtn = btn;
        console.log(actvBtn);
    }
}

buttons.forEach(function(btn) {
    if (btn.id.slice(0, 9) === `headr-btn`) {
        btn.addEventListener(`click`, function() {
            if(actvBtn !== null && btn !== actvBtn && actvBtn.id !== `headr-btn-messages-f`) {
                headerToggle(actvBtn, `none`);
            }
            headerToggle(btn);
        });
    }
});

export { headerToggle };