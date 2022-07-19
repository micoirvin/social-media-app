let zIndexStack = 0;

const toggle = function(element, state="") {
    let elementState = getComputedStyle(element).getPropertyValue("display");
    let newElementState = "";

    if (elementState != "none") {
        newElementState = "none";
    }
    else if (state == "") {
        newElementState = "block";
        zIndexStack += 1;
    }
    else {
        newElementState = state;
        zIndexStack += 1;
    }
    element.style.display = newElementState;
    element.style.zIndex = zIndexStack;
    console.log(zIndexStack);
    return newElementState;
}

const mediumMq = window.matchMedia(`(min-width: 39rem) and (min-height: 25rem)`);

const header = document.querySelector(`header`);
const buttons = header.querySelectorAll(`button, input`);
let actvBtn = null;

const headerToggle = function(btn, state=``) {
    let target = btn.id.slice(10);
    let targetKeys = target.split(`-`);
    let newState = `none`;

    if(mediumMq.matches && targetKeys[1] === `f`) {
        if (btn.tagName === `INPUT` && btn === actvBtn && state !==`none`) return;   
        newState = toggle(document.querySelector(`#${targetKeys[0]}`), state);
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
    btn.addEventListener(`click`, function() {
        if(actvBtn !== null && btn !== actvBtn && actvBtn.id !== `headr-btn-messages-f`) {
            headerToggle(actvBtn, `none`);
        }
        headerToggle(btn);
    });
});
