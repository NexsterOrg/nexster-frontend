import { Box, Avatar, Typography, Divider, Link } from "@mui/material";
import ListModel from "../ui/ListModel";
import { FmtUserInfo } from "../../helper/common";
import { MkUserProfilePageLink } from "../../apis/fetch";

const usernameLimit = 35
const facOrFieldLimit = 38

export function EventLoveReactionModel({open, setOpen, eventKey}){

    return (
        <ListModel open={open} setOpen={setOpen} eventKey={eventKey} reactType={"love"}/>
    )
}

export function EventGoingReactionModel({open, setOpen, eventKey}){

    return (
        <ListModel open={open} setOpen={setOpen} eventKey={eventKey} reactType={"going"}/>
    )
}

const linkFontSize = {
    xl: 15,
    lg: 14,
    xmd: 13,
    md: 10,
    sm: 8
}

export function UserReactionCard({imgUrl, name="", faculty="", field="", batch, indexNo}){
    const {username, facOrField} = FmtUserInfo(name, usernameLimit, faculty, field, facOrFieldLimit)

    return (
    <>
        <Box sx={{display:"flex", width: 500, padding: 1}}>
            <Box>
                <Avatar alt="prof-img" src={imgUrl} sx={{width: 60, height: 60}}/>
            </Box>
            <Box sx={{  paddingLeft: 2 }}>
                {/* <Typography variant="body2"> {username} </Typography> */}
                <Link href={MkUserProfilePageLink(indexNo)} target="_blank" underline="hover" sx={{fontSize: linkFontSize}}> {username} </Link>
                <Typography variant="caption" sx={{display: "block"}}> {facOrField} </Typography>
                <Typography variant="caption"> {batch} Batch </Typography>
            </Box>
        </Box>
        <Divider sx={{ width: 500 }}/>
    </>
    )
}
