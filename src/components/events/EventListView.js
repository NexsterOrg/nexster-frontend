import { useEffect, useState } from 'react';
import { List, ListItem } from '@mui/material'
import { useNavigate } from 'react-router-dom';


import EventCardView from "./EventCardView";
import Base1 from "../layout/base1";
import { ListEvents, UnAuthorizedError } from "../../apis/fetch";

const desc = `This is some introduction about the Abina. There are many variations of passages of Lorem Ipsum available, 
but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even .Read More ...`

const tt = "Introduction to cloud computing.  any variations of passages of Lorem Ipsum more some more"

// TODO: API resp body does not contain info about viewerLoveReaction or ViewerGoingReaction

function SideEventListView(){
    const navigate = useNavigate();

    const [events, addEvents] = useState({preLn: 0, data: []})

    useEffect(() => {
        window.scrollTo(0, 0);

        (async () => {
            try {
              let respBody = await ListEvents(1, 5);
              if (respBody.size === 0) {
                // setNoData(true)
                return;
              }
              addEvents({preLn: respBody.size, data: respBody.data});
            } catch (err) {
                if (err instanceof UnAuthorizedError) {
                    navigate('/login', { replace: true });
                    return
                } 
                console.error('Error fetching events:', err); // TODO : Remove this in production
            }
        })();
    }, [])

    return (
        <List style={{width: "80%"}}>
        {
            events.data.map( (each, index) => {
                let {key, indexNo, username} = each.postedBy || {}
                const ownerKey = arrangeParams(key, "")
                indexNo = arrangeParams(indexNo, "")
                username = arrangeParams(username, "")

                const noOfLove = each.love || 0
                const noOfGoing = each.going || 0

                const reaction = each.reaction || {}
                const reactionKey = reaction.key || ""
                let {love, going} = reaction

                love = arrangeParams(love, false)
                going = arrangeParams(going, false)

                return (                
                    <ListItem key={index}>
                        <EventCardView eventKey={each.key}  imgUrl={each.link} title={each.title} 
                            date={each.date} description={each.description} venue={each.venue} mode={each.mode} 
                            ownerKey={ownerKey} eventLink={each.eventLink}
                            username={username} indexNo={indexNo} noOfLove={noOfLove} noOfGoing={noOfGoing} reactionKey={reactionKey}
                            isViewerLove={love} isViewerGoing={going}
                        />
                    </ListItem>)
            })
        }
        </List>
    )
}

export default function EventListView(){
    return <Base1 SideComponent={<SideEventListView />} />
}

function arrangeParams(param, defaultVal) {
    return  param ? param : defaultVal
}