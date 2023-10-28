import { useState } from "react";
import { Box, Button, Typography, Link } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';

import { CreateEventReaction, SetEventReactionState, UnAuthorizedError, LoginPath, MkUserProfilePageLink } from "../../apis/fetch";
import { EventLoveReactionModel, EventGoingReactionModel } from "./EventReactionModel";
import { LimitStringDataLn } from "../../helper/common";

const usernameLimit = 15

const butnIconSize = { 
    xl: 16,
    lg: 15,
    xmd: 14,
    md: 12
}

const butnSize = {
    xl: 28,
    lg: 26,
    xmd: 25,
    md: 22
}

const postedByFontSize = {
    xl: 12,
    lg: 11,
    xmd: 10,
    md: 9,
    sm: 7
}

export function ReactionButtons({isViewerLove, noOfLove, isViewerGoing, noOfGoing, author, reactionKey, eventKey, indexNo}){
    const [isLove, setIsLove] = useState(isViewerLove)
    const [isGoing, setIsGoing] = useState(isViewerGoing)
    const [loveCount, setLoveCount] = useState(noOfLove)
    const [goingCount, setGoingCount] = useState(noOfGoing)
    const [reactKey, setReactKey] = useState(reactionKey)
    const navigate = useNavigate();

    // love, going list
    const [loveModalOpen, setLoveModalOpen] = useState(false)
    const [goingModalOpen, setGoingModalOpen] = useState(false)

    const handleLoveButnClick = async () => {
        try {
            if (reactKey === "") {
                const newEventReactionKey = await CreateEventReaction(eventKey, {love: true, going: false})
                if (newEventReactionKey === "") return
                setReactKey(newEventReactionKey)
            } else {
                const isSuccess = await SetEventReactionState(reactKey, "love", !isLove)
                if(!isSuccess) return 
            }
            setLoveCount(preCount => isLove ? (preCount <= 0 ) ? 0 : preCount-1 : preCount+1)
            setIsLove(preState => !preState)
        } catch (err) {
            if (err instanceof UnAuthorizedError) {
                navigate(LoginPath, { replace: true });
                return
            } 
        }
    }

    const handleGoingButnClick = async () => {
        try {
            if (reactKey === "") {
                const newEventReactionKey = await CreateEventReaction(eventKey, {love: false, going: true})
                if (newEventReactionKey === "") return
                setReactKey(newEventReactionKey)
            } else {
                const isSuccess = await SetEventReactionState(reactKey, "going", !isGoing)
                if(!isSuccess) return 
            } 
            setGoingCount(preCount => isGoing ? (preCount <= 0 ) ? 0 :  preCount-1 : preCount+1)
            setIsGoing(preState => !preState)
        } catch (err) {
            if (err instanceof UnAuthorizedError) {
                navigate(LoginPath, { replace: true });
                return
            }
        }
    }

    const onLoveCoundClick = () => {
        setLoveModalOpen(true)
    }

    const onGoingCoundClick = () => {
        setGoingModalOpen(true)
    }
  
    return (
        <Box >
            <Box sx={{display: "flex", gap: "10px"}}>

                <Button variant={isLove ? "contained" : "outlined"} 
                    disableRipple size="small"
                    sx={{ textTransform: "none", height: butnSize}}
                    startIcon={<FavoriteBorderOutlinedIcon sx={{ width: butnIconSize, height: butnIconSize}}/>}
                    onClick={handleLoveButnClick}
                > Love </Button>

                <Button variant={isGoing ? "contained" : "outlined"} 
                    disableRipple size="small"
                    sx={{ textTransform: "none", height: butnSize}}
                    startIcon={isGoing ? <CheckIcon sx={{ width: butnIconSize, height: butnIconSize}}/> : <QuestionMarkOutlinedIcon sx={{ width: butnIconSize, height: butnIconSize}}/>}
                    onClick={handleGoingButnClick}
                > Going </Button>
            </Box>
            <Box sx={{ marginTop: "12px",display: "flex", justifyContent: "space-between"}}>
                <Box sx={{display: "flex", justifyContent: "flex-start"}}>
                    <Button sx={{textTransform: "none"}} disableRipple onClick={onLoveCoundClick} >
                        <Typography variant="caption"> {loveCount} loves </Typography> 
                    </Button>
                    <Button sx={{textTransform: "none"}} disableRipple onClick={onGoingCoundClick}>
                        <Typography variant="caption"> {goingCount} going </Typography> 
                    </Button>
                </Box>
                {/* <Typography variant="caption"> posted by: {LimitStringDataLn(author, usernameLimit)} </Typography> */}
                <Link href={MkUserProfilePageLink(indexNo)} target="_blank" underline="hover" sx={{fontSize: postedByFontSize}}> posted by: {LimitStringDataLn(author, usernameLimit)}  </Link>

               { loveModalOpen ? <EventLoveReactionModel open={loveModalOpen} setOpen={setLoveModalOpen} eventKey={eventKey}/> : null }
                
               { goingModalOpen ? <EventGoingReactionModel open={goingModalOpen} setOpen={setGoingModalOpen} eventKey={eventKey}/> : null }
            </Box>
        </Box>
    )
}
