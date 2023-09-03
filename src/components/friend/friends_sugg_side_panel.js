import React, {useState, useEffect} from "react";
import { Stack, Typography, List, ListItem, useTheme} from "@mui/material";
import { useNavigate } from 'react-router-dom';

import ProfileCard from "../user/profile_card";
import {ListFriendSuggs, UnAuthorizedError, LoginPath} from "../../apis/fetch"

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
                let results = await ListFriendSuggs(1, 3)
                setSuggFriends(results.data)
            } catch (err) {
                if (err instanceof UnAuthorizedError) {
                    navigate(LoginPath, { replace: true });
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
                        <ProfileCard username={each.username} facOrField={facOrField} isFriend={false}
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

// TODO: friend state need to be passed with `ProfileCard` component.
