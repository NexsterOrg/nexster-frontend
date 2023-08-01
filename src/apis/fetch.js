
const apiDomain = "http://192.168.1.101"

export async function fetchData(url) {
    try {
      const resp = await fetch(url);
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      return await resp.json();
    } catch (err) {
      console.error('Error fetching data:', err);
      return null;
    }
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
    if (resp.status != 201) {
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
