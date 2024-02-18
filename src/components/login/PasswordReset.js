import { useState, useMemo } from "react";
import { Stack, Typography, Paper, TextField, useTheme, Button, Link } from "@mui/material"
import MailIcon from '@mui/icons-material/Mail';

import { LoginPath, SendPasswordResetLinkFunc } from "../../apis/fetch"
import { IsValidEmailV1, IsValidEmailV2 } from "../../helper/common";
import { NoticeFooter } from "../layout/Footer";
import { BottomLeftSnackbar } from "../ui/snack_bar"
import { SaveLoading } from '../ui/LoadingComponents';

const validateEmail = (email) => {
    return IsValidEmailV1(email) || IsValidEmailV2(email)
}

const failedSend = "Failed to send the reset link to your email. Try again."

function SendPasswordResetLink() {
    const theme = useTheme();

    const [saveSpinner, startSaveSpinner] = useState(false)
    const [snackBarOpen, setSnackBarOpen] = useState(false)

    const [email, setEmail] = useState("")
    const [sendErr, setSendErr] = useState("")
    const [sendOk, setSendOk] = useState(false)

    const modeColor = theme.palette.mode === 'dark' ? 'white' : 'black' ;

    const isValid = validateEmail(email)

    const onChangeEmail = (e) => {
        const val = (e?.target?.value || "").toLowerCase()
        setEmail(val)
    }

    const onSendLink = async () => {
        if(!isValid) return

        startSaveSpinner(true)
        try {
            const isSucceeded = await SendPasswordResetLinkFunc(email)
            if(isSucceeded){
                setSendOk(true)
                startSaveSpinner(false)
                return;
            }

        } catch (error) {
        }
        startSaveSpinner(false)
        setSendErr(failedSend)
        setSnackBarOpen(true)
    }

    const snackInfo =  useMemo(() => sendErr === "" ? {level: "success", msg: "Password reset link sent"} : {level: "error", msg: sendErr}, [sendErr]) 


    if (sendOk) {
        return (
            <Stack justifyContent={"center"} alignItems={"center"} sx={{ height: "100%" }} spacing={3}>
                    <MailIcon fontSize="large"/>
                    <Typography> Password reset link has been sent to <b> {email} </b> <small> (might take a few minutes). </small> </Typography>
                    <Typography variant="body2"> Link will be expired in 10 min. Close this window. </Typography>
            </Stack>
        )
    }

    return (
        <Stack justifyContent={"center"} alignItems={"center"} sx={{ height: "100%", bgcolor: 'background.default' }} spacing={3}>

            {
                saveSpinner ? <SaveLoading label={"Sending..."}/> : 
                <>
                <Stack direction="row" color={modeColor} >
                    <Typography variant="h6"  > Get a Password Reset Link </Typography>
                </Stack>
                <Stack sx={{ width: "30%", color: modeColor }} spacing={4}>
                    <Paper sx={{ padding: "20px", display: "flex", alignItems: "center", flexDirection: "column" }} elevation={4}>
                        <Stack spacing={2} alignItems={"center"} sx={{ width: "60%", paddingTop: "25px", marginBottom: "30px"}}>
                            <TextField 
                                label="University email"
                                value={email}
                                fullWidth
                                onChange={onChangeEmail}
                                required
                            />

                            <Button variant="contained" onClick={onSendLink} disabled={!isValid} 
                                sx={{ textTransform: "none", width: "100px", bgcolor: "#35dbcb"}}> Send Link </Button> 
                        </Stack>

                        {
                            isValid ?  
                            <Typography variant="body2" sx={{ marginBottom: "30px", paddingX: "20px", textAlign: "center"}}> Password reset link will be sent to 
                            <b> {email} </b> </Typography> : null
        
                        }
                        <Stack direction={"row"} spacing={2}>
                            <Typography> Already have an account? </Typography>
                            <Link href={LoginPath} underline="hover" sx={{marginTop: "2px"}}> Login </Link>
                        </Stack>
                    </Paper>
                    <NoticeFooter />
                </Stack>
                </>
            }
            <BottomLeftSnackbar open={snackBarOpen}  setOpen={setSnackBarOpen} level={snackInfo.level} msg={snackInfo.msg}/>
        </Stack>
    )
}

export {
    SendPasswordResetLink
}
