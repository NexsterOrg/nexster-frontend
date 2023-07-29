import React, {useState, useEffect} from "react"
import {List, ListItem, Typography} from '@mui/material'

import TimelinePost from  "./post"
import { fetchData } from "../apis/fetch"

/** 
 * gap between two post - 700
 * fetch n posts. (n-odd)
 * Gap between two fetch = (n//2)*700
*/
const userId = "482191"
const postCnt = 3

const gap = Math.floor(postCnt/2)*700  // To fetch 5 posts. gap should be (5//2)*700
let limit = gap

export default function ListTimelinePosts(){
    const [posts, addPosts] = useState({preLn: 0, data: []})

    useEffect(() => {
        (async () => {
            try {
              let data = await fetchData(mkPostsFetchUrl(userId, new Date().toISOString(), postCnt));
              if (data == null) {
                console.log("No data to fetch");
                return;
              }
              addPosts({preLn: data.length, data: data});
            } catch (err) {
              console.error('Error fetching posts:', err);
            }
        })();
    }, [])

    useEffect(() => {      
        const handleScroll = async () => {
            if (window.scrollY > limit) {
                console.log("exceedd..")
                limit += gap;

                if(posts.preLn == 0) {
                    console.log("You read all")
                    return
                }
            
                try {
                    console.log("nice: ", posts)
                    let lastObj = posts.data[posts.data.length - 1];
                    if (lastObj == null) {
                        return;
                    }
                    let lastDate = lastObj.media.created_date;
                    console.log("last_date: ", lastDate)
                    let murl = mkPostsFetchUrl(userId, lastDate, postCnt);
                    let fetchedPosts = await fetchData(murl);
                    console.log('Fetched data:', fetchedPosts);
                    
                    if (fetchedPosts) {
                        addPosts(prevPosts => {
                            return {
                                preLn: fetchedPosts.length,
                                data: prevPosts.data.concat(fetchedPosts)
                            }
                        });
                    } else {
                        console.log('Data is null. There was an error during fetching.');
                    }
                } catch (error) {
                    console.error('Unhandled error:', error);
                }
            }
        };
      
        window.addEventListener('scroll', handleScroll)
      
        // do the cleanup
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, [posts]);
      
    console.log("outside the return: ", posts)
    if(posts == undefined) {return <Typography> Error Occuried</Typography>}
    return (
        <List>
        {
            posts.data.map((each) => {
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
