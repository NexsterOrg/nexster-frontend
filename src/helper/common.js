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
