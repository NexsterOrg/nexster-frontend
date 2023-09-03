import { useState, useEffect } from "react";
import { Paper , Avatar, Typography, Box, Button, Tooltip, Card, 
    CardContent, List } from "@mui/material"
import { useNavigate } from 'react-router-dom';

import { TimeDiffWithNow } from "../../helper/date"
import { AcceptFriendReq, ListFriendReqs, GetAllFriendReqsCount, LoginPath,
    IgnoreFriendReq, UnAuthorizedError, FriendsRequestRoute } from "../../apis/fetch";

const reqLimit = 3
const nameLimit = 30
const facOrFieldLimit = 45
const engi = "Engineering"

const gap = 330
let limit = 0

// TODO: Check the response from API call and handl it properly.
export default function FriendReqsPanel({rootStyles, showButton, initPageNo, initPageSize, pageSize}){
    const navigate = useNavigate();
    const [reqList, addReqToList] = useState([])
    const [totalReqCount, setTotalReqCount] = useState(0)
    const [pageNo, setPageNo] = useState(initPageNo)

    const getMoreReqInfo = () => {
        navigate(FriendsRequestRoute);
    }

    const onRemove = async () => {
        try {
            if(showButton && totalReqCount > 3){
                const newReqs = await ListFriendReqs(pageNo+1, pageSize)
                addReqToList(preList => preList.concat(newReqs.data))
            }
            setTotalReqCount(preVal => preVal-1)
        } catch (err) {
            if (err instanceof UnAuthorizedError) {  
                navigate(LoginPath, { replace: true });
                return
            } 
            console.error("err onRemove: ", err)   
        }
    }

    useEffect(()=> {
        window.scrollTo(0, 0);

        (async () => {
            if(pageNo <= 0) return
            try {
                const newReqs = await ListFriendReqs(pageNo, initPageSize)
                const allReqsCount = await GetAllFriendReqsCount()
                addReqToList(newReqs.data)
                setTotalReqCount(allReqsCount)
                if(newReqs.size < initPageSize){
                    setPageNo(-1)
                    return
                }
                setPageNo(2)
            } catch (err) {
                if (err instanceof UnAuthorizedError) {  
                    navigate(LoginPath, { replace: true });
                    return
                } 
                console.error(err)
            }
        })()
    }, [])

    useEffect(() => {
        if(pageNo <= initPageNo) return

        if(showButton) return

        const handleFriendReqsScroll = async () => {
            if(window.scrollY >= limit){
                limit += gap
                if(pageNo <= 0){
                    // we make pageNo to -1 if nothing to there to fetch
                    return
                }
                try {
                    const newReqs = await ListFriendReqs(pageNo, pageSize)
                    addReqToList(preList => preList.concat(newReqs.data))
                    if(newReqs.size < pageSize){
                        setPageNo(-1)
                        return
                    }
                    setPageNo(preVal => preVal + 1)
                } catch (err) {
                    if (err instanceof UnAuthorizedError) {  
                        navigate(LoginPath, { replace: true });
                        return
                    } 
                    console.error("after scroll event", err)
                }
            }
        }
        // do the cleanup
        return () => {
          window.removeEventListener('scroll', handleFriendReqsScroll);
        };

    }, [reqList])

    if(totalReqCount === 0) return (
        <Card sx={[{width: "870px", height: "100px", borderRadius: "10px", paddingLeft: "25px", display: "flex", alignItems: "center", justifyContent:"center"}, rootStyles]} spacing={1}> 
            <Typography> No Pending Friend Requests </Typography>
        </Card>
    )

    return (
        <Card sx={[{width: "870px", borderRadius: "10px", paddingLeft: "25px"}, rootStyles]} spacing={1}>
            <CardContent >
                <Typography variant="h6" sx={{marginBottom: "5px"}}> Friend Requests ({totalReqCount})</Typography>
                <List>
                {
                    reqList.map((info) => (
                       
                            <FriendReqCard key={info.user_key} imgUrl={info.image_url} username={info.username} faculty={info.faculty} 
                                    field={info.field} batch={info.batch} reqDate={info.req_date} 
                                    friendReqId={info.req_key} reqstorId={info.user_key} onRemoveFunc={onRemove}/>
                    ))
                }  
                </List>
            </CardContent>
            {
                (totalReqCount > reqLimit) && showButton ?             
                    <Box>
                        <Button disableRipple sx={{textTransform: "none", marginBottom: "5px"}} onClick={getMoreReqInfo}> 
                        See All</Button>
                    </Box>  : null
            }
        </Card>
    )
}

// lengths
// name: 30 , facOrField: 42, batch: 
// TODO: Add alert msgs after accept/ignore actions
function FriendReqCard({imgUrl, username, faculty, field, batch, reqDate, friendReqId, reqstorId, onRemoveFunc}){
    const navigate = useNavigate();
    const [fId, setFId] = useState(friendReqId)

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

    const onAccept = async () => {
        try {
            const isSucceed = await AcceptFriendReq(friendReqId, {"reqstor_id": reqstorId})
            if(!isSucceed) {
                // TODO: Display faliure alert
                console.log("falied")
                return
            } 
            await onRemoveFunc()
            setFId("")
        } catch (err) {
            if (err instanceof UnAuthorizedError) {  
                navigate(LoginPath, { replace: true });
                return
            } 
            console.error("failed to accept friend req: ", friendReqId, reqstorId)
        }
    }
    const onIgnore = async () => {
        try {
            const isSucceed = await IgnoreFriendReq(friendReqId, reqstorId)
            if(!isSucceed) {
                // TODO: Display faliure alert
                console.log("falied")
                return
            } 
            await onRemoveFunc()
            setFId("")
        } catch (err) {
            if (err instanceof UnAuthorizedError) {  
                navigate(LoginPath, { replace: true });
                return
            } 
            console.error("failed to ignore friend req: ", friendReqId, reqstorId)
        }
    }

    if (fId === "" || reqstorId === "") {
        return null
    }

    return (
        <Paper elevation={4} sx={{width: "700px", display: "flex", justifyContent: "space-between", marginBottom: "8px"}}>
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
                    <Button sx={{marginRight: "7px", textTransform: "none"}} variant="outlined" onClick={onAccept}>Accept</Button>
                    <Tooltip title="Requestor won't notice">
                        <Button sx={{marginLeft: "7px", marginRight: "15px", textTransform: "none"}} variant="outlined" 
                        color="error" onClick={onIgnore}>Ignore</Button>
                    </Tooltip>
            </Box>
        </Paper>
    )
}
