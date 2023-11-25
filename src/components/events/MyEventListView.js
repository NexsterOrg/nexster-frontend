import { useState } from "react";
import { Typography, Box } from "@mui/material";
import { SideEventListView } from "./EventListView"
import Base1 from "../layout/base1";
import { QuickEventNav } from "./QuickEventNav"
import EventCreationDialog  from "./EventCreationDialog"

export default function MyEventListView(){
    const [ isCreateEventOpen, setIsCreateEventOpen ] = useState(false)

    const completeComponent = <>
            <Box sx={{paddingLeft: "18px", paddingY: "14px"}}>
                <Typography variant="h5" sx={{ fontWeight: "bold"}}> My Events </Typography>
            </Box>
            <SideEventListView isMyEvents={true} />
            <EventCreationDialog isCreateEventOpen={isCreateEventOpen} setIsCreateEventOpen={setIsCreateEventOpen} />
            <QuickEventNav setCreateEventOpen={setIsCreateEventOpen}/>
        </>

    return <Base1 SideComponent={ completeComponent } />
}
