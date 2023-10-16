import { Card, CardMedia, CardContent, Typography, Box, Paper, Link } from '@mui/material';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';

import { MonthDateCard, TimeCard } from "./DateCard"
import { ReactionButtons } from './ReactButtons';
import { PxFactorTotalHeight } from '../../helper/common';
import image from "../../static/sample-events2.jpg"

const contentLimit = 220
const titleLimit = 75

export default function EventCardView({ eventKey, imgUrl, title, date, description, venue, mode, eventLink,
    ownerKey, username, indexNo, noOfLove, noOfGoing, reactionKey, isViewerLove, isViewerGoing  }){
    const isOnline = mode === "online"
    const cardHeight = PxFactorTotalHeight(0.28)

    return (
        <Card sx={{ display: 'flex', height: cardHeight, width: "100%" }}>
            <CardMedia
                component="img"
                sx={{ width: "22%", height: cardHeight }}
                image={image}
                alt={title}
            />
            <CardContent>
                 <TitleCard title={title}/>
                <Box sx={{padding: "10px", marginTop: "4px"}}>
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
                    <ReactionButtons rootStyls={{marginTop: "20px"}} author={username} 
                        noOfLove={noOfLove} isViewerLove={isViewerLove} 
                        isViewerGoing={isViewerGoing} noOfGoing={noOfGoing}/>
                </Box>
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

function OnlineCard(){
    return (
        <Paper sx={{ width: "100px", display: "flex", gap: "8px", paddingX: "5px", paddingY: "5px", justifyContent: "center"  }} >
            <LanguageOutlinedIcon />
            <Typography sx={{ textAlign: "center" }}> Online </Typography>
        </Paper>
    )
}

function VenueCard({location}){
    return (
        <Box sx={{display: "flex", marginTop: "14px", marginBottom: "8px", gap: "10px"}}>
            <LocationOnOutlinedIcon />
            <Typography> {location} </Typography>
        </Box>
    )
}

function OnlineEventLink({link}){
    return (
        <Box sx={{display: "flex", marginTop: "14px", marginBottom: "8px", gap: "10px"}}>
            <LinkOutlinedIcon />
            {
                link === "" ? <Typography> meeting link is not available yet </Typography> :
                <Link href="#" underline="hover" sx={{marginTop: "2px"}}> {link} </Link>
            }
        </Box>
    )
}

function ContentCard({content}){
    if(typeof content !== 'string') content = ""
    else if(content.length > contentLimit)  content = content.substring(0, contentLimit) + "..Read More..."
    
    return (
        <Typography variant='body2'> {content} </Typography>
    )
}


// TODO: 
/**
 * 1. meeting link proper lenght. do we present he link or give some place holder for that.
 * 2. once link on the  meetin link page need to redirect to some other page. 
 * 3. posted By name should be a link where it redirect to the actual user.
 */