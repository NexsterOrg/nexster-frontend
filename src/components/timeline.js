import {useState, useEffect} from "react"
import {List, ListItem, Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom';

import TimelinePost from  "./media/post"
import { UnAuthorizedError, ListRecentPosts } from "../apis/fetch"
import Base1 from "./layout/base1"
import { TimeDiffWithNow } from "../helper/date";

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
              let data = await ListRecentPosts(userId, new Date().toISOString(), postCnt);
              if (data === []) {
                return;
              }
              addPostsInfo({preLn: data.length, data: data});
            } catch (err) {
                if (err instanceof UnAuthorizedError) {
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
                    let fetchedPosts = await ListRecentPosts(userId, lastObj.media.created_date, postCnt);

                    if (fetchedPosts) {
                        addPostsInfo(prevPosts => {
                            return {
                                preLn: fetchedPosts.length,
                                data: prevPosts.data.concat(fetchedPosts)
                            }
                        });
                    }
                } catch (err) {
                    if (err instanceof UnAuthorizedError) {  
                        navigate('/login', { replace: true });
                        return
                    } 
                    console.error('Error fetching posts:', err);  // TODO : Remove this in production
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
                    profInfo={{name: each.owner.name, postDate: TimeDiffWithNow(each.media.created_date), profUrl: each.owner.image_url }}
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
        <Base1 styles={{alignItems: "center"}} SideComponent={<ListTimelinePosts userId={"482191"}/>}/>
    )
}
