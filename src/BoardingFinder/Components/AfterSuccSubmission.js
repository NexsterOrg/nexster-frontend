import { Typography, Box, Stack } from "@mui/material";
import LandingPgImage from "../assets/images/bdFinder_landingPg.svg"

export default function AfterSuccSubmission({content}){
    return (
        <Box sx={{
            backgroundImage: `url(${LandingPgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            minHeight: '100vh',
            minWidth: '100%'
        }}>
            <Stack sx={{ marginTop: "180px", textAlign: "center" }} direction={"column"} spacing={2}>
                <Typography variant="h6"
                    sx={{ fontWeight: "bold"}}
                >  {content} </Typography>
                <Typography> Thank you for using Nexster products. </Typography>
            </Stack>
        </Box>
    )
}
