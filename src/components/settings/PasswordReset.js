import { useCallback, useState } from "react";
import { Card, CardContent, Stack, Typography, Button } from "@mui/material";
import PasswordField from "../ui/PasswordField"
import { useNavigate } from 'react-router-dom';

import { UpdatePassword, UnAuthorizedError, LoginPath } from "../../apis/fetch";

const maxPasswordLn = 30
const minPasswordLn = 8

const passwordUpdatedOk = "Successfully password updated"
const passwordUpdatedFailed = "Failed to update password"
const wrongPassword = "Incorrect old password"

export function PasswordReset(){

    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState("")
    const [ curErr, setCurErr ] = useState("")

    const [newPassword, setNewPassword] = useState("")
    const [ newErr, setNewErr ] = useState("")

    const [reNewPassword, setReNewPassword] = useState("")
    const [ reNewErr, setReNewErr ] = useState("")

    const [okToUpdate, setOkToUpdate] = useState(false)

    if(currentPassword !== "" && newPassword !== "" && reNewPassword !== ""){
        const isEq = newPassword === reNewPassword
        if (isEq && !okToUpdate && newPassword.length >= minPasswordLn) {
            setOkToUpdate(true)
        } else if(!isEq && okToUpdate) {
            setOkToUpdate(false)
        }
    }

    const onCancel = useCallback(() => {
        setCurrentPassword("")
        setCurErr("")
        setNewPassword("")
        setNewErr("")
        setReNewPassword("")
        setReNewErr("")
        setOkToUpdate(false)
    }, [])

    const onUpdatePassword = async () => {
        try {
            const isUpdated = await UpdatePassword(currentPassword, newPassword)
            if (isUpdated) {
                alert(passwordUpdatedOk)
            } else {
                alert(passwordUpdatedFailed)
            }
        } catch (err) {
            if (err instanceof UnAuthorizedError) {
                navigate(LoginPath, { replace: true });
                return
            }
        }
        onCancel()
    }

    return (
        <Card sx={{ margin: "15px", width: "90%"  }} > 
        <CardContent>
            <Stack sx={{ paddingX: "10px" }} spacing={3}>

                <Typography variant="h6" sx={{ marginTop: "5px", fontWeight: "bold"}}> 2. Change Password </Typography>

                <Stack spacing={3} direction={"row"} >

                    <PasswordField content={currentPassword} setContent={setCurrentPassword} textErr={curErr} setTextErr={setCurErr} 
                        maxCount={maxPasswordLn} label={"Old Password"} htmlId={"cur-password"}/>
                    <PasswordField content={newPassword} setContent={setNewPassword} textErr={newErr} setTextErr={setNewErr} 
                        maxCount={maxPasswordLn} label={"New Password"} htmlId={"new-password"}/>
                    <PasswordField content={reNewPassword} setContent={setReNewPassword} textErr={reNewErr} setTextErr={setReNewErr} 
                        maxCount={maxPasswordLn} label={"Retype New Password"} htmlId={"retyped-new-password"}/>
                    
                </Stack>

                <Stack>
                    <Typography variant="body2"> * Use at least {minPasswordLn} characters.</Typography>
                    <Typography variant="body2"> * Include a mix of uppercase and lowercase letters, numbers, and special characters. </Typography>
                </Stack>

                {
                    okToUpdate ? 
                    <Stack direction={"row-reverse"} spacing={1} >
                        <Button sx={{ textTransform: "none"}} variant="outlined" onClick={onCancel} > Cancel </Button>
                        <Button sx={{ textTransform: "none"}} variant="contained" onClick={onUpdatePassword}> Update Password </Button>
                    </Stack> : null
                }
            </Stack>
        </CardContent>
        </Card>
    )
}
