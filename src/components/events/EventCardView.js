import { Card, CardMedia, Button, CardContent, Typography, Box, Paper, Link } from '@mui/material';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';

import { MonthDateCard, TimeCard } from "./DateCard"
import { ReactionButtons } from './ReactButtons';
import ScrollPaperDialog from './DescriptionModel';
import { useState } from 'react';

const contentLimit = 220
const titleLimit = 75

const cardHeight = {
    xl: 275,
    lg: 260,
    xmd: 230
}

export default function EventCardView({ eventKey, imgUrl, title, date, description, venue, mode, eventLink,
    ownerKey, username, indexNo, noOfLove, noOfGoing, reactionKey, isViewerLove, isViewerGoing  }){
    const isOnline = mode === "online"

    return (
        <Card sx={{ display: 'flex', height: cardHeight, width: "100%" }}>
            <CardMedia
                component="img"
                sx={{ width: "22%", height: cardHeight }}
                image={imgUrl}
                alt={title}
            />
            <CardContent sx={{paddingY: "0px !important", display: "flex", flexDirection: "column", 
            justifyContent: "space-around", gap: "8px",  width: "100%"}}>
                 <TitleCard title={title}/>
                    <Box sx={{display: "flex", gap: "30px" }}>
                        <MonthDateCard utcDateString={date}/>
                        <TimeCard utcFromDate={date} />
                        {
                            isOnline ? <OnlineCard /> : null
                        }
                    </Box>
                    {
                        isOnline ?  <OnlineEventLink link={eventLink} /> : <VenueCard location={venue}/>
                    }
                    <ContentCard content={description}/>
                    <ReactionButtons  author={username} 
                        noOfLove={noOfLove} isViewerLove={isViewerLove} 
                        isViewerGoing={isViewerGoing} noOfGoing={noOfGoing}
                        reactionKey={reactionKey} eventKey={eventKey} indexNo={indexNo}
                    />
            </CardContent>
        </Card>
    )
}

function TitleCard({title}){
    if(typeof title !== 'string') title = ""
    else if(title.length > titleLimit)  title = title.substring(0, titleLimit) + "..."
    
    return (
        <Typography variant='h5'> {title} </Typography>
    )
}

const iconSize = {
    xl: 24,
    lg: 22,
    xmd: 20,
    md: 18,
    sm: 16
}

function OnlineCard(){
    return (
        <Paper sx={{ width: "12%", display: "flex", gap: "8px", paddingX: "1%", paddingY: "5px", justifyContent: "center"  }} >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <LanguageOutlinedIcon sx={{width: iconSize, height: iconSize}}/>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ textAlign: "center" }}> Online </Typography>
            </Box>
        </Paper>
    )
}

// const marginForLocations = {
//     top: {
//         xl: 24,
//         lg: 22,
//         xmd: 20,
//         md: 18,
//         sm: 16
//     }
// }

function VenueCard({location}){
    return (
        <Box sx={{display: "flex", gap: "10px"}}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocationOnOutlinedIcon sx={{ width: iconSize, height: iconSize}} />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography> {location ? location: "Location is not provided yet."} </Typography>
            </Box> 
        </Box>
    )
}

const linkFontSize = {
    xl: 15,
    lg: 14,
    xmd: 13,
    md: 10,
    sm: 8
}

// marginTop: "1.5%", marginBottom: "1%",
function OnlineEventLink({link}){
    return (
        <Box sx={{display: "flex",  gap: "10px"}}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <LinkOutlinedIcon sx={{ width: iconSize, height: iconSize}}/>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                {
                    link === "" ? <Typography> meeting link is not available yet </Typography> :
                    <Link href={link} target="_blank" underline="hover" sx={{marginTop: "2px", fontSize: linkFontSize}}> Meeting Link </Link>
                }
            </Box>
        </Box>
    )
}

function ContentCard({content}){
    const [open, setOpen] = useState(false)

    let limitedContent = ""
    let isContentCutOff = false
    if(typeof content !== 'string') limitedContent = ""
    else if(content.length > contentLimit)  {
        limitedContent = content.substring(0, contentLimit)
        isContentCutOff = true
    }
    else limitedContent = content
    return (
        <>
            <Typography variant='body2'> 
                {limitedContent} 
                { isContentCutOff ?     
                    <Button variant="text" sx={{ textTransform: "none" }} onClick={() => setOpen(true)}>
                        Read More...</Button> : null
                }
            </Typography>
            <ScrollPaperDialog open={open} setOpen={setOpen} description={content}/>
        </>
            
    )
}
