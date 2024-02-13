import { useState } from "react"
import { Stack, Button, Typography, TextField, Link, Paper, useTheme, useMediaQuery } from "@mui/material"
import { useNavigate } from 'react-router-dom';

import { GetAccessTokenForBdOwner, bdOwnerRegPath } from "../apis/api"
import { SetAccessTokenInLS } from "../apis/store"

import { BottomLeftSnackbar } from "../../components/ui/snack_bar";

// msgs
const failedLogin = "Failed to login. Try again"
const invalidCred = "Invalid credentials"

export default function BdLoginPage(){
    const theme = useTheme();
    const navigate = useNavigate();

    const isSmall = useMediaQuery('(max-width:700px)');
    const isMedium = useMediaQuery('(min-width:701px) and (max-width:1200px)');
    
    const [snackBarOpen, setSnackBarOpen] = useState(false)

    const [phoneNo, setPhoneNo] = useState("")
    const [phoneNoErr, setPhoneNoErr] = useState("")

    const [password, setPassword] = useState("")
    const [passwordErr, setPasswordErr] = useState("")

    const [loginErr, setLoginErr] = useState("")

    const modeColor = theme.palette.mode === 'dark' ? 'white' : 'black' ;
    const panelSize = isSmall ? "85%" : isMedium ? "50%": "30%";

    const onLogin = async () => {
        if(phoneNo === ""){
            setPhoneNoErr("Please enter your phone number")
            return
        }
        if(password === ""){
            setPasswordErr("Please enter your password")
            return
        }

        // get access token from BE
        try {
            const info = await GetAccessTokenForBdOwner(phoneNo, password)
            if(info.access_token === ""){
                setLoginErr(failedLogin)
                setSnackBarOpen(true)
                return
            }
            setLoginErr("")
            setPhoneNo("")
            setPassword("")

            
            // Set access token in local storage
            SetAccessTokenInLS(info.access_token)

            navigate("/boarding", { replace: true });

        } catch (err) {
            setLoginErr(invalidCred)
            setSnackBarOpen(true)
        }

    }

    const onChangePhoneNo = (e) => {
        if (phoneNoErr !== "") {
            setPhoneNoErr("")
        }
        const val = (e?.target?.value || "").toLowerCase()
        setPhoneNo(val)
    }

    const onChangePassword = (e) => {
        if (password !== "") {
            setPasswordErr("")
        }
        setPassword(e.target.value)
    }

    return (
        <Stack justifyContent={"center"} alignItems={"center"} sx={{ height: "100%", bgcolor: 'background.default' }} spacing={3}>
            <Stack direction="row" color={modeColor} >
                <Typography variant="h6"  > Nexster BoardingFinder </Typography>
                <Typography variant="caption"> [beta] </Typography>
            </Stack>
            <Stack color={modeColor}> 
                <Typography> Log in as a <span style={{ color: "greenyellow" }}> boarding owner </span>  </Typography>
            </Stack>
            <Stack sx={{ width: panelSize, color: modeColor }} spacing={4}>
                <Paper sx={{ padding: "20px", display: "flex", alignItems: "center", flexDirection: "column" }} elevation={4}>
                    <Stack spacing={2} alignItems={"center"} sx={{ width: "280px" , paddingTop: "25px", marginBottom: "60px"}}>
                        <TextField 
                            label="Phone No"
                            fullWidth
                            value={phoneNo}
                            onChange={onChangePhoneNo}
                            required
                            error={phoneNoErr !== ""}
                            helperText={phoneNoErr}
                            type="number"
                        />

                        <TextField 
                            type="password"
                            label="password"
                            fullWidth
                            value={password}
                            onChange={onChangePassword}
                            required
                            error={passwordErr !== ""}
                            helperText={passwordErr}
                        />

                        <Stack sx={{ width: "100%"}}>
                            <Link href={"#not-yet-implemented"} target="_blank" underline="hover" sx={{marginTop: "2px"}}> Forgot password ? </Link>
                        </Stack>

                        <Button variant="contained" onClick={onLogin}
                            sx={{ textTransform: "none", width: "100px", bgcolor: "#35dbcb"}}> Login </Button> 
                    </Stack>

                    <Stack direction={"row"} spacing={2}>
                        <Typography> Don't have an account? </Typography>
                        <Link href={bdOwnerRegPath} target="_blank" underline="hover" sx={{marginTop: "2px"}}> Create an account </Link>
                    </Stack>
                </Paper>
                <Stack>
                    <Typography variant="caption"> Nexster BoardingFinder is an online place to find 
                        boarding places for students at the University of Moratuwa. </Typography>
                </Stack>
            </Stack>
            <BottomLeftSnackbar open={snackBarOpen}  setOpen={setSnackBarOpen} level={"error"} msg={loginErr}/>
        </Stack>
    )
}
