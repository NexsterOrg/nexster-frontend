import {useState, useEffect} from "react"
import { Box } from "@mui/material";

import Base1 from "../layout/base1";
import FriendReqsPanel from "./friend_req_panel";
import FriendSuggPanel from "./friends_sugg_panel";
import { ListFriendReqs, GetAllFriendReqsCount, ListFriendSuggs } from "../../apis/fetch"

const initReqCount = 3
const initSuggs = 8

function SideFriendsPanel(){
    const [initReqList, addInitReqToList] = useState([])
    const [totalReqCount, setTotalReqCount] = useState(0)

    const [initSuggList, addInitSuggToList] = useState([])
    const [initSuggCount, setInitSuggCount] = useState(0)

    useEffect(()=> {
        (async () => {
            try {
                const newReqs = await ListFriendReqs(1, initReqCount)
                const allReqsCount = await GetAllFriendReqsCount()
                const newSuggs = await ListFriendSuggs(1, initSuggs)
                
                addInitReqToList(newReqs.data)
                setTotalReqCount(allReqsCount)

                addInitSuggToList(newSuggs.data)
                setInitSuggCount(newSuggs.resultsCount)
            } catch (err) {
                console.error(err)
            }
        })()
    }, [])

    return (
        <Box sx={{marginTop: "1%", marginLeft: "6%"}}>
           <FriendReqsPanel rootStyles={{marginBottom: "30px"}} reqList={initReqList} 
            reqCount={totalReqCount} showButton={true}/>
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
