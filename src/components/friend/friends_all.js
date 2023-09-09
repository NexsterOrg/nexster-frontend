import { useState, useEffect } from "react";
import { Avatar, Typography, Box, Divider, Paper, Button, Card } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import {RemoveFriendship, UnAuthorizedError, LoginPath, ListMyFriends, FriendsRoute} from "../../apis/fetch"
import MenuButton from "../ui/menu_button"
import { GenUniqueKeyForList, FmtUserInfo } from "../../helper/common";
import { BottomRightSnackbar } from "../ui/snack_bar";
import FriendsBase from "./friends_base";

const question = "Are you sure?"
const nameLimit = 30
const facOrFieldLimit = 45
const friendsCountPerPg = 18
const gap = 330
let limit = 0

export default function AllFriendsSite({rootStyles}){
    const [snackOpen, setSnackOpen] = useState(false)
    const [snackState, setSnackState] = useState({"level": "success", "msg": ""})
    const [friendList, addFriendsToList] = useState([])
    const [totaFriendCount, setTotalFriendCount] = useState(0)
    const [pageNo, setPageNo] = useState(1)
    const navigate = useNavigate();

    const backHandler = () => {
        navigate(FriendsRoute);
    }

    const onFriendRemove = () => {
        setTotalFriendCount(preVal => preVal - 1)
    }

    useEffect(() => {
        window.scrollTo(0, 0);

        (async () => {
            if(pageNo <= 0) return
            try {
                const newFriends = await ListMyFriends(pageNo, friendsCountPerPg)
                addFriendsToList(newFriends.data)
                setTotalFriendCount(newFriends.total)
                if(newFriends.size < friendsCountPerPg){
                    setPageNo(-1)
                    return
                }
                setPageNo(2)
            } catch (err) {
                if (err instanceof UnAuthorizedError) {
                    navigate(LoginPath, { replace: true });
                    return
                }
                console.error("failed to list friends", err)   // TODO: consider creating different page with error info.
            }
        })()

    }, [])

    useEffect(() => {
        const handleAllFriendsScroll = async () => {
            if(window.scrollY >= limit){
                limit += gap
                if(pageNo <= 0){
                    // we make pageNo to -1 if nothing to there to fetch
                    return
                }
                try {
                    const newFriends = await ListMyFriends(pageNo, friendsCountPerPg)
                    addFriendsToList(preList => preList.concat(newFriends.data))
                    setTotalFriendCount(newFriends.total)
                    if(newFriends.size < friendsCountPerPg){
                        setPageNo(-1)
                        return
                    }
                    setPageNo(preVal => preVal + 1)
                } catch (err) {
                    if (err instanceof UnAuthorizedError) {
                        navigate(LoginPath, { replace: true });
                        return
                    }
                    console.error("scroll friend list: ", err)
                }
            }
        }

        window.addEventListener('scroll', handleAllFriendsScroll)

        // do the cleanup
        return () => {
          window.removeEventListener('scroll', handleAllFriendsScroll);
        };

    }, [friendList])

    if (totaFriendCount === 0) {
        return <FriendsBase mainComponent={
        <>
            <Button disableRipple sx={styles.butn} startIcon={<ArrowBackIcon />} onClick={backHandler}>Back to Friends</Button>
            <Card sx={[{width: "870px", height: "100px", borderRadius: "10px", paddingLeft: "25px", display: "flex", alignItems: "center", justifyContent:"center"}, rootStyles]} spacing={1}>
                <Typography> No friends in your list </Typography>
            </Card>
        </>
    }/>
    }

    const comp =
    <>
        <Button disableRipple sx={styles.butn} startIcon={<ArrowBackIcon />} onClick={backHandler}>Back to Friends</Button>
        <Paper  sx={[{width: "720px", paddingLeft: "8px"}, rootStyles]}>
            <Typography variant="h5" sx={{padding: "10px"}}> Your Friend List ({totaFriendCount}) </Typography>
            <Divider sx={{width: "700px"}}/>
        {
            friendList.map((each, index)=> {
                const {username, facOrField} = FmtUserInfo(each.name, nameLimit, each.faculty, each.field, facOrFieldLimit)
                return (
                    <FriendProfileCard key={GenUniqueKeyForList(index, each.user_id)} userId={each.user_id} newUsername={username} newFacField={facOrField}
                    batch={each.batch} imgUrl={each.image_url} setSnackState={setSnackState} setSnackOpen={setSnackOpen} onRemove={onFriendRemove}/>
                )
            })
        }
        <BottomRightSnackbar open={snackOpen} setOpen={setSnackOpen} level={snackState.level} msg={snackState.msg}/>
        </Paper>
    </>

    return <FriendsBase mainComponent={comp}/>
}

function FriendProfileCard({userId, newUsername, newFacField, batch, imgUrl, setSnackState, setSnackOpen, onRemove}){
    const navigate = useNavigate();
    const [userKey, setUserKey] = useState(userId)
    let content = `Pressing 'Yes' will remove ${newUsername} from your friend list. Press 'No' to cancel the action.`
    const onYes = async () => {
        try {
            const isSucc = await RemoveFriendship(userKey)
            if(!isSucc){
                setSnackOpen(true)
                setSnackState({"level": "error", "msg": `Failed to remove friendship with ${newUsername}.`})
                return false
            }
            setSnackOpen(true)
            setSnackState({"level": "success", "msg": `Successfully remove the friendship with ${newUsername}.`})
            onRemove()
            setUserKey("")
            return true
          } catch (err) {
              if (err instanceof UnAuthorizedError) {
                navigate(LoginPath, { replace: true });
                return false
              }
              setSnackOpen(true)
              setSnackState({"level": "error", "msg": "Something went wrong."})
          }
          return false
    }
    if (userKey === "") return null

    return (
        <>
        <Box sx={{width: "700px", display: "flex", justifyContent: "space-between", marginBottom: "2px"}}>
            <Box sx={{display:"flex"}}>
                <Avatar alt="prof-img" src={imgUrl} sx={{width: 90, height: 90, marginY: "10px", marginLeft: "10px"}}/>
                <Box sx={{marginTop: "19px", marginLeft: "15px"}}>
                    <Typography variant="body1"> {newUsername} </Typography>
                    <Typography variant="body2"> {newFacField} </Typography>
                    <Typography variant="body2"> {batch} Batch </Typography>
                </Box>
            </Box>
            <Box sx={{display: "flex", alignItems: "center", marginLeft: "50px"}}>
                    <MenuButton content={content} question={question} onYes={onYes} onNo={() => {}}/>
            </Box>
        </Box>
        <Divider sx={{width: "700px"}}/>
        </>
    )
}

const styles = {
    butn: {
        marginTop: "30px", marginLeft: "30px", textTransform: "none"
    }
}
