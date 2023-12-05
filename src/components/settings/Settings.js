import Base1 from "../layout/base1"
import { Stack } from "@mui/material"
import { EditProfile } from "./EditProfile"

// side setting contains : Edit Profile, Reset password, Delete Account
function SideSettings() {

    return (
        <Stack>
            <EditProfile
            initFirstName={"namal"}
            initSecondName={"sanjaya"} 
            initAbout={"I like to learn things in depth."} 
            initFaculty={"engineering"} 
            initField={"entc"} 
            initBatch={"18"} 
            initGender={"male"} 
            initBirthday={"1998-12-22"}    
        />

        </Stack>
    )
}

export default function SettingSite() {


    return <Base1 SideComponent={ <SideSettings /> } />
}
