import { useMemo } from "react"
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material"
import { TimeDiffWithNow } from "../../helper/date"
import { bdAdsPath, makeFullPath } from "../apis/api";

const cardHeight = {
    xl: 210,
    lg: 200,
    xmd: 185
}

export default function AdCard({key1, imageUrl, rent, address, beds, baths, gender, postedDate}) {

    return (
        <Card sx={{ display: 'flex', height: cardHeight, width: "70%",
            transition: 'transform 0.3s',
            '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.05)',
            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)',
            },
        }} onClick={() =>  window.open(makeFullPath(`${bdAdsPath}/${key1}`), '_blank') }>
            <CardMedia
                component="img"
                sx={{ width: "40%", height: cardHeight }}
                image={imageUrl}
                alt={`ad-card-${key1}`}
            />
            <CardContent sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "20px"} }>
                <PriceContent price={rent} address={address}/>
                <InfoContent noOfBeds={beds} noOfBaths={baths} gender={gender}/>
                <PostedDate date={postedDate}/>
            </CardContent>
        </Card>
    ) 
}

function PriceContent({price, address}){
    return (
        <Box>
            
            <Typography variant="h6" sx={{ marginBottom: "2px", color: "#4dd672", fontWeight: "bold" }} > Rs {price}  
                <Typography variant="caption"  >  per person, month </Typography> 
            </Typography>
            <Typography variant="caption"> {address} </Typography>
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
    const dateStr = useMemo(() => TimeDiffWithNow(date), [date])
    return (
        <Box sx={{ textAlign: "end"}}>
            <Typography variant="caption"> {dateStr} </Typography>
        </Box>
    )
}
