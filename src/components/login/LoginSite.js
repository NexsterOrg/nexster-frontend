import { Stack, Button, Typography, TextField, Link, Paper } from "@mui/material"

export default function LoginSite(){

    return (
        <Stack justifyContent={"center"} alignItems={"center"} sx={{ height: "100%" }} spacing={3}>
            <Typography variant="h6"> Log into Nexster </Typography>
            <Stack sx={{ width: "30%" }} spacing={4}>
                <Paper sx={{ padding: "20px", display: "flex", alignItems: "center", flexDirection: "column" }} elevation={4}>
                    <Stack spacing={2} alignItems={"center"} sx={{ width: "300px" , paddingTop: "15px", marginBottom: "60px"}}>
                        <TextField 
                            label="University index"
                            fullWidth
                        />

                        <TextField 
                            type="password"
                            label="Nexster password"
                            fullWidth
                        />

                        <Stack sx={{ width: "100%"}}>
                            <Link href={"some url"} target="_blank" underline="hover" sx={{marginTop: "2px"}}> Forgot password ? </Link>
                        </Stack>

                        <Button variant="contained" sx={{ textTransform: "none", width: "100px", bgcolor: "#35dbcb"}}> Login </Button>
                    </Stack>

                    <Stack direction={"row"} spacing={2}>
                        <Typography> Don't have an account? </Typography>
                        <Link href={"some url"} target="_blank" underline="hover" sx={{marginTop: "2px"}}> Sign up </Link>
                    </Stack>
                </Paper>
                <Stack>
                    <Typography variant="caption"> Nexster is a private social network that provides tools to make students lives more productive. </Typography>
                </Stack>
            </Stack>
        </Stack>
    )
}