import React, { useState } from "react";
import { Avatar, Box, Paper, Typography, Button, Tooltip } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import { SendFriendReq, IgnoreFriendReq, AcceptFriendReq, UnAuthorizedError, LoginPath } from "../../apis/fetch";

const nameLimit = 24 // for 27 length
const facOrFieldLimit = 30 // for 33 length

// friend types (from json response)
const friendType = "friend"
const notFriendType = "not_friend"
const pendingReqtorType = "pending#requestor"
const pendingRecpType = "pending#recipient"

// imgUrl, request OR pending, username(first name + second name), faculty or field (if Engineering), batch
export default function ProfileCard({userKey, username, imgUrl, facOrField, batch, friendReqId, initFriendState, rootStyle}){
  const navigate = useNavigate();
  const [friendState, setFriendState] = useState(initFriendState)
  const [fReqId, setFReqId] = useState(friendReqId)

  let newUsername = username
  let newFacField = facOrField
  if(username.length > nameLimit){
      newUsername = username.substring(0, nameLimit) + "..."
  }
  if(facOrField.length > facOrFieldLimit){
      newFacField = facOrField.substring(0, facOrFieldLimit) + "..."
  }

  const onFriendRequest = async () => {
    try {
      const friendReqKey = await SendFriendReq({
          "friend": userKey,
          "mode": "active",  
          "state": "pending"
        })
        if(friendReqKey === "") return
        setFReqId(friendReqKey)  
        setFriendState(pendingReqtorType)
    } catch (err){
      if (err instanceof UnAuthorizedError) {  
        navigate(LoginPath, { replace: true });
        return
      }
        console.error("failed to create friend req: ", err)
    }
  }

  const onRemoveFriendReq = async () => {
    try {
      await IgnoreFriendReq(fReqId, userKey)
      setFReqId("")
      setFriendState(notFriendType)
    } catch (err) {
      if (err instanceof UnAuthorizedError) {  
        navigate(LoginPath, { replace: true });
        return
      }
      console.error("failed to remove pending req: ", err)
    }
  }

  const onAccept = async () => {
    try {
      await AcceptFriendReq(fReqId, {"reqstor_id": userKey})
      setFReqId("")
      setFriendState(friendType)
    } catch (err) {
      if (err instanceof UnAuthorizedError) {  
        navigate(LoginPath, { replace: true });
        return
      }
      console.error("failed to accept friend req: ", err)
    }
  }

  let stateButn = null
  if(friendState === notFriendType){
    stateButn = <Tooltip title="Send a friend request">
      <Button variant="outlined" sx={styles.butn} size="small" disableElevation disableRipple onClick={onFriendRequest}>Request</Button>
    </Tooltip>
  }
  else if (friendState === pendingReqtorType) {
    stateButn = <Tooltip title="Remove the friend request">
        <Button variant="contained" sx={styles.butn} size="small" disableElevation disableRipple onClick={onRemoveFriendReq}> Pending </Button>
      </Tooltip>
  } else if (friendState === pendingRecpType){
    stateButn = <Box sx={styles.recipContainer}> 
        <Typography variant="caption"> Friend Request </Typography>
        <Button sx={styles.acceptButn} disableRipple size="small" variant="outlined" onClick={onAccept}>Accept</Button>
        <Tooltip title="Requestor won't notice">
            <Button sx={styles.ignoreButn} disableRipple size="small" variant="outlined" color="error" onClick={onRemoveFriendReq}>Ignore</Button>
        </Tooltip>
      </Box>

  } else if (friendState === friendType){
    stateButn = <Typography sx={styles.friendText} variant="body1"> Your Friend </Typography>
  }

  return (
    <Paper elevation={4} sx={[styles.topContainer, rootStyle]}>
      <Box sx={styles.avatarContainer}>
          <Avatar src={imgUrl} aria-label="some-prof" sx={styles.avatar}/>
          {stateButn}
      </Box>
      
      <Typography variant="body1" sx={styles.username}> {newUsername} </Typography>
      <Typography variant="body2" sx={styles.text}> {newFacField} </Typography>
      <Typography variant="caption" sx={styles.text}> {batch} batch </Typography>
    </Paper>
  )
}

const styles = {
  topContainer : {
    width: 270, height: 240
  },
  avatarContainer : {
    display: "flex", justifyContent: "flex-start", gap: "6%"
  },
  avatar: {
    width: 130, height: 130, marginLeft: "4%", marginTop: "3%" 
  },
  username: {
    marginTop: "4%", marginLeft: "4%", marginBottom: "4px"
  },
  text: {
    marginLeft: "4%"
  },
  butn: {
    textTransform: "none", height: "6%", marginTop: "8%", fontWeight: "bold", fontSize: "14px"
  },
  recipContainer: {
    paddingLeft: "10px", paddingTop: "4%"
  },
  acceptButn: {
    textTransform: "none", marginBottom: "8px", marginTop: "2px"
  },
  ignoreButn: {
    textTransform: "none"
  },
  friendText: {
    paddingTop: "20px", fontWeight: "bold"
  }
}
