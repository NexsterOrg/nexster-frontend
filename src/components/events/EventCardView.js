import { Card, CardMedia, CardContent, Typography, Box, Paper, Link } from '@mui/material';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import TocOutlinedIcon from '@mui/icons-material/TocOutlined';

import { MonthDateCard, TimeCard } from "./DateCard"
import { ReactionButtons } from './ReactButtons';
import image from "../../static/sample-events2.jpg"

export default function EventCardView(){
    return (
        <Card sx={{ display: 'flex', height: "300px", width: "90%" }}>
            <CardMedia
                component="img"
                sx={{ width: "320px" }}
                image={image}
                alt="event-abina-poster"
            />
            <CardContent>
                 <Typography variant='h5'> Friday Night party </Typography>
                <Box sx={{padding: "10px", marginTop: "4px"}}>
                    <Box sx={{display: "flex", gap: "40px" }}>
                        <MonthDateCard utcDateString={"2023-10-14T22:30:00Z"}/>
                        <TimeCard utcFromDate={"2023-10-14T14:30:00Z"} utcToDate={"2023-10-14T16:30:00Z"}/>
                        {
                            true ? <OnlineCard /> : null
                        }
                    </Box>
                    {
                        false ? <VenueCard location={"Civil Auditorium"}/> : <OnlineEventLink link={"https://zoom.com/meet/kytqhdAq23m"} />
                    }
                    <ContentCard content={`This is some introduction about the Abina. There are many variations of passages of Lorem Ipsum available, 
                        but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even 
                        slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure about it. Read More ...`}
                    />
                    <ReactionButtons rootStyls={{marginTop: "20px"}}/>
                </Box>
            </CardContent>
        </Card>
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
    // TODO: Need to cut off exceeded part
    return (
        <Typography variant='body2'> {content} </Typography>
    )
}
