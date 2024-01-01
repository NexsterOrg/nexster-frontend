import { useState, useEffect } from "react";
import { Box, Avatar, Typography, Paper } from "@mui/material";
import ImageGrid from "./img_grid";
import { useNavigate, useParams } from 'react-router-dom';

import Base1 from "../layout/base1";
// import FriendsSuggSidePanel from "../friend/friends_sugg_side_panel";
import {GetProfileInfo, UnAuthorizedError, GetFriendCount, GetUserKeyByIndexNo, LoginPath} from "../../apis/fetch"

const engi = "Engineering"

// TODO: Add lenghts constraints
// lengths
// name: 30, fac/field: 42: 
// about: 

// TODO: Get current logged in user info to provide to component as necessary
function ProfileHeader({userId}){
    const [profInfo, setProfInfo] = useState({imgUrl:"", username: "", about: "", batch: "", facOrField: "", key: ""})
    const [friendCount, setFriendCount] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            if(userId === "") return 
            try {
                const res = await GetProfileInfo(userId)
                const res2 = await GetFriendCount(userId)
                let facOrField = res.faculty
                if(res.faculty === engi) facOrField = res.field || engi
                setProfInfo({imgUrl: res.img_url, username: res.username, about: res.about, batch: res.batch, facOrField: facOrField, key: res.key})
                setFriendCount(res2)
            } catch (err) {
                if (err instanceof UnAuthorizedError) {
                    navigate('/login', { replace: true });
                    return
                } 
                console.error('Error fetching posts:', err); // TODO : Remove this in production
            }
        })()
    }, [userId])

    return (
        <>
        <Box sx={styles.headerContainer}>
            <Avatar src={profInfo.imgUrl} aria-label={profInfo.username} sx={styles.avatar}/>
            <Paper sx={styles.textHeaderContainer} elevation={2}>
                <Typography variant="h6" sx={styles.name}> {profInfo.username} </Typography>
                <Typography> {profInfo.facOrField} </Typography>
                <Typography> {profInfo.batch} batch </Typography>
                <Typography variant="body2" sx={styles.friendCount}> {friendCount} Friends </Typography>
            </Paper>
        </Box>
        <Paper elevation={2} sx={styles.aboutContainer}>
             <Typography variant="h6" sx={styles.about}> About </Typography>
            <Box sx={styles.aboutParaContainer}>
                <Typography variant="body1" sx={styles.aboutPara}>
                    {profInfo.about}
                </Typography>
            </Box>
        </Paper>
        </>
    )
}

// TODO: When friend count is zero, no suggestions is for the users. (Need to get some default suggestions)
function ProfileSection({indexNo}){
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({key: "", isOwner: false}) // user of current viewing profile

    // TODO: Enable if needed
    // const {userid} =  useMemo(GetUserInfoFromLS, []) // owner id
    // if(userid === undefined){
    //     CleanLS()
    //     navigate(LoginPath, { replace: true });
    // }

    useEffect(() => {

        (async () => {
            try {
                let respData = await GetUserKeyByIndexNo(indexNo) // key, isOwner
                if(respData.key === ""){
                    navigate('/page-not-found', { replace: true });
                    return
                }
                setUserInfo(respData)
            } catch (err) {
                if (err instanceof UnAuthorizedError) {
                    navigate('/login', { replace: true });
                    return
                } 
                console.error("failed to get profile userInfo: ", err)
            }
        })()

    }, [])

    return (
        <Box sx={styles.profContainer}>
            <ProfileHeader userId={userInfo.key}/>
            <ImageGrid userId={userInfo.key} editEnabled={userInfo.isOwner}/>
            {/* <FriendsSuggSidePanel argStyle={styles.friendSuggPanel} userId={userid}/> */}
        </Box>
    )
}

// TODO: If index_no is not found, redirect to page not found (404)
export default function Profile(){
    const {indexNo} = useParams()
    return <Base1 styles={{alignItems: "center"}} SideComponent={ <ProfileSection indexNo={indexNo}/> }/>
}

const styles = {
    headerContainer : {
        display: "flex"
    },
    avatar: {
        width: 140,
        height: 140
    },
    textHeaderContainer: {
        padding: "18px", 
        marginLeft: "30px",
        width: "576px",
    },
    aboutContainer : {
        padding: "15px",
        marginY: "20px",
    },
    about: {
        fontWeight: "bold"
    },
    aboutParaContainer: { 
        width: "710px", height: "auto", overflow: "hidden" 
    },
    aboutPara: { 
        fontSize: "100%", overflow: "auto", whiteSpace: "pre-wrap", 
        wordWrap: "break-word", width: "100%" 
    },
    profContainer: {
        padding: "10px",
        width: "746px"
    },
    name: {
        fontWeight: "bold"
    },
    friendCount: {
        marginTop: "8px"
    },
    friendSuggPanel: {
        position: "fixed",
        top: "100px",
        right: 0
    }
}
