import React from "react";
import { Stack, Typography, List, ListItem, useTheme} from "@mui/material";
import ProfileCard from "../user/profile_card";

const suggFriends = [
    {
        username : "Namal Sanjaya Fernando",
        field : "Electronic & Telecommunication Engineering",
        year : "4th",
        imgUrl : "https://picsum.photos/id/58/100/100",
    },
    {
        username : "Alexandra Johns",
        field : "Medical Undergraduate",
        year : "2nd",
        imgUrl : "https://picsum.photos/id/64/100/100",
    },
    {
        username : "Rebeca Kelly",
        field : "IT Undergraduate",
        year : "1st",
        imgUrl : "https://picsum.photos/id/65/100/100",
    }
]

export default function FriendsSuggSidePanel({argStyle}){
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Stack sx={[styles.container, argStyle]}>
            <Typography sx={[styles.text, {color: isDarkMode ? 'white' : 'black'}]}> 
                Suggested for you</Typography>
            <List>
            {
                suggFriends.map((each) => {
                    return (
                    <ListItem>
                        <ProfileCard username={each.username} facOrField={each.field} 
                            imgUrl={each.imgUrl} year={each.year} isReqted={false}/>
                    </ListItem>
                    )
                })
            }
            </List>
        </Stack>
    )
}

const styles = {
    container: {
        width: "280px"
    },
    text: {
        marginLeft: "5%",
        marginTop: "4%",
        fontWeight: "bold"
    }
}
