const engi = "Engineering"

export function GenUniqueKeyForList(index, otherKey){
    return `${index}#${otherKey}`
}

// This function will format username and faculty or field lenghts properly
export function FmtUserInfo(username, uLenLimit, faculty, field, fLenLimit) {
    let newUsername = username
    let newFacField = faculty
    if (newFacField === engi){
        newFacField = field
    }
    if(typeof(username) === "string" && username.length > uLenLimit){
        newUsername = username.substring(0, uLenLimit) + "..."
    }
    if(typeof(newFacField) === "string" && newFacField.length > fLenLimit){
        newFacField = newFacField.substring(0, fLenLimit) + "..."
    }
    return {
        "username": newUsername,
        "facOrField": newFacField
    }
}

export function ToPxStr(val){
    return `${val}px`
}

export function PxFactorTotalHeight(factor){
    return `${window.innerHeight * factor}px`
}

// set the string data length to given length
export function LimitStringDataLn(data="", limitedLn=0){
    return typeof(data) === 'string' && data.length > limitedLn ? 
        data.substring(0, limitedLn-2) + ".." : data
}

export function Delay(timeInMs) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeInMs);
    });
}

export function ValidateUniIndex(str) {
    const pattern = /^\d{6}[a-zA-Z]$/;
  
    return pattern.test(str);
}

export function GetImageType(mimeType){
    if(typeof mimeType !== "string") return ""
    const parts = mimeType.split('/');
    return parts.length !== 2  ? "" : parts[1]
}

// <6 digits><alphabeticalCharacter>@uom.lk
export function IsValidEmailV1(email) {
    var regex = /^[0-9]{6}[a-zA-Z]@uom\.lk$/;

    return regex.test(email);
}

// <name>.<batch>@uom.lk
export function IsValidEmailV2(email) {
    var regex = /^[a-zA-Z]+(\.[0-9]{2})?@uom\.lk$/;

    return regex.test(email);
}
