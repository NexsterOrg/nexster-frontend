const hrLimit = 60
const dayLimit = 1440
const weekLimit = 10080
const monthLimit = 40320
const yearLimit = 525600

const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function TimeDiffWithNow(timeIsoStr){
    let givenDate = new Date(timeIsoStr);
    let currentDate = new Date();

    let timeDiffMin = Math.floor((currentDate - givenDate)/60000);

    if(timeDiffMin >= yearLimit) {
        return `${Math.floor(timeDiffMin/yearLimit)}yr`
    }

    if(timeDiffMin >= monthLimit) {
        return `${Math.floor(timeDiffMin/monthLimit)}mon`
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

// input: UTC+0 time and results will convert to correct wrt location
export function GetMonthDate(utcDateString) {
    const date = new Date(utcDateString);
    
    if (!isNaN(date) && date.getDate() > 0 &&  !isNaN(date.getDay())) {
      return { 
        month: monthNames[date.getMonth()], 
        day: date.getDate().toString().padStart(2, '0'),
        week: dayNames[date.getDay()]
    };
    }
    return {
        month: "",
        day: "",
        week: ""
    };

}

// input: UTC+0 time and results will convert to correct time wrt location
export function GetTimeInAmPm(utcDateString) {
    const date = new Date(utcDateString);
    if (
      !isNaN(date) &&
      !isNaN(date.getHours()) &&
      !isNaN(date.getMinutes())
    ) {
      const hours = date.getHours() % 12 || 12;
      const ampm = date.getHours() >= 12 ? "pm" : "am";
      return hours.toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0') + ampm;
    } 
    return ""; 
}

// input: UTC+0 time and results will convert to correct time wrt location
function GetWeekDate(utcDateString){
    const date = new Date(utcDateString);
    if (!isNaN(date) && !isNaN(date.getDay())){
        return dayNames[date.getDay()]
    }
    return ""
}

export function AddMonths(date, months) {
    const newDate = new Date(date.getTime());
    newDate.setMonth(date.getMonth() + months);
    return newDate;
}
