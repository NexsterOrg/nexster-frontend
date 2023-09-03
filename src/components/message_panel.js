import React from "react";

import Base1 from "./layout/base1";

function SideMsgPanel(){
    return (
        <div>
            <p> Hi chatting space ..</p>
        </div>
    )
}

export default function MsgPanel(){

    return (
        <Base1 SideComponent={<SideMsgPanel />} styles={{alignItems: "center"}}/>
    )
}
