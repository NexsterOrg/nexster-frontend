import React, {useState, useEffect} from "react"
import {List, ListItem, Typography} from '@mui/material'

import TimelinePost from  "./post"
import { fetchData } from "../apis/fetch"

/** 
 * gap between two post - 700
 * fetch n posts. (n-odd)
 * Gap between two fetch = (n//2)*700
*/
const postCnt = 3

const gap = Math.floor(postCnt/2)*700  // To fetch 5 posts. gap should be (5//2)*700
let limit = gap

export default function ListTimelinePosts({userId}){
    const [postsInfo, addPostsInfo] = useState({preLn: 0, data: []})

    useEffect(() => {
        window.scrollTo(0, 0);

        (async () => {
            try {
              let data = await fetchData(mkPostsFetchUrl(userId, new Date().toISOString(), postCnt));
              if (data == null) {
                return;
              }
              addPostsInfo({preLn: data.length, data: data});
            } catch (err) {
              console.error('Error fetching posts:', err);
            }
        })();
    }, [])

    useEffect(() => {      
        const handleScroll = async () => {
            if (window.scrollY > limit) {
                limit += gap
                if(postsInfo.preLn == 0) {
                    // All posts have been read
                    return
                }
                try {
                    let lastObj = postsInfo.data[postsInfo.data.length - 1];
                    if (lastObj == null) {
                        return;
                    }
                    let lastDate = lastObj.media.created_date;
                    let murl = mkPostsFetchUrl(userId, lastDate, postCnt);
                    let fetchedPosts = await fetchData(murl);
                    
                    if (fetchedPosts) {
                        addPostsInfo(prevPosts => {
                            return {
                                preLn: fetchedPosts.length,
                                data: prevPosts.data.concat(fetchedPosts)
                            }
                        });
                    }
                } catch (err) {
                    console.error('Unhandled error:', err);
                }
            }
        };
      
        window.addEventListener('scroll', handleScroll)
      
        // do the cleanup
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, [postsInfo]);
      
    if(postsInfo == undefined) {return <Typography> Error Occuried</Typography>}
    return (
        <List>
        {
            postsInfo.data.map((each) => {
                return(
                <ListItem sx={{ marginY: "5px"}} key={each.media._key}>
                    <TimelinePost postInfo={ {imgUrl: each.media.link, caption: each.media.title, description: each.media.description}} 
                    profInfo={{name: each.owner.name, postDate: each.media.created_date, profUrl: each.owner.image_url }}/>
                </ListItem>
                )
            })
        }
        </List>
    )
}

function mkPostsFetchUrl(userId, sinceDate, postCount){
    return `http://localhost:8000/timeline/recent_posts/${userId}?last_post_at=${sinceDate}&max_post_count=${postCount}`
}
