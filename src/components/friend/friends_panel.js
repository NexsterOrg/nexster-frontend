import { Box } from "@mui/material";

import FriendReqsPanel from "./friend_req_panel";
import FriendSuggPanel from "./friends_sugg_panel";
import FriendsBase from "./friends_base";

const initReqCount = 3
const regReqCount = 1
const friendPanelSuggs = 9

export default function FriendsPanel(){

    const comp = <Box sx={{marginTop: "1%", marginLeft: "6%"}}>
        <FriendReqsPanel rootStyles={{marginBottom: "30px"}} showButton={true} initPageNo={1} 
        initPageSize={initReqCount} pageSize={regReqCount}/>
        <FriendSuggPanel rootStyles={{marginTop: "30px", marginBottom: "30px"}} showButton={true} pageSize={friendPanelSuggs}/>
    </Box>

    return <FriendsBase mainComponent={comp}/>
}
