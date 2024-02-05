import { useState, useMemo } from "react"
import { Stack, Button, Typography, Link, Paper, useTheme, useMediaQuery } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import { TextFieldWithCount, TypedTextFieldWithCount } from "../../components/ui/TextComponents";
import PasswordField from "../../components/ui/PasswordField";

import {bdLoginPath, CreateBdOwner, afterBdOwnerRegPath } from "../apis/api"
import { SaveLoading } from "../../components/ui/LoadingComponents";
import { BottomLeftSnackbar } from "../../components/ui/snack_bar";

const nameMaxCount = 50
const phoneNoMaxCount = 10
const addressMaxCount = 200
const maxPasswordLn = 30
const minPasswordLn = 8

const createdOk = "Account creation request submitted. You'll be notified upon approval."
const passwdNotEnoughLenMsg = `Passwords must at least have ${minPasswordLn} characters.`
const bothPasswdNotSameMsg = "Both passwords should be same."
const cantEmpty = "Field cannot be empty"
const createFailed = "Account creation failed. Please try again."

export default function BdOwnerAccountCreation(){
    const theme = useTheme();
    const navigate = useNavigate();

    const isSmall = useMediaQuery('(max-width:700px)');
    const isMedium = useMediaQuery('(min-width:701px) and (max-width:1200px)');
    // const isLargeScreen = useMediaQuery('(min-width:1201px)');

    const panelSize = isSmall ? "85%" : isMedium ? "50%": "30%"

    const [saveSpinner, startSaveSpinner] = useState(false)
    const [snackBarOpen, setSnackBarOpen] = useState(false)

    const [name, setName] = useState("")
    const [nameErr, setNameErr] = useState("")

    const [phoneNo, setPhoneNo] = useState("")
    const [phoneNoErr, setPhoneNoErr] = useState("")

    const [address, setAddress] = useState("")
    const [addressErr, setAddressErr] = useState("")

    const [password, setPassword] = useState("")
    const [passwordErr, setPasswordErr] = useState("")

    const [retypedPassword, setRetypedPassword] = useState("")
    const [retypedPasswordErr, setRetypedPasswordErr] = useState("")

    const [formErr, setFormErr] = useState("")

    const modeColor = theme.palette.mode === 'dark' ? 'white' : 'black' ;

    const isPasswdNotEmpty = password.length !== 0
    const passwdNotEnoughLen = isPasswdNotEmpty && password.length < 8
    const passwordsNotMatched = (isPasswdNotEmpty && retypedPassword !== "" && password !== retypedPassword)  

    const onCreate = async () => { 
        if(name === ""){
            setNameErr(cantEmpty)
            return
        }
        if(phoneNo.length !== phoneNoMaxCount){
            setPhoneNoErr(`Phone number has to be ${phoneNoMaxCount} digits long.`)
            return
        }
        if(address === ""){
            setAddressErr(cantEmpty)
            return
        }

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

        // write rest to send api call and so on.
        startSaveSpinner(true)

        try   {
            const isSucceeded = await CreateBdOwner(name, phoneNo, password, address)
            if(isSucceeded){
                // ok - direct to login page
                setFormErr("")
                startSaveSpinner(false)
                alert(createdOk)
                navigate(afterBdOwnerRegPath, { replace: true });
                return
            }
            setFormErr(createFailed)
            setSnackBarOpen(true)
        }
        catch(err){
            setFormErr(createFailed)
            setSnackBarOpen(true)
        }
        startSaveSpinner(false)
    }

    const snackInfo =  useMemo(() => formErr === "" ? {level: "success", msg: createdOk} : {level: "error", msg: formErr}, [formErr]) 

    return (
        <Stack justifyContent={"center"} alignItems={"center"} sx={{ height: "100%", bgcolor: 'background.default' }} spacing={3}>

            {
                saveSpinner ? <SaveLoading rootStyles={{marginTop: 10}} label={"Creating..."}/>  :
               <>
                <BdSignUpHeader modeColor={modeColor}/>
                <Stack sx={{ width: panelSize, color: modeColor }} spacing={4}>
                    <Paper sx={{ padding: "20px", display: "flex", alignItems: "center", flexDirection: "column" }} elevation={4}>
                        <Stack spacing={2} alignItems={"center"} sx={{ width: "280px" , paddingTop: "25px", marginBottom: "60px"}}>

                            <TextFieldWithCount content={name} setContent={setName} textErr={nameErr} setTextErr={setNameErr} variant="outlined" 
                                textFieldStyles={{ width: "240px" }} maxCount={nameMaxCount} required={true} multiline={false} label={"Name"} maxRows={1} />

                            <TypedTextFieldWithCount content={phoneNo} setContent={setPhoneNo} textErr={phoneNoErr} setTextErr={setPhoneNoErr} variant="outlined" 
                                type={"number"} textFieldStyles={{ width: "240px" }} maxCount={phoneNoMaxCount} required={true} label={"Phone No"} />
                            
                            
                            <TextFieldWithCount content={address} setContent={setAddress} textErr={addressErr} setTextErr={setAddressErr} variant="outlined" 
                                textFieldStyles={{ width: "235px" }} maxCount={addressMaxCount} required={true} multiline={true} label={"Address"} maxRows={5} />

                            <PasswordField content={password} setContent={setPassword} textErr={passwordErr} setTextErr={setPasswordErr} 
                                maxCount={maxPasswordLn} label={"Password*"} htmlId={"bdOwner-reg-new-passwd"}
                            />
                        
                            <PasswordField content={retypedPassword} setContent={setRetypedPassword} textErr={retypedPasswordErr} 
                                setTextErr={setRetypedPasswordErr} maxCount={maxPasswordLn} label={"Retype Password*"} htmlId={"bdOwner-reg-confirm-passwd"}/>

                            {
                                passwdNotEnoughLen ?
                                    <Typography sx={{ color: "red" }} variant="caption"> {passwdNotEnoughLenMsg} </Typography> : 
                                    passwordsNotMatched ? 
                                    <Typography sx={{ color: "red" }} variant="caption"> {bothPasswdNotSameMsg} </Typography> : null
                            }

                            <Button variant="contained" onClick={onCreate}
                                sx={{ textTransform: "none", width: "100px", bgcolor: "#35dbcb"}}> Create </Button> 
                        </Stack>

                        <Stack direction={"row"} spacing={2}>
                            <Typography> Already have an account? </Typography>
                            <Link href={bdLoginPath} underline="hover" sx={{marginTop: "2px"}}> Log in </Link>
                        </Stack>
                    </Paper>
                    <Stack>
                        <Typography variant="caption"> Nexster BoardingFinder is an online place to find 
                            boarding places for university students.</Typography>
                    </Stack>
                </Stack>
                </>
            }
            <BottomLeftSnackbar open={snackBarOpen}  setOpen={setSnackBarOpen} level={snackInfo.level} msg={snackInfo.msg}/>
        </Stack>
    )
}

// mobile phone - 82%, laptop - 30%, 50%

function BdSignUpHeader({modeColor}){
    return (
        <>
            <Stack direction="row" color={modeColor} >
                <Typography variant="h6"  > Nexster BoardingFinder </Typography>
                <Typography variant="caption"> [beta] </Typography>
            </Stack>
            <Stack color={modeColor}> 
                <Typography> Create an account for a <span style={{ color: "greenyellow" }}> boarding owner </span>  </Typography>
            </Stack>
        </>
    )
}
