import { CleanLS } from "./store"

const apiDomain = "http://20.204.87.193"
const token = "token"

// Paths
export const LoginPath = "/login"
export const FriendsRoute = "/friends"
export const FriendsRequestRoute = "/friends/request"
export const FriendSuggsRoute = "/friends/suggs"
export const AllFriendsRoute = "/friends/my"


// Status codes
const unAuthCode = 401

export class UnAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnAuthorizedError";
  }
}

// GET request with Authorization Header
async function get(url) {
  let bearTkn = localStorage.getItem(token)
  if(bearTkn === null) {
    CleanLS()
    throw new UnAuthorizedError("token is not existed")
  }
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': bearTkn
    }
  });
  if(resp.status === unAuthCode) {
    CleanLS()
    throw new UnAuthorizedError("Attempted to access unauthorized resources")
  }
  if (!resp.ok) {
    return null
  }
  return await resp.json();
}

// PUT request with Authorization Header
async function put(url, reqBody) {
  let bearTkn = localStorage.getItem(token)
  if(bearTkn === null) {
    CleanLS()
    throw new UnAuthorizedError("token is not existed")
  }
  const resp = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': bearTkn,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody)
  });

  if(resp.status === unAuthCode) {
    CleanLS()
    throw new UnAuthorizedError("Attempted to access unauthorized resources")
  }
  if (!resp.ok && resp.status !== 201) {
    return null
  }
  return await resp.json();
}

// POST request with Authorization Header
async function post(url, reqBody) {
  let bearTkn = localStorage.getItem(token)
  if(bearTkn === null) {
    CleanLS()
    throw new UnAuthorizedError("token is not existed")
  }
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': bearTkn,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody)
  });

  if(resp.status === unAuthCode) {
    CleanLS()
    throw new UnAuthorizedError("Attempted to access unauthorized resources")
  }
  if (!resp.ok && resp.status !== 201) {
    return null
  }
  return await resp.json();
}

async function del(url){
  let bearTkn = localStorage.getItem(token)
  if(bearTkn === null) {
    CleanLS()
    throw new UnAuthorizedError("token is not existed")
  }
  let resp = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': bearTkn,
      }
  });

  if(resp.status === unAuthCode) {
    CleanLS()
    throw new UnAuthorizedError("Attempted to access unauthorized resources")
  }

  if (!resp.ok) {
    return null;
  }
  return await resp.json();
}

export async function ListRecentPosts(userId, sinceDate, postCount){
  let posts = await get(`${apiDomain}/recent_posts/${userId}?last_post_at=${sinceDate}&max_post_count=${postCount}`)
  if(posts === null) return []
  return posts
}

export async function UpdateReactions(mediaKey, reactionKey, viewerKey, reqBody){
  await put(`${apiDomain}/reactions/${reactionKey}?media_id=${mediaKey}&reactor_id=${viewerKey}`, reqBody)
}

export async function CreateReaction(mediaKey, viewerKey, reqBody){
  const res = await post(`${apiDomain}/reactions?media_id=${mediaKey}&reactor_id=${viewerKey}`, reqBody)
  if(res === null) return ""
  return res.data.key
}

export async function ListFriendsForPool(faculty, gender, birthday, page, pageSize) {
  let respBody = await get(`${apiDomain}/t/friend_sugs/v2/${faculty}?page=${page}&page_size=${pageSize}&gender=${gender}&birthday=${birthday}`)
  if(respBody === null) return {data: [], resultsCount: 0}
  return { data: respBody.data, resultsCount: respBody.results_count}
}

export async function ListFriendSuggs(page, pageSize){
  let respBody = await get(`${apiDomain}/friend_sugs?page=${page}&page_size=${pageSize}`)
  if(respBody === null) return {data: [], resultsCount: 0}
  return { data: respBody.data, resultsCount: respBody.results_count}
}

export async function GetProfileInfo(userId){
  let info = await get(`${apiDomain}/u/users/${userId}`)
  if(info === null) return {}
  return info.data
}

export async function GetFriendCount(userId){
  let countObj = await get(`${apiDomain}/u/friends/${userId}/count`)
  if(countObj === null) return -1  // to indicate an error
  return countObj.data.count
}

///u/indexnos/:index_no
export async function GetUserKeyByIndexNo(indexNo) {
  let respBody = await get(`${apiDomain}/u/indexnos/${indexNo}`)
  if(respBody === null) return ""
  return respBody.data.key
}

export async function ListMediaRoleBased(imgOwnerId, page, pageSize){
  let respBody = await get(`${apiDomain}/t/r/media/${imgOwnerId}?page=${page}&page_size=${pageSize}`)
  if(respBody === null) return []
  return respBody.data
}

export async function ListFriendReqs(page, pageSize){
  let respBody = await get(`${apiDomain}/u/friend_req?page=${page}&page_size=${pageSize}`)
  if(respBody === null) return {data: [], size: 0}
  return {
    data: respBody.data,
    size: respBody.results_count
  }
}

export async function GetAllFriendReqsCount(){
  let respBody = await get(`${apiDomain}/u/friend_req/count`)
  if(respBody === null) return 0
  return respBody.data.count
}

export async function AcceptFriendReq(friendReqId, data){
  let respBody = await post(`${apiDomain}/u/friend_req/${friendReqId}`, data)
  if(respBody === null) return false 
  return true
}

export async function IgnoreFriendReq(friendReqId, otherId){
  let respBody = await del(`${apiDomain}/u/friend_req/${friendReqId}/ignore?other_id=${otherId}`)
  if(respBody === null) return false 
  return true
}

export async function SendFriendReq(data){
  let respBody = await post(`${apiDomain}/p/u/friend_req`, data)
  if(respBody === null) return ""
  return respBody.data.friend_req_id
}

export async function RemoveFriendship(otherFriendId){
  let respBody = await del(`${apiDomain}/d/u/friend/${otherFriendId}`)
  if(respBody === null) return false
  if(respBody.data.id1 === "") return false
  return true
}

export async function ListMyFriends(pageNo, pageSize) {
  let respBody = await get(`${apiDomain}/g/u/all/friends?page=${pageNo}&page_size=${pageSize}`)
  if(respBody === null) return {data: [], size: 0, total: 0}
  return { 
    data: respBody.data,
    size: respBody.results_count,
    total: respBody.total_count
  }
}
