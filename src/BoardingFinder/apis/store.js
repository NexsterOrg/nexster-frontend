const userDataKey = "user_data"
const token = "token"
const tokenType = "Bearer"
const role = "r"

export function SetObjInLocalStorage(key, data){
    localStorage.setItem(key, JSON.stringify(data))
}

export function SetAccessTokenInLS(data){
    localStorage.setItem(token, `${tokenType} ${data}` )
}

export function SetRoleInLS(){
    localStorage.setItem(role, "bdo") // role: bdOwner
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

export function GetRoleFromLS(){
    const res = localStorage.getItem(role)
    if(res === null) return ""
    return res
}

// Remove token and user data from local storage
export function CleanLS(){
    localStorage.removeItem(token)
    localStorage.removeItem(userDataKey)
    localStorage.removeItem(role)
}
