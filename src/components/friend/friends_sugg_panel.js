import { Box, Card, CardContent, Typography, Button } from "@mui/material"
import { useNavigate } from 'react-router-dom';

import ProfileCard from "../user/profile_card"

const suggLimit = 8

export default function FriendSuggPanel({suggList, suggCount, rootStyles, showButton}){
    const navigate = useNavigate();

    const getMoreSuggs = () => {
        navigate('/friends/suggs', { replace: true });
    }

    if(suggCount === 0) return (
        <Card sx={[{width: "870px", height: "100px", borderRadius: "10px", paddingLeft: "25px", display: "flex", alignItems: "center", justifyContent:"center"}, rootStyles]} spacing={1}> 
            <Typography> No Friend Suggestions Are Availble For You </Typography>
        </Card>
    )
    return (
        <Card sx={[{width: "1050px", borderRadius: "10px", paddingLeft: "25px"}, rootStyles]} spacing={1}>
            <CardContent>
            <Typography variant="h6" sx={{marginBottom: "15px"}}> Friend Suggestions</Typography>
            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: "10px"}}>
                {
                    suggList.map((prof) => (
                        <ProfileCard key={prof.key} username={prof.username} imgUrl={prof.image_url}
                            batch={prof.batch} facOrField={prof.faculty} isReqted={false}/>
                    ))
                }
            </Box>
            </CardContent>
            { (suggCount >= suggLimit) && showButton ? 
                <Box>
                    <Button disableRipple sx={{textTransform: "none", marginBottom: "5px"}} onClick={getMoreSuggs}> 
                    See More </Button>
                </Box> : null
            }
        </Card>
    )
}
