import { useEffect, useState } from 'react';
import { List, ListItem , Card, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

import EventCardView from "./EventCardView";
import Base1 from "../layout/base1";
import { ListEvents, UnAuthorizedError, LoginPath } from "../../apis/fetch";
import { QuickEventNav } from "./QuickEventNav"
import EventCreationDialog  from "./EventCreationDialog"

const eventsPerFetch = 5
const gap = 330
let limit = 0

const noEventAllUsersShowMsg = "No Upcoming Events. But Stay Tuned!"
const noMyEventsShowMsg = "No Event Yet? Let's Create One"

export function SideEventListView({isMyEvents}){
    const navigate = useNavigate();

    const [events, addEvents] = useState([])
    const [noOfEvents, setNoOfEvents] = useState(0)
    const [pageNo, setPageNo] = useState(1)

    useEffect(() => {
        window.scrollTo(0, 0);

        (async () => {
            if(pageNo <= 0) return
            try {
              let newEvents = await ListEvents(pageNo, eventsPerFetch, isMyEvents);
              addEvents(newEvents.data);
              setNoOfEvents(newEvents.size)
              if (newEvents.size < eventsPerFetch) {
                setPageNo(-1)
                return;
              }
              setPageNo(2)
            } catch (err) {
                if (err instanceof UnAuthorizedError) {
                    navigate(LoginPath, { replace: true });
                    return
                } 
                console.error('Error fetching events:', err); // TODO : Remove this in production
            }
        })();
    }, [])

    useEffect(() => {
        if(pageNo <= 0) return
        const handleEventsScroll = async () => {
            if(window.scrollY >= limit){
                limit += gap
                if(pageNo <= 0) return
                try {
                    let newEvents = await ListEvents(pageNo, eventsPerFetch, isMyEvents);
                    addEvents(preList => preList.concat(newEvents.data));
                    setNoOfEvents(preVal => preVal + newEvents.size)
                    if (newEvents.size < eventsPerFetch) {
                      setPageNo(-1)
                      return;
                    }
                    setPageNo(preVal => preVal + 1)
                } catch (err) {
                    if (err instanceof UnAuthorizedError) {
                        navigate(LoginPath, { replace: true });
                        return
                    }
                    console.error("scroll events list: ", err)
                }
            }
        }

        window.addEventListener('scroll', handleEventsScroll)

        // do the cleanup
        return () => {
          window.removeEventListener('scroll', handleEventsScroll);
        };

    }, [events])

    return (
        <List style={{width: "80%"}}>
        {
            noOfEvents === 0 ? 

            <Card sx={styles.noElementCard} spacing={1}> 
                <Typography> { isMyEvents ? noMyEventsShowMsg : noEventAllUsersShowMsg } </Typography>
            </Card>
            :
            events.map( (each, index) => {
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
                            ownerKey={ownerKey} eventLink={each.eventLink} permission={each.perm}
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
    const [ isCreateEventOpen, setIsCreateEventOpen ] = useState(false)

    const completeComponent = <>
            <SideEventListView isMyEvents={false}/>
            <EventCreationDialog isCreateEventOpen={isCreateEventOpen} setIsCreateEventOpen={setIsCreateEventOpen} />
            <QuickEventNav setCreateEventOpen={setIsCreateEventOpen}/>
        </>

    return <Base1 SideComponent={ completeComponent } />
}

function arrangeParams(param, defaultVal) {
    return  param ? param : defaultVal
}

const styles  = {
    noElementCard: {
        width: "870px", height: "100px", borderRadius: "10px", paddingLeft: "25px", 
        display: "flex", alignItems: "center", justifyContent:"center", marginY: "30px", marginX: "30px"
    },
}