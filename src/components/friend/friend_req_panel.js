import { Paper , Avatar, Typography, Box, Button, Tooltip, Card, 
    CardContent, List, ListItem} from "@mui/material"
import { useNavigate } from 'react-router-dom';

import { TimeDiffWithNow } from "../../helper.js/date"

const reqLimit = 3
const nameLimit = 30
const facOrFieldLimit = 45
const engi = "Engineering"

export default function FriendReqsPanel({reqCount, reqList, rootStyles, showButton}){
    const navigate = useNavigate();

    const getMoreReqInfo = () => {
        navigate('/friends/request', { replace: true });
    }

    if(reqCount === 0) return (
        <Card sx={[{width: "870px", height: "100px", borderRadius: "10px", paddingLeft: "25px", display: "flex", alignItems: "center", justifyContent:"center"}, rootStyles]} spacing={1}> 
            <Typography> No Pending Friend Requests </Typography>
        </Card>
    )

    return (
        <Card sx={[{width: "870px", borderRadius: "10px", paddingLeft: "25px"}, rootStyles]} spacing={1}>
            <CardContent >
                <Typography variant="h6" sx={{marginBottom: "5px"}}> Friend Requests ({reqCount})</Typography>
                <List>
                {
                    reqList.map((info) => (
                        <ListItem key={info.user_key} >
                            <FriendReqCard imgUrl={info.image_url} username={info.username} faculty={info.faculty} 
                                    field={info.field} batch={info.batch} reqDate={info.req_date} reqId={info.req_key}/>
                        </ListItem>
                    ))
                }  
                </List>
            </CardContent>
            {
                (reqCount > reqLimit) && showButton ?             
                    <Box>
                        <Button disableRipple sx={{textTransform: "none", marginBottom: "5px"}} onClick={getMoreReqInfo}> 
                        See More</Button>
                    </Box>  : null
            }
        </Card>
    )
}

// lengths
// name: 30 , facOrField: 42, batch: 
function FriendReqCard({imgUrl, username, faculty, field, batch, reqDate, reqId}){
    let newUsername = username
    let newFacField = faculty
    if (newFacField === engi){
        newFacField = field
    }
    if(username.length > nameLimit){
        newUsername = username.substring(0, nameLimit) + "..."
    }
    if(newFacField.length > facOrFieldLimit){
        newFacField = newFacField.substring(0, facOrFieldLimit) + "..."
    }

    return (
        <Paper elevation={4} sx={{width: "700px", display: "flex", justifyContent: "space-between"}}>
            <Box sx={{display:"flex"}}>
                <Avatar alt="prof-img" src={imgUrl} sx={{width: 90, height: 90, marginY: "10px", marginLeft: "10px"}}/>
                <Box sx={{marginTop: "15px", marginLeft: "10px"}}>
                    <Typography variant="body1"> {newUsername} </Typography>
                    <Typography variant="body2"> {newFacField} </Typography>
                    <Typography variant="body2"> {batch} Batch </Typography>
                    <Typography variant="caption"> {TimeDiffWithNow(reqDate)} </Typography>
                </Box>
            </Box>
            <Box sx={{display: "flex", alignItems: "center", marginLeft: "50px"}}>
                    <Button sx={{marginRight: "7px", textTransform: "none"}} variant="outlined">Accept</Button>
                    <Tooltip title="Requestor won't notice">
                        <Button sx={{marginLeft: "7px", marginRight: "15px", textTransform: "none"}} variant="outlined" color="error">Ignore</Button>
                    </Tooltip>
            </Box>
        </Paper>
    )
}
