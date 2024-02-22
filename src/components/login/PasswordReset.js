import { useState, useMemo, useEffect } from "react";
import { Stack, Typography, Paper, TextField, useTheme, Button, Link } from "@mui/material"
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate, useLocation } from 'react-router-dom';

import { LoginPath, SendPasswordResetLinkFunc, validatePasswordResetLink, resetPassword } from "../../apis/fetch"
import { Delay, IsValidEmailV1, IsValidEmailV2 } from "../../helper/common";
import { NoticeFooter } from "../layout/Footer";
import { BottomLeftSnackbar } from "../ui/snack_bar"
import { SaveLoading } from '../ui/LoadingComponents';
import PasswordField from "../ui/PasswordField"

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
                        <Stack direction={"row"} spacing={1}>
                            <Typography> Back to </Typography>
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

const resetOk = "Password successfully!. Redirecting to login page."
const resetFailed = "Password reset failed. Try again"

// password
const maxPasswordLn = 30
const minPasswordLn = 8

const passwdNotEnoughLenMsg = `Passwords must at least have ${minPasswordLn} characters.`
const bothPasswdNotSameMsg = "Both passwords should be same."

function PasswordResetSite() {
    const [urlValid, setUrlValid] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    const email = searchParams.get('email') || "";
    const expAt = searchParams.get('exp') || "";
    const hmac = searchParams.get('hmac') || "";

    useEffect( () => {
        (async () => {
            try {
              const isValid = await validatePasswordResetLink(email, expAt, hmac);
              if(isValid) {
                setUrlValid(true)
                return 
              }
            } catch (err) {
            }

            alert("Invalid password reset link. Get a new link")
            navigate(LoginPath, { replace: true });
            return;

        })();
    }, [])

    if(!urlValid){
        return <>Error...</>
    }

    return <PasswordResetComp email={email} exp={expAt} hmac={hmac}/>  
}


function PasswordResetComp({email, exp, hmac}) {
    const navigate = useNavigate();
    const theme = useTheme();

    const [saveSpinner, startSaveSpinner] = useState(false)
    const [snackBarOpen, setSnackBarOpen] = useState(false)

    const [password, setPassword] = useState("")
    const [ passwordErr, setPasswordErr ] = useState("")

    const [retypedPassword, setRetypedPassword] = useState("")
    const [ retypedPasswordErr, setRetypedPasswordErr ] = useState("")

    const [formErr, setFormErr] = useState("")

    const modeColor = theme.palette.mode === 'dark' ? 'white' : 'black' ;

    const isPasswdNotEmpty = password.length !== 0

    const passwdNotEnoughLen = isPasswdNotEmpty && password.length < 8

    const passwordsNotMatched = (isPasswdNotEmpty && retypedPassword !== "" && password !== retypedPassword)  // check whether passwords are matched or not.

    const snackInfo =  useMemo(() => formErr === "" ? {level: "success", msg: resetOk} : {level: "error", msg: formErr}, [formErr]) 

    const onResetButnClick = async () => {
        if( !isPasswdNotEmpty || retypedPassword.length === 0) {
            // passwords are not duly filled
            setFormErr("Please set a password")
            setSnackBarOpen(true)
            return
        }
        if(passwdNotEnoughLen){
            setFormErr(passwdNotEnoughLenMsg)
            setSnackBarOpen(true)
            return
        }

        if(passwordsNotMatched){
            setFormErr(bothPasswdNotSameMsg)
            setSnackBarOpen(true)
            return
        }

        startSaveSpinner(true)

        try {
            const isSucceeded = await resetPassword(email, exp, hmac, password)
            if(isSucceeded){
                setFormErr("")
                startSaveSpinner(false)
                alert(resetOk)
                navigate(LoginPath, { replace: true });
                return;
            }

        } catch (error) {
        }
        startSaveSpinner(false)
        setFormErr(resetFailed)
        setSnackBarOpen(true)
    }

    return (
            <Stack justifyContent={"center"} alignItems={"center"} sx={{ height: "100%", bgcolor: 'background.default' }} spacing={3}>

            {
                saveSpinner ? <SaveLoading label={"Saving..."}/> : 
                <>
                <Stack direction="row" color={modeColor} >
                    <Typography variant="h6"  > Password Reset </Typography>
                </Stack>
                <Stack sx={{ width: "35%", color: modeColor }} spacing={4}>
                    <Paper sx={{ padding: "20px", display: "flex", alignItems: "center", flexDirection: "column" }} elevation={4}>

                        <Stack justifyContent={"center"} alignItems={"center"} spacing={1}>
                            <PasswordField content={password} setContent={setPassword} textErr={passwordErr} setTextErr={setPasswordErr} 
                                    maxCount={maxPasswordLn} label={"Password*"} htmlId={"reset-passwd"} styles={{ width: "100%" }}/>
                            
                            <PasswordField content={retypedPassword} setContent={setRetypedPassword} textErr={retypedPasswordErr} styles={{ width: "100%" }} 
                                setTextErr={setRetypedPasswordErr} maxCount={maxPasswordLn} label={"Retype Password*"} htmlId={"reset-retypedpasswd"}/>
                            
                            {
                                passwdNotEnoughLen ?
                                <Typography sx={{ color: "red" }} variant="caption"> {passwdNotEnoughLenMsg} </Typography> : 
                                passwordsNotMatched ? 
                                <Typography sx={{ color: "red" }} variant="caption"> {bothPasswdNotSameMsg} </Typography> : null
                            }
                            

                            <Stack justifyContent={"center"} sx={{ paddingY: "20px" }}>
                                <Typography variant="body2"> * Password should be {minPasswordLn} to {maxPasswordLn} characters long </Typography>
                                <Typography variant="body2"> * Include a mix of uppercase and lowercase letters, numbers, and special characters. </Typography>
                            </Stack>

                            <Button variant="contained" onClick={onResetButnClick}
                                sx={{ textTransform: "none", width: "50%", bgcolor: "#35dbcb", fontWeight: "bold" }}> Reset Password </Button> 

                        </Stack>

                        <Stack direction={"row"} spacing={1} sx={{ marginTop: "40px"}}>
                            <Typography> Back to </Typography>
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

// onClick={onSendLink} disabled={!isValid} 

export {
    SendPasswordResetLink, PasswordResetSite
}
