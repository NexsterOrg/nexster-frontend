import { Box, Button, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';

import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";


export function ReactionButtons({rootStyls, isViewerLove, noOfLove, isViewerGoing, noOfGoing, author}){
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
        <Box sx={rootStyls}>
            <Box sx={{display: "flex", gap: "10px"}}>

                <Button variant={isLove ? "contained" : "outlined"} 
                    disableRipple size="small"
                    sx={{ textTransform: "none"}}
                    startIcon={<FavoriteBorderOutlinedIcon />}
                    onClick={handleLoveButnClick}
                > Love </Button>

                <Button variant={isGoing ? "contained" : "outlined"} 
                    disableRipple size="small"
                    sx={{ textTransform: "none"}}
                    startIcon={isGoing ? <CheckIcon /> : <QuestionMarkOutlinedIcon />}
                    onClick={handleGoingButnClick}
                > Going </Button>
            </Box>
            <Box sx={{ marginTop: "12px", display: "flex", justifyContent: "space-between"}}>
                <Typography variant="caption"> {loveCount} loves, {goingCount} going </Typography>
                <Typography variant="caption"> posted by: {author} </Typography>
            </Box>
        </Box>
    )
}
