import { useState, useMemo } from "react"
import { Stack, Typography, Paper, TextField, Button, Link} from "@mui/material"
import MailIcon from '@mui/icons-material/Mail';

import { BottomLeftSnackbar } from "../ui/snack_bar"
import { Delay, ValidateUniIndex } from "../../helper/common"
import { LoginPath, SendAccountCreationLink } from "../../apis/fetch"
import { SaveLoading } from '../ui/LoadingComponents';

const failedSend = "Failed to send the link to your email. Try again."

export default function UniIdentitySite(){

    const [saveSpinner, startSaveSpinner] = useState(false)
    const [snackBarOpen, setSnackBarOpen] = useState(false)

    const [index, setIndex] = useState("")
    const [indexErr, setIndexErr] = useState("")

    const [sendErr, setSendErr] = useState("")
    const [sendOk, setSendOk] = useState(false)

    const isIndexValid = ValidateUniIndex(index)

    const onChangeIndex = (e) => {
        const val = (e?.target?.value || "").toLowerCase()
        setIndex(val)
    }

    const sendLink = async () => {
        if(!isIndexValid) return

        startSaveSpinner(true)
        try {
            const isSucceeded = await SendAccountCreationLink(index)
            if(isSucceeded){
                setSendOk(true)
                startSaveSpinner(false)
                return;
            }

        } catch (error) {
            console.error("failed to send a link to email: ", error)   
        }
        startSaveSpinner(false)
        setSendErr(failedSend)
        setSnackBarOpen(true)
    }

    const snackInfo =  useMemo(() => sendErr === "" ? {level: "success", msg: "sent email"} : {level: "error", msg: sendErr}, [sendErr]) 

    if (sendOk) {
        return (
            <Stack justifyContent={"center"} alignItems={"center"} sx={{ height: "100%" }} spacing={3}>
                    <MailIcon fontSize="large"/>
                    <Typography> Account creation link has been sent to <b> {index}@uom.lk </b>. 
                        Use the link to create your Nexster account. </Typography>
                    <Typography variant="body2"> Link will be expired in 30 min. </Typography>
            </Stack>
        )
    }

    return (
        <Stack justifyContent={"center"} alignItems={"center"} sx={{ height: "100%" }} spacing={3}>

            {
               saveSpinner ? <SaveLoading label={"Sending..."}/> : 
            
            <>
            <Typography variant="h6"> Get account creation link </Typography>
            <Stack sx={{ width: "30%" }} spacing={4}>
                <Paper sx={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }} elevation={4}>
                    <Typography variant="subtitle1"> Enter your university index below : </Typography>
                    <Stack spacing={2} alignItems={"center"} sx={{ width: "100%", marginBottom: "18px" }}>
                        <TextField 
                            label="University index"
                            sx={{ width: "60%" }}
                            value={index}
                            onChange={onChangeIndex}
                            required
                            error={indexErr !== ""}
                            helperText={indexErr}
                        />

                        <Button variant="contained" disabled={!isIndexValid} onClick={sendLink}
                            sx={{ textTransform: "none", width: "100px", bgcolor: "#35dbcb"}}> Send Link </Button>
                    </Stack>

                    {
                        isIndexValid ?  
                        <Typography variant="body2" sx={{ marginBottom: "10px" }}> Account creation link will be sent to <b> {index}@uom.lk</b>. 
                        Use the link to create your Nexster account. </Typography> : null
    
                    }

                    <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                        <Typography> Already have an account? </Typography>
                        <Link href={LoginPath} target="_blank" underline="hover" sx={{marginTop: "2px"}}> Login </Link>
                    </Stack>
                </Paper>
                <Stack>
                    <Typography variant="caption"> Nexster is a private social network that provides tools to make students lives more productive. </Typography>
                </Stack>
            </Stack>
            </>
        }
            <BottomLeftSnackbar open={snackBarOpen}  setOpen={setSnackBarOpen} level={snackInfo.level} msg={snackInfo.msg}/>
        </Stack>
    )
}