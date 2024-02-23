import { useState, useEffect, useMemo } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material"
import { useNavigate } from 'react-router-dom';

import ProfileCard from "../user/profile_card"
import { ListFriendsForPool, UnAuthorizedError, LoginPath, FriendSuggsRoute } from "../../apis/fetch";
import { GetUserInfoFromLS, CleanLS } from "../../apis/store";

const gap = 330
let limit = 0

export default function FriendSuggPanel({rootStyles, showButton, pageSize}){
    const navigate = useNavigate();
    const [suggList, addSuggToList] = useState([])
    const [suggCount, setSuggCount] = useState(0)
    const [pageNo, setPageNo] = useState(1)

    const getMoreSuggs = () => {
        navigate(FriendSuggsRoute);
    }

    const {gender, faculty, birthday} = useMemo(GetUserInfoFromLS, [])

    useEffect(()=> {
        window.scrollTo(0, 0);
        if(gender === undefined || faculty === undefined || birthday === undefined) {
            // TODO: Do we need to indicate relavent message to user and then redirect to login page.
            CleanLS();
            navigate(LoginPath, { replace: true });
            return
        }

        (async () => {
            if(pageNo <= 0) return
            try {
                const newSuggs = await ListFriendsForPool(faculty, gender, birthday, pageNo, pageSize)
                addSuggToList(newSuggs.data)
                setSuggCount(newSuggs.resultsCount)
                if(newSuggs.resultsCount === 0){
                    setPageNo(-1)
                    return
                }
                setPageNo(2)
            } catch (err) {
                if (err instanceof UnAuthorizedError) {  
                    navigate(LoginPath, { replace: true });
                    return
                } 
            }
        })()
    }, [])

    useEffect(() => {
        if(pageNo <= 1) return

        if(showButton) return

        const handleFriendSuggsScroll = async () => {
            if(window.scrollY >= limit){
                limit += gap
                if(pageNo <= 0){
                    // we make pageNo to -1 if nothing to there to fetch
                    return
                }
                try {
                    const newSuggs = await ListFriendsForPool(faculty, gender, birthday, pageNo, pageSize)
                    addSuggToList(preList => preList.concat(newSuggs.data))
                    if(newSuggs.resultsCount === 0){
                        setPageNo(-1)
                        return
                    }
                    setPageNo(preVal => preVal + 1)
                } catch (err) {
                    if (err instanceof UnAuthorizedError) {  
                        navigate(LoginPath, { replace: true });
                        return
                    }
                }
            }
        }
        window.addEventListener('scroll', handleFriendSuggsScroll)
      
        // do the cleanup
        return () => {
          window.removeEventListener('scroll', handleFriendSuggsScroll);
        };

    }, [suggList])

    if(suggCount === 0) return (
        <Card sx={[styles.noSuggsCard, rootStyles]} spacing={1}> 
            <Typography> No Friend Suggestions Are Available For You </Typography>
        </Card>
    )
    return (
        <Card sx={[styles.suggsCard, rootStyles]} spacing={1}>
            <CardContent>
            <Typography variant="h6" sx={styles.suggsTitle}> Friends Pool </Typography>
            <Box sx={styles.suggsBox}>
                {
                    suggList.map((prof, index) => (
                        <ProfileCard key={`${index}#${prof.key}`} username={prof.username} imgUrl={prof.image_url} initFriendState={prof.friend_state} indexNo={prof.indexNo}
                        userKey={prof.key} batch={prof.batch} facOrField={prof.faculty} friendReqId={prof.friend_req_id} rootStyle={{margin: "8px"}}/>
                    ))
                }
            </Box>
            </CardContent>
            { showButton ? 
                <Box>
                    <Button disableRipple sx={styles.seeMore} onClick={getMoreSuggs}> 
                    See More </Button>
                </Box> : null
            }
        </Card>
    )
}

const styles = {
    noSuggsCard: {
        width: "870px", height: "100px", borderRadius: "10px", paddingLeft: "25px", 
        display: "flex", alignItems: "center", justifyContent:"center"
    },
    suggsCard: {
        width: "1050px", borderRadius: "10px", paddingLeft: "25px"
    },
    suggsTitle: {marginBottom: "15px"},
    suggsBox: {
        display: 'flex', flexWrap: 'wrap', gap: "10px"
    },
    seeMore: {textTransform: "none", marginBottom: "5px"}
}
