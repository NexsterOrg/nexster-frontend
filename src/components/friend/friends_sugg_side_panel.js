import React, {useState, useEffect} from "react";
import { Stack, Typography, List, ListItem, useTheme} from "@mui/material";
import ProfileCard from "../user/profile_card";
import {MkFriendSuggUrl, fetchData} from "../../apis/fetch"

const Undergrad = " Undergraduate"
const engi = "Engineering"
const milieForYear = 31557600000
const userKey = "482191"

export default function FriendsSuggSidePanel({argStyle}){
    const theme = useTheme();
    const [suggFriends, setSuggFriends] = useState([])

    const isDarkMode = theme.palette.mode === 'dark';

    useEffect(() => {
        (async () => {
            try {
                let results = await fetchData(MkFriendSuggUrl(userKey, "", 3))
                setSuggFriends(results.data)
            } catch (err) {
                console.error(err)
            }
        })();
    }, [])

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
                    <ListItem>
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
