import Base1 from "../layout/base1";
import EventCardView from "./EventCardView";
import { List, ListItem } from '@mui/material'

const desc = `This is some introduction about the Abina. There are many variations of passages of Lorem Ipsum available, 
but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even .Read More ...`

const tt = "Introduction to cloud computing.  any variations of passages of Lorem Ipsum more some more"

// TODO: API resp body does not contain info about viewerLoveReaction or ViewerGoingReaction

function SideEventListView(){
    return (
        <List style={{width: "80%"}}>
        {
            [1,2,3,4,5].map( (each, index) => (
                <ListItem key={index}>
                    <EventCardView eventKey="70f8d2f5-3b40-48c5-a2d1-bfabbe2a83a5"  imgUrl="" title={tt} 
                        date="2023-10-14T13:00:00.000Z" 
                        description={desc} venue="" mode="online" ownerKey="482191" eventLink={"https://online.nexster.com/meet/348139480"}
                        username="Namal Sanjaya" indexNo="180102f" noOfLove={28} noOfGoing={8} reactionKey="1850621"
                        isViewerLove={false} isViewerGoing={false}
                    />
                </ListItem>
            ))
        }
        </List>
    )
}

export default function EventListView(){
    return <Base1 SideComponent={<SideEventListView />} />
}
