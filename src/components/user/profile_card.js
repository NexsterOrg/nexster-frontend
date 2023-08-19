import React, { useState } from "react";
import { Avatar, Box, Paper, Typography, Button, Tooltip } from "@mui/material";

const nameLimit = 24 // for 27 length
const facOrFieldLimit = 30 // for 33 length

// imgUrl, request OR pending, username(first name + second name), faculty or field (if Engineering), batch
export default function ProfileCard({username, imgUrl, facOrField, batch, isReqted}){
    const [isRequested, isRequestedState] = useState(isReqted)
    let newUsername = username
    let newFacField = facOrField
    if(username.length > nameLimit){
        newUsername = username.substring(0, nameLimit) + "..."
    }
    if(facOrField.length > facOrFieldLimit){
        newFacField = facOrField.substring(0, facOrFieldLimit) + "..."
    }

    return (
      <Paper elevation={4} sx={{width: 240, height: 210}}>
        <Box sx={{display: "flex", justifyContent: "flex-start", gap: "6%"}}>
            <Avatar src={imgUrl} aria-label="some-prof" sx={{width: 100, height: 100, marginLeft: "4%", marginTop: "3%" }}/>
            {isRequested ? 
            <Tooltip title="Remove the friend request">
              <Button variant="contained" sx={{textTransform: "none", height: "6%", marginTop: "8%", fontWeight: "bold", fontSize: "14px"}} 
              size="small" disableElevation> Pending </Button>
            </Tooltip>
            :
            <Tooltip title="Send a friend request">
              <Button variant="outlined" sx={{textTransform: "none", height: "6%", marginTop: "8%", fontWeight: "bold", fontSize: "14px"}} 
              size="small" disableElevation>Request</Button>
            </Tooltip>
        }
        </Box>
        
        <Typography variant="body1" sx={{marginY: "4%", marginLeft: "4%"}}> {newUsername} </Typography>
        <Typography variant="body2" sx={{marginLeft: "4%"}}> {newFacField} </Typography>
        <Typography variant="caption" sx={{marginLeft: "4%"}}> {batch} batch </Typography>
      </Paper>
    )
}
