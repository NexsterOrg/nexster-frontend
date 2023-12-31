import { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import ProfileCard from "../user/profile_card"
import { SearchUser, UnAuthorizedError, LoginPath } from "../../apis/fetch";

export default function SearchUserResults({rootStyles, keyword}){
    const navigate = useNavigate();
    const [resultsList, addResultsToList] = useState([])
    const [resultsCount, setResultsCount] = useState(0)

    useEffect(()=> {
        window.scrollTo(0, 0);

        (async () => {
            try {
                const newResults = await SearchUser(keyword)
                addResultsToList(newResults.data)
                setResultsCount(newResults.resultsCount)
            } catch (err) {
                if (err instanceof UnAuthorizedError) {  
                    navigate(LoginPath, { replace: true });
                    return
                } 
                console.error("Failed to fetch search results")
            }
        })()
    }, [keyword])

    if(resultsCount === 0) return (
        <Card sx={[styles.noSuggsCard, rootStyles]} spacing={1}> 
            <Typography> No Users Found. Try a Different Search? </Typography>
        </Card>
    )
    return (
        <Card sx={[styles.suggsCard, rootStyles]} spacing={1}>
            <CardContent>
            <Typography variant="h6" sx={styles.suggsTitle}> Search Results </Typography>
            <Box sx={styles.suggsBox}>
                {
                    resultsList.map((prof, index) => (
                        <ProfileCard key={`${index}#${prof.key}`} username={prof.username} imgUrl={prof.image_url} initFriendState={prof.friend_state} 
                        userKey={prof.key} batch={prof.batch} facOrField={prof.faculty} friendReqId={prof.friend_req_id} rootStyle={{margin: "8px"}}
                        indexNo={prof.indexNo} />
                    ))
                }
            </Box>
            </CardContent>
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
    }
}
