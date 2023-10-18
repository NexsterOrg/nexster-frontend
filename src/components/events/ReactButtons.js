import { Box, Button, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';

import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";

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

export function ReactionButtons({isViewerLove, noOfLove, isViewerGoing, noOfGoing, author}){
    const [isLove, setIsLove] = useState(isViewerLove)
    const [isGoing, setIsGoing] = useState(isViewerGoing)
    const [loveCount, setLoveCount] = useState(noOfLove)
    const [goingCount, setGoingCount] = useState(noOfGoing)

    const handleLoveButnClick = () => {
        // TODO: update the backend. do an API call here
        setLoveCount(preCount => isLove ? (preCount <= 0 ) ? 0 : preCount-1 : preCount+1)
        setIsLove(preState => !preState)
    }

    const handleGoingButnClick = () => {
        // TODO: issue an API call to update the backend.
        setGoingCount(preCount => isGoing ? (preCount <= 0 ) ? 0 :  preCount-1 : preCount+1)
        setIsGoing(preState => !preState)
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
                <Typography variant="caption"> {loveCount} loves, {goingCount} going </Typography>
                <Typography variant="caption"> posted by: {author} </Typography>
            </Box>
        </Box>
    )
}
