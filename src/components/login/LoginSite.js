import { useState } from "react"
import { Stack, Button, Typography, TextField, Link, Paper } from "@mui/material"
import { useNavigate } from 'react-router-dom';

import { GetAccessToken, GetProfileInfo } from "../../apis/fetch"
import { SetAccessTokenInLS, SetUserDataInLS, CleanLS } from "../../apis/store"
import { BottomLeftSnackbar } from "../ui/snack_bar"

// msgs
const failedLogin = "Failed to login. Try again"
const invalidCred = "Invalid credentials"

export default function LoginSite(){
    const navigate = useNavigate();

    const [snackBarOpen, setSnackBarOpen] = useState(false)

    const [index, setIndex] = useState("")
    const [indexErr, setIndexErr] = useState("")

    const [password, setPassword] = useState("")
    const [passwordErr, setPasswordErr] = useState("")

    const [loginErr, setLoginErr] = useState("")

    const onLogin = async () => {
        if(index === ""){
            setIndexErr("Please enter your index number")
            return
        }
        if(password === ""){
            setPasswordErr("Please enter your nexster password")
            return
        }

        // get access token from BE
        try {
            const info = await GetAccessToken(index, password)
            if(info.access_token === ""){
                setLoginErr(failedLogin)
                setSnackBarOpen(true)
                return
            }
            setLoginErr("")
            setIndex("")
            setPassword("")

            
            // Set access token in local storage
            SetAccessTokenInLS(info.access_token)
            const userInfo = await GetProfileInfo(info.id)
            if(userInfo === null){
                CleanLS()
                return
            }
            const fac = (userInfo.faculty || "").toLowerCase()
            SetUserDataInLS({
                gender: userInfo.gender,
                birthday: userInfo.birthday,
                faculty: fac,
                userid: userInfo.key,
                name: userInfo.firstName,
                indexNo: index,
                imgUrl: userInfo.img_url
            })

            navigate("/", { replace: true });

        } catch (err) {
            setLoginErr(invalidCred)
            setSnackBarOpen(true)
        }

    }

    const onChangeIndex = (e) => {
        if (indexErr !== "") {
            setIndexErr("")
        }
        setIndex(e.target.value)
    }

    const onChangePassword = (e) => {
        if (password !== "") {
            setPasswordErr("")
        }
        setPassword(e.target.value)
    }

    return (
        <Stack justifyContent={"center"} alignItems={"center"} sx={{ height: "100%" }} spacing={3}>
            <Typography variant="h6"> Log into Nexster </Typography>
            <Stack sx={{ width: "30%" }} spacing={4}>
                <Paper sx={{ padding: "20px", display: "flex", alignItems: "center", flexDirection: "column" }} elevation={4}>
                    <Stack spacing={2} alignItems={"center"} sx={{ width: "300px" , paddingTop: "25px", marginBottom: "60px"}}>
                        <TextField 
                            label="University index"
                            fullWidth
                            value={index}
                            onChange={onChangeIndex}
                            required
                            error={indexErr !== ""}
                            helperText={indexErr}
                        />

                        <TextField 
                            type="password"
                            label="Nexster password"
                            fullWidth
                            value={password}
                            onChange={onChangePassword}
                            required
                            error={passwordErr !== ""}
                            helperText={passwordErr}
                        />

                        <Stack sx={{ width: "100%"}}>
                            <Link href={"some url"} target="_blank" underline="hover" sx={{marginTop: "2px"}}> Forgot password ? </Link>
                        </Stack>

                        <Button variant="contained" onClick={onLogin}
                            sx={{ textTransform: "none", width: "100px", bgcolor: "#35dbcb"}}> Login </Button>
                    </Stack>

                    <Stack direction={"row"} spacing={2}>
                        <Typography> Don't have an account? </Typography>
                        <Link href={"/account/reg"} target="_blank" underline="hover" sx={{marginTop: "2px"}}> Sign up </Link>
                    </Stack>
                </Paper>
                <Stack>
                    <Typography variant="caption"> Nexster is a private social network that provides tools to make students lives more productive. </Typography>
                </Stack>
            </Stack>
            <BottomLeftSnackbar open={snackBarOpen}  setOpen={setSnackBarOpen} level={"error"} msg={loginErr}/>
        </Stack>
    )
}