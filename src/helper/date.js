const hrLimit = 60
const dayLimit = 1440
const weekLimit = 10080
const monthLimit = 40320

export function TimeDiffWithNow(timeIsoStr){
    let givenDate = new Date(timeIsoStr);
    let currentDate = new Date();

    let timeDiffMin = Math.floor((currentDate - givenDate)/60000);

    if(timeDiffMin >= monthLimit) {
        return `${Math.floor(timeDiffMin/monthLimit)}m`
    }

    if(timeDiffMin >= weekLimit) {
        return `${Math.floor(timeDiffMin/weekLimit)}w`
    }

    if(timeDiffMin >= dayLimit) {
        return `${Math.floor(timeDiffMin/dayLimit)}d`
    }

    if(timeDiffMin >= hrLimit) {
        return `${Math.floor(timeDiffMin/hrLimit)}h`
    }

    if(timeDiffMin < 1) {
        return "now"
    }
    return `${timeDiffMin}min`
}