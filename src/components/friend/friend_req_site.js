import FriendReqsPanel from "./friend_req_panel"
import Base1 from "../layout/base1";

const reqCountPerFetch = 15

function SideFriendReqSite(){

    return (
        <FriendReqsPanel rootStyles={{margin: "30px"}} showButton={false} initPageNo={1} initPageSize={reqCountPerFetch} pageSize={reqCountPerFetch}/>
    )
}

export default function FriendReqSite(){
    return <Base1 SideComponent={<SideFriendReqSite />} styles={{alignItems: "flex-start"}}/>
}
