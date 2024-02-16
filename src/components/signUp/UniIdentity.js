import { useState, useMemo } from "react"
import { Stack, Typography, Paper, TextField, Button, Link, useTheme} from "@mui/material"
import MailIcon from '@mui/icons-material/Mail';

import { BottomLeftSnackbar } from "../ui/snack_bar"
import { ValidateUniIndex, IsValidEmailV1, IsValidEmailV2 } from "../../helper/common"
import { LoginPath, SendAccountCreationLink } from "../../apis/fetch"
import { SaveLoading } from '../ui/LoadingComponents';

const failedSend = "Failed to send the link to your email. Try again."

const validateInputs = (indexNo, email) => {
    return ValidateUniIndex(indexNo) && ( IsValidEmailV1(email) || IsValidEmailV2(email) )
}

export default function UniIdentitySite(){
    const theme = useTheme();

    const [saveSpinner, startSaveSpinner] = useState(false)
    const [snackBarOpen, setSnackBarOpen] = useState(false)

    const [index, setIndex] = useState("")
    const [indexErr, setIndexErr] = useState("")

    const [email, setEmail] = useState("")
    const [emailErr, setEmailErr] = useState("")

    const [sendErr, setSendErr] = useState("")
    const [sendOk, setSendOk] = useState(false)

    const isValid = validateInputs(index, email)

    const modeColor = theme.palette.mode === 'dark' ? 'white' : 'black' ;

    const onChangeIndex = (e) => {
        const val = (e?.target?.value || "").toLowerCase()
        setIndex(val)
    }

    const onChangeEmail = (e) => {
        const val = (e?.target?.value || "").toLowerCase()
        setEmail(val)
    }

    const sendLink = async () => {
        if(!isValid) return

        startSaveSpinner(true)
        try {
            const isSucceeded = await SendAccountCreationLink(index, email)
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

    const snackInfo =  useMemo(() => sendErr === "" ? {level: "success", msg: "sent email"} : {level: "error", msg: sendErr}, [sendErr]) 

    if (sendOk) {
        return (
            <Stack justifyContent={"center"} alignItems={"center"} sx={{ height: "100%" }} spacing={3}>
                    <MailIcon fontSize="large"/>
                    <Typography> Account creation link has been sent to <b> {email} </b> <small> (might take a few minutes). </small>
                        Use the link to create your Nexster account. </Typography>

                    <Typography variant="body2"> Link will be expired in 30 min. </Typography>
            </Stack>
        )
    }

    return (
        <Stack justifyContent={"center"} alignItems={"center"} sx={{ height: "100%",  bgcolor: 'background.default' }} spacing={3}>

            {
               saveSpinner ? <SaveLoading label={"Sending..."}/> : 
            
            <>
            <Typography variant="h6" color={modeColor}> Get an account creation link </Typography>
            <Stack sx={{ width: "30%", color: modeColor }} spacing={4}>
                <Paper sx={{ paddingBottom: "30px", display: "flex", flexDirection: "column", gap: "20px", paddingTop: "40px" }} elevation={4}>
                    {/* <Typography variant="subtitle1"> Enter your university index below : </Typography> */}
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

                        <TextField 
                            label="University email"
                            sx={{ width: "60%" }}
                            value={email}
                            onChange={onChangeEmail}
                            required
                            error={emailErr !== ""}
                            helperText={emailErr}
                        />

                        <Button variant="contained" disabled={!isValid} onClick={sendLink}
                            sx={{ textTransform: "none", width: "100px", bgcolor: "#35dbcb"}}> Send Link </Button>
                    </Stack>

                    {
                        isValid ?  
                        <Typography variant="body2" sx={{ marginBottom: "10px", paddingX: "20px"}}> Account creation link will be sent to <b> {email} </b>. 
                        Use the link to create your Nexster account. </Typography> : null
    
                    }

                    <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                        <Typography> Already have an account? </Typography>
                        <Link href={LoginPath} target="_blank" underline="hover" sx={{marginTop: "2px"}}> Login </Link>
                    </Stack>
                </Paper>
                <Stack>
                    <Typography variant="caption"> Nexster is a student networking platform that provides solutions for university students's needs. 
                    Only for students at the University of Moratuwa. </Typography>
                </Stack>
            </Stack>
            </>
        }
            <BottomLeftSnackbar open={snackBarOpen}  setOpen={setSnackBarOpen} level={snackInfo.level} msg={snackInfo.msg}/>
        </Stack>
    )
}
