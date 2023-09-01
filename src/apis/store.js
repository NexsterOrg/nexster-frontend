const userDataKey = "user_data"

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
