
const apiDomain = "http://192.168.1.101"
const token = "token"

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
    throw new UnAuthorizedError("token is not existed")
  }
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': bearTkn
    }
  });
  if(resp.status === unAuthCode) {
    localStorage.removeItem(token)
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
    localStorage.removeItem(token)
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
    localStorage.removeItem(token)
    throw new UnAuthorizedError("Attempted to access unauthorized resources")
  }
  if (!resp.ok && resp.status !== 201) {
    return null
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
  if(countObj === null) return 0
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
  let respBody = await get(`http://localhost:8000/usrmgmt/friend_req?page=${page}&page_size=${pageSize}`)
  if(respBody === null) return {data: [], size: 0}
  return {
    data: respBody.data,
    size: respBody.results_count
  }
}

export async function GetAllFriendReqsCount(){
  let respBody = await get("http://localhost:8000/usrmgmt/friend_req/count")
  if(respBody === null) return 0
  return respBody.data.count
}
