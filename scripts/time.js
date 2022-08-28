const minute = 60000;
const hour = 60*minute;
const day = 24*hour;
const week = 7*day;

const getRelativeDate = function(ms, elem = null) {
    let refDate;
    try {
        refDate = new Date(ms);
    }
    catch {
        if(elem) {
            elem.querySelector(`.time-rel-date`).textContent = ms;
        }
        return;
    }

    if(ms === null) {
        return;
    }

    if(typeof ms !== `number`) {
        ms = refDate.getTime();
    }

    let timeTime = null;
    if(elem) {
        timeTime = elem.querySelector(`.time-time`);
        let timeTimeMs = Number(timeTime.textContent);
        if(ms < timeTimeMs) {
            // timeTimeMs saves the most recent call (greater number).
            // If the refDate from ms is an early date, it is not valid anymore.
            return;
        }
    }


    let today = new Date();
    let todayMs = today.getTime();

    // console.log(refDate);
    // console.log(today);
    let diff = todayMs - ms;
    let waitTime = 0;
    let message = ``; 

    if(diff < 10000) {
        // today = new Date();
        // todayMs = today.getTime();
        // diff = todayMs - ms;
        waitTime = 10000 - diff;
        message = `now`;
    }
    else if(diff < minute) {
        // Update every 10s
        waitTime = 10000 - diff%10000;
        let secs = 10*Math.floor(diff/10000);
        message = `${secs}s`;
    }
    else if(diff < hour) {
        // Update every minute
        waitTime = minute - diff%minute;
        let mins = Math.floor(diff/minute);
        message = `${mins}m`;
    }
    else if(diff < day) {
        // Update every hour
        waitTime = hour - diff%hour;
        let hrs = Math.floor(diff/hour);
        message = `${hrs}h`;
    }
    else if(diff < week) {
        // Update every day
        waitTime = day - diff%day;
        let days = Math.floor(diff/day);
        message = `${days}d`;
    }
    else if(diff < 28*day) {
        // Update every week
        waitTime = week - diff%week;
        let wks = Math.floor(diff/week);
        message = `${wks}w`;
    }
    else if(diff < 365*day) {
        // Update every month
        let nextMonth = new Date(ms); // ref date
        let nextMonthMonth = today.getMonth();
        nextMonth.setMonth(nextMonthMonth);
        nextMonth.setFullYear(today.getFullYear());
        waitTime = nextMonth - today;
        
        if(waitTime <= 0) {
            nextMonthMonth += 1;
            nextMonth.setMonth(nextMonthMonth);
            waitTime = nextMonth - today;
        }
        
        let mos = nextMonthMonth - refDate.getMonth() - 1;
        // The variable nextMonthMonth prevents mistakes for certain months like Sep 31 = Oct 1.

        if(mos < 0) {
            mos += 12;
        }
        
        if(mos === 0) {
            message = `4w`;
        } else {
            message = `${mos}mo`;
        }

    }
    else {
        // Update every year
        let nextYear = new Date(ms); // ref date
        nextYear.setFullYear(today.getFullYear());
        waitTime = nextYear - today;
        if(waitTime <= 0) {
            nextYear.setFullYear(today.getFullYear() + 1);
            waitTime = nextYear - today;
        }
        let yrs = nextYear.getFullYear() - refDate.getFullYear() - 1;

        if(yrs === 0) {
            message = `11mo`;
        } else {
            message = `${yrs}y`;
        }
    }
    // console.log(diff);
    // console.log(message);
    // console.log(waitTime);
    if(elem) {
        let timeFull = ``;
        if(refDate.getFullYear() !== today.getFullYear()) {
            timeFull = refDate.toLocaleString([], {year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric"});
        }
        else if(refDate.toLocaleDateString() !== today.toLocaleDateString()) {
            timeFull = refDate.toLocaleString([], {month: "short", day: "numeric", hour: "numeric", minute: "numeric"});
        }
        else {
            timeFull = refDate.toLocaleTimeString([], {timeStyle: "short"});
        }

        elem.querySelector(`.time-rel-date`).textContent = message;
        elem.querySelector(`.time-full`).textContent = timeFull;
        elem.querySelector(`.time-full-full`).textContent = refDate.toString();
        timeTime.textContent = ms;
    }
    else {
        return;
    }
    
    if(waitTime > week) {
        waitTime = week;
    }

    if(waitTime > 0) {
        setTimeout(function() {
            getRelativeDate(ms, elem);
        }, waitTime);
    }

    // return message;
}

export {
    getRelativeDate
}