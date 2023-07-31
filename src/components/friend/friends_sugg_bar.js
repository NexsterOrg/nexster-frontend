import React from "react";
import ProfileCard from "../user/profile_card";

export default function FriendSuggBar(){

    let username = "Namal Sanjaya Fernando"
    let field = "Electronic & Telecommunication Engineering"
    let year = 4
    let imgUrl = "https://picsum.photos/id/58/100/100"

    return <ProfileCard username={username} facOrField={field} 
    imgUrl={imgUrl} year={year} isReqted={false}/>
}
