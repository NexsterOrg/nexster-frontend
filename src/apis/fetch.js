
const apiDomain = "http://192.168.1.101"

// Status codes
const unAuthCode = 401

export class UnAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnAuthorizedError";
  }
}

// TODO: 
// Do we need try-catch blocks in each places. Check whether having
// try-catch block in one place is enough or not.
export async function fetchData(url) {
  let bearTkn = localStorage.getItem("token")
  if(bearTkn === null) return
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': bearTkn
    }
  });
  if(resp.status === unAuthCode) {
    throw new UnAuthorizedError("Attempted to access unauthorized resources")
  }
  if (!resp.ok) {
    return null
  }
  return await resp.json();
}

// URL to fetch recent posts for timeline
export function MkPostsFetchUrl(userId, sinceDate, postCount){
    return `${apiDomain}/recent_posts/${userId}?last_post_at=${sinceDate}&max_post_count=${postCount}`
}

function MkReactionUpdateUrl(mediaId, reactionId, reactorId){
  return `${apiDomain}/reactions/${reactionId}?media_id=${mediaId}&reactor_id=${reactorId}`
}

function MkReactionCreateUrl(mediaKey, reactorKey){
  return `${apiDomain}/reactions?media_id=${mediaKey}&reactor_id=${reactorKey}`
}

export async function UpdateReactions(mediaKey, reactionKey, viewerKey, reqBody){
  try {
    let resp = await fetch(MkReactionUpdateUrl(mediaKey, reactionKey, viewerKey), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody)
    });

    if (!resp.ok) {
      throw new Error('Failed to update the reaction state');
    }

   // const respData = await resp.json();
  } catch (err) {
      // Handle errors
    console.error('Failed to perform PUT request:', err);
  }
}

export async function CreateReaction(mediaKey, viewerKey, reqBody){
  try {
    let resp = await fetch(MkReactionCreateUrl(mediaKey, viewerKey), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody)
    });
    // if failed to create resource
    if (resp.status !== 201) {  // TODO: for 200 should not return an error.
      throw new Error('Failed to update the reaction state');
    }
    let respData = await resp.json();
    return respData.data.key
  } catch (err) {
      // Handle errors
    console.error('Failed to perform PUT request:', err);
  }
  return ""
}

export function MkFriendSuggUrl(userKey, startAt, noOfSuggs){
  return `${apiDomain}/friend_sugs?userid=${userKey}&started_at=${startAt}&max_sugs=${noOfSuggs}`
}
