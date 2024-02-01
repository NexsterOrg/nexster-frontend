import { Box, Typography, Stack, Button } from "@mui/material";
import TopNavBar from "../Components/TopNavBar";
import LandingPgImage from "../assets/images/bdFinder_landingPg.svg"

function BdHome(){

    return (
        <>
        <Box sx={{
            backgroundImage: `url(${LandingPgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            minHeight: '90vh',
            minWidth: '100%'
        }}>
            <Stack sx={{ marginTop: "6%" }} direction={"column"} spacing={4}>
                <Typography variant="h3" sx={{ color: "black"}} > Find boarding places online </Typography>
                <Box sx={{             
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                }}>
                    <Button variant="contained"
                        size="large"
                        sx={{ textTransform: "none", width: "60%", fontWeight: "bold",
                            background: "#c78af2", color: "black",
                            '&:hover': {
                                background: "#9a5ec4",
                            },
                        }}
                    > <Typography variant="h6"> See all boardings  </Typography> </Button>
                </Box>
            </Stack>
        </Box>
        <Box sx={{ border: "1px solid red", paddingY: "15px", paddingX: "8px"}}>
            <Typography variant="subtitle2">
                some content about the Nexster. PUT IT HERE.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                standard dummy text ever since the 1500s, when 
            </Typography>
        </Box>
        </>
    );
}

export default function BdHomePage(){
    return (
            <TopNavBar childComponent={ <BdHome />} title={"Nexster BoardingFinder"}/>
        
    )
}
