import React, {useState, useEffect} from "react";
import { Stack, Typography, List, ListItem, useTheme} from "@mui/material";
import ProfileCard from "../user/profile_card";
import { useNavigate } from 'react-router-dom';

import {ListFriendSuggs, UnAuthorizedError} from "../../apis/fetch"

const Undergrad = " Undergraduate"
const engi = "Engineering"

export default function FriendsSuggSidePanel({argStyle, userId}){
    const theme = useTheme();
    const [suggFriends, setSuggFriends] = useState([])
    const navigate = useNavigate();

    const isDarkMode = theme.palette.mode === 'dark';

    useEffect(() => {
        (async () => {
            try {
                let results = await ListFriendSuggs(userId, "", 3)
                setSuggFriends(results)
            } catch (err) {
                if (err instanceof UnAuthorizedError) {
                    navigate('/login', { replace: true });
                    return
                } 
                console.error('Error fetching posts:', err); // TODO : Remove this in production
            }
        })();
    }, [userId])

    return (
        <Stack sx={[styles.container, argStyle]}>
            <Typography sx={[styles.text, {color: isDarkMode ? 'white' : 'black'}]}> 
                Suggested for you</Typography>
            <List>
            {
                suggFriends.map((each) => {
                    let facOrField = each.faculty +  Undergrad
                    if (each.faculty == engi) {
                        facOrField = each.field 
                    }

                    return (
                    <ListItem key={each.key}>
                        <ProfileCard username={each.username} facOrField={facOrField} 
                            imgUrl={each.image_url} batch={each.batch} isReqted={false}/>
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
