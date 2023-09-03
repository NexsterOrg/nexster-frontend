const userDataKey = "user_data"
const token = "token"

export function setObjInLocalStorage(key, data){
    localStorage.setItem(key, JSON.stringify(data))
}

export function getObjFromLocalStorage(key){
    try {
        return JSON.parse(localStorage.getItem(key))
    } catch (err) {
        return null
    }    
}

export function GetUserInfoFromLS(){
    const res = getObjFromLocalStorage(userDataKey)
    if(res === null) return {}
    return res
}

// Remove token and user data from local storage
export function CleanLS(){
    localStorage.removeItem(token)
    localStorage.removeItem(userDataKey)
}
