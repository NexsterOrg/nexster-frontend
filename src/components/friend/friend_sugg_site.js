import Base1 from "../layout/base1";
import FriendSuggPanel from "./friends_sugg_panel"

const suggsSitePageSize = 18

export default function FriendSuggsSite(){
    return <Base1 SideComponent={<FriendSuggPanel rootStyles={{margin: "30px"}} showButton={false} pageSize={suggsSitePageSize}/>} 
    styles={{alignItems: "flex-start"}}/>
}
