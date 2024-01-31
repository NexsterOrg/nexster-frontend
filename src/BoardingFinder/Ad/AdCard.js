import { useMemo } from "react"
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material"
import { TimeDiffWithNow } from "../../helper/date"

const cardHeight = {
    xl: 210,
    lg: 200,
    xmd: 185
}


export default function AdCard({key1, imageUrl, rent, shortAddr, beds, baths, gender, postedDate}) {

    return (
        <Card sx={{ display: 'flex', height: cardHeight, width: "70%" }}>
            <CardMedia
                component="img"
                sx={{ width: "40%", height: cardHeight }}
                image={imageUrl}
                alt={`ad-card-${key1}`}
            />
            <CardContent sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "20px"} }>
                <PriceContent price={rent} shortAddress={shortAddr}/>
                <InfoContent noOfBeds={beds} noOfBaths={baths} gender={gender}/>
                <PostedDate date={postedDate}/>
            </CardContent>
        </Card>
    ) 
}

function PriceContent({price, shortAddress}){
    return (
        <Box>
            
            <Typography variant="h6" sx={{ marginBottom: "4px", color: "#4dd672", fontWeight: "bold" }} > Rs {price}  
                <Typography variant="caption"  >  per person, month </Typography> 
            </Typography>
            <Typography variant="subtitle2"> {shortAddress} </Typography>
        </Box>
    )
}


const infoColor = "#de6a8f"
function InfoContent({noOfBeds, noOfBaths, gender }){
    return(
        <Box>
            <Typography > {noOfBeds} beds, {noOfBaths} baths</Typography>
            <Typography sx={{ marginTop: "2px" }}> For: <span style={{ color: infoColor }}> {gender} </span> </Typography>
        </Box>
    )
}

function PostedDate({date}) {
    const dateStr = useMemo(() => TimeDiffWithNow(date))
    return (
        <Box sx={{ textAlign: "end"}}>
            <Typography variant="caption"> {dateStr} </Typography>
        </Box>
    )
}
