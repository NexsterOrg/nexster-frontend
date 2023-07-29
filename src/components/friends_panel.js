import React from "react";

import Base1 from "./layout/base1";

function SideFriendsPanel(){
    return (
        <div>
            <p> Hi Friends ..</p>
        </div>
    )
}

export default function FriendsPanel(){

    return (
        <Base1 SideComponent={<SideFriendsPanel />}/>
    )
}
