import {useState, useEffect, useMemo} from "react"
import {List, ListItem, Typography, Card} from '@mui/material'
import { useNavigate } from 'react-router-dom';

import TimelinePost from  "./media/post"
import { UnAuthorizedError, ListRecentPosts, LoginPath } from "../apis/fetch"
import Base1 from "./layout/base1"
import { TimeDiffWithNow } from "../helper/date";
import { CleanLS, GetUserInfoFromLS } from "../apis/store";

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
    const [noData, setNoData] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0);

        (async () => {
            try {
              let data = await ListRecentPosts(userId, new Date().toISOString(), postCnt);
              if (data.length === 0) {
                setNoData(true)
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
    
    if(noData) return (
        <Card sx={{width: "870px", height: "100px", borderRadius: "10px", paddingLeft: "25px", display: "flex", 
            alignItems: "center", justifyContent:"center", marginTop: "20px"}} spacing={1}> 
            <Typography> Make some friends and start seeing new posts </Typography>
        </Card>
    )
    return (
        <List>
        {
            postsInfo.data.map((each, index) => {
                return(
                <ListItem sx={{ marginY: "5px"}} key={`${index}#${each.media._key}`}>
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
    const navigate = useNavigate();
    const {userid} =  useMemo(GetUserInfoFromLS, [])
    if(userid === undefined){
        CleanLS()
        navigate(LoginPath, { replace: true });
        return
    }
    return (
        <Base1 styles={{alignItems: "center"}} SideComponent={<ListTimelinePosts userId={userid}/>}/>
    )
}
