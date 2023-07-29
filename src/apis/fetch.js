
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

export function MkReactionUpdateUrl(mediaId, reactionId, reactorId){
  return `${apiDomain}/reactions?media_id=${mediaId}&reactor_id=${reactorId}&reaction_id=${reactionId}`
}

// http://192.168.1.101/reactions?media_id=527634&reactor_id=482204&reaction_id=554745