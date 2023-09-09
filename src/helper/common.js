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
    if(username.length > uLenLimit){
        newUsername = username.substring(0, uLenLimit) + "..."
    }
    if(newFacField.length > fLenLimit){
        newFacField = newFacField.substring(0, fLenLimit) + "..."
    }
    return {
        "username": newUsername,
        "facOrField": newFacField
    }
}
