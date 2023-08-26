import {useState, useEffect} from "react"
import { Box } from "@mui/material";

import Base1 from "../layout/base1";
import FriendReqsPanel from "./friend_req_panel";
import FriendSuggPanel from "./friends_sugg_panel";
import { ListFriendSuggs } from "../../apis/fetch"

const initReqCount = 3
const regReqCount = 1
const initSuggs = 8

function SideFriendsPanel(){

    const [initSuggList, addInitSuggToList] = useState([])
    const [initSuggCount, setInitSuggCount] = useState(0)

    useEffect(()=> {
        (async () => {
            try {
                const newSuggs = await ListFriendSuggs(1, initSuggs)

                addInitSuggToList(newSuggs.data)
                setInitSuggCount(newSuggs.resultsCount)
            } catch (err) {
                console.error(err)
            }
        })()
    }, []) 

    return (
        <Box sx={{marginTop: "1%", marginLeft: "6%"}}>
           <FriendReqsPanel rootStyles={{marginBottom: "30px"}} showButton={true} initPageNo={1} 
           initPageSize={initReqCount} pageSize={regReqCount}/>
           <FriendSuggPanel rootStyles={{marginTop: "30px", marginBottom: "30px"}} suggList={initSuggList} 
            suggCount={initSuggCount} showButton={true}/>
        </Box>
    )
}

export default function FriendsPanel(){

    return (
        <Base1 SideComponent={<SideFriendsPanel />} styles={{alignItems: "flex-start"}}/>
    )
}
