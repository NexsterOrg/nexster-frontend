import { Typography, Paper, Stack } from "@mui/material";


export default function Banner() {
    return (
        <Stack alignItems={"center"} sx={{ border: "1px solid red", height: "100vh", padding: "10px"}}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }} > Nexster </Typography>
            <Paper sx={{ padding: "10px", marginTop: "10px"}}>
                <Typography sx={{ textAlign: "center", marginBottom: "10px"}}> Please view the web site on a desktop/laptop browser. </Typography>
                <Typography variant="body2" sx={{ textAlign: "end"}}> - Nexster Team </Typography>
            </Paper>
        </Stack>
    )
}
