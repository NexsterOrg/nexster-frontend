import { Card, CardContent, Stack, Typography, Button } from "@mui/material";
import PasswordField from "../ui/PasswordField"
import { useState } from "react";

const maxPasswordLn = 30

export function PasswordReset(){

    const [currentPassword, setCurrentPassword] = useState("")
    const [ curErr, setCurErr ] = useState("")

    const [newPassword, setNewPassword] = useState("")
    const [ newErr, setNewErr ] = useState("")

    const [reNewPassword, setReNewPassword] = useState("")
    const [ reNewErr, setReNewErr ] = useState("")

    return (
        <Card sx={{ margin: "15px", width: "90%"  }} > 
        <CardContent>
            <Stack sx={{ paddingX: "10px" }} spacing={3}>

                <Typography variant="h6" sx={{ marginTop: "5px", fontWeight: "bold"}}> 2. Reset Password </Typography>

                <Stack spacing={3} direction={"row"} >

                    <PasswordField content={currentPassword} setContent={setCurrentPassword} textErr={curErr} setTextErr={setCurErr} 
                        maxCount={maxPasswordLn} label={"Current Password"}/>
                    <PasswordField content={newPassword} setContent={setNewPassword} textErr={newErr} setTextErr={setNewErr} 
                        maxCount={maxPasswordLn} label={"New Password"}/>
                    <PasswordField content={reNewPassword} setContent={setReNewPassword} textErr={reNewErr} setTextErr={setReNewErr} 
                        maxCount={maxPasswordLn} label={"Retype New Password"}/>
                    
                </Stack>

                {
                    true ? 
                    <Stack direction={"row-reverse"} spacing={1} >
                        <Button sx={{ textTransform: "none"}} variant="outlined" > Cancel </Button>
                        <Button sx={{ textTransform: "none"}} variant="contained"> &nbsp;Reset&nbsp; </Button>
                    </Stack> : null
                }
            </Stack>
        </CardContent>
        </Card>
    )
}
// TODO: Change reset button display logic
// make sure both password are same (new and retype)

// TODO: Development need to resume once the BE are done.
