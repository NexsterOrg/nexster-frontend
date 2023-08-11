import React, {useState, useEffect} from "react"
import {List, ListItem, Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom';

import TimelinePost from  "./media/post"
import { fetchData, MkPostsFetchUrl, UnAuthorizedError } from "../apis/fetch"
import Base1 from "./layout/base1"

/** 
 * gap between two post - 700
 * fetch n posts. (n-odd)
 * Gap between two fetch = (n//2)*700
*/
const postCnt = 3

const gap = Math.floor(postCnt/2)*700  // To fetch 5 posts. gap should be (5//2)*700
let limit = gap

function ListTimelinePosts({userId}){
    const navigate = useNavigate();
    // TODO:
    // data array should only contain unique values. But due to some uncertainty nature, this can have 
    // same value twice. check this.
    const [postsInfo, addPostsInfo] = useState({preLn: 0, data: []})

    useEffect(() => {
        window.scrollTo(0, 0);

        (async () => {
            try {
              let data = await fetchData(MkPostsFetchUrl(userId, new Date().toISOString(), postCnt));
              if (data == null) {
                return;
              }
              addPostsInfo({preLn: data.length, data: data});
            } catch (err) {
                if (err instanceof UnAuthorizedError) {
                    // TODO: before naviagating to /login, we need to remove JWT token from local stroage()
                    navigate('/login', { replace: true });
                    return
                } 
                console.error('Error fetching posts:', err); // TODO : Remove this in production
            }
        })();
    }, [])

    useEffect(() => {      
        const handleScroll = async () => {
            if (window.scrollY > limit) {
                limit += gap
                if(postsInfo.preLn === 0) {
                    // All posts have been read
                    return
                }
                try {
                    let lastObj = postsInfo.data[postsInfo.data.length - 1];
                    if (lastObj === null) {
                        return;
                    }
                    let fetchedPosts = await fetchData(MkPostsFetchUrl(userId, lastObj.media.created_date, postCnt));

                    if (fetchedPosts) {
                        addPostsInfo(prevPosts => {
                            return {
                                preLn: fetchedPosts.length,
                                data: prevPosts.data.concat(fetchedPosts)
                            }
                        });
                    }
                } catch (err) {
                    if (err instanceof UnAuthorizedError) {  // TODO : Remove this in production
                        navigate('/login', { replace: true });
                        return
                    } 
                    console.error('Error fetching posts:', err);
                }
            }
        };
      
        window.addEventListener('scroll', handleScroll)
      
        // do the cleanup
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, [postsInfo]);
      
    if(postsInfo === undefined) {return <Typography> Error Occuried</Typography>}
    return (
        <List>
        {
            postsInfo.data.map((each) => {
                return(
                <ListItem sx={{ marginY: "5px"}} key={each.media._key}>
                    <TimelinePost 
                    postInfo={{imgUrl: each.media.link, caption: each.media.title, description: each.media.description,
                    mediaKey: each.media._key}} 
                    profInfo={{name: each.owner.name, postDate: timeDiffWithNow(each.media.created_date), profUrl: each.owner.image_url }}
                    reactsCnt={each.reactions.like + each.reactions.love + each.reactions.laugh}
                    viewerId={userId}
                    viewerReaction={each.viewer_reaction}
                    />
                </ListItem>
                )
            })
        }
        </List>
    )
}

export default function Timeline(){
    return (
        <Base1 SideComponent={<ListTimelinePosts userId={"482191"}/>}/>
    )
}

const hrLimit = 60
const dayLimit = 1440
const weekLimit = 10080
const monthLimit = 40320

function timeDiffWithNow(timeIsoStr){
    let givenDate = new Date(timeIsoStr);
    let currentDate = new Date();

    let timeDiffMin = Math.floor((currentDate - givenDate)/60000);

    if(timeDiffMin >= monthLimit) {
        return `${Math.floor(timeDiffMin/monthLimit)}m`
    }

    if(timeDiffMin >= weekLimit) {
        return `${Math.floor(timeDiffMin/weekLimit)}w`
    }

    if(timeDiffMin >= dayLimit) {
        return `${Math.floor(timeDiffMin/dayLimit)}d`
    }

    if(timeDiffMin >= hrLimit) {
        return `${Math.floor(timeDiffMin/hrLimit)}h`
    }

    if(timeDiffMin < 1) {
        return "now"
    }
    return `${timeDiffMin}min`
}
