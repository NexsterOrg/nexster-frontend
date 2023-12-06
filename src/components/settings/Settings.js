import { useEffect, useState, useMemo } from "react"
import Base1 from "../layout/base1"
import { Stack } from "@mui/material"
import { useNavigate } from 'react-router-dom';

import { EditProfile } from "./EditProfile"
import { GetProfileInfo, UnAuthorizedError, LoginPath } from "../../apis/fetch"
import { GetUserInfoFromLS } from "../../apis/store";

// side setting contains : Edit Profile, Reset password, Delete Account
function SideSettings({userId}) {
    const navigate = useNavigate();
    const [ userInfo, setUserInfo ] = useState({
        key: "",
        firstName: "",
        secondName: "",
        about: "",
        batch: "",
        faculty: "",
        field: "",
        gender: "",
        birthday: ""
    })

    useEffect( () => {

        (async () => {
            try {
              let info = await GetProfileInfo(userId);
              setUserInfo(info);
            } catch (err) {
                if (err instanceof UnAuthorizedError) {
                    navigate(LoginPath, { replace: true });
                    return
                } 
                console.error('Error fetching user profile info:', err); // TODO : Remove this in production
            }
        })();

    }, [])

    if(!userInfo.key) {
        return <> Loading... </>
    }

    return (
        <Stack>
            <EditProfile
                userId={userInfo.key}
                initFirstName={userInfo.firstName}
                initSecondName={userInfo.secondName} 
                initAbout={userInfo.about} 
                initFaculty={userInfo.faculty} 
                initField={userInfo.field} 
                initBatch={userInfo.batch} 
                initGender={userInfo.gender} 
                initBirthday={userInfo.birthday}    
            />

        </Stack>
    )
}

export default function SettingSite() {
    const { userid } = useMemo(GetUserInfoFromLS, [])

    if(!userid) {
        return <div> Error Occuired. Log into the system again. </div>
    }

    return <Base1 SideComponent={ <SideSettings userId={userid}/> } />
}
