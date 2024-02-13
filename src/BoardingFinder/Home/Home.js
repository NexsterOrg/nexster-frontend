import { useEffect } from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import TopNavBar from "../Components/TopNavBar";
import LandingPgImage from "../assets/images/bdFinder_landingPg.svg"
import { useNavigate } from 'react-router-dom';

import { bdAdsPath, isLogged } from "../apis/api";

function BdHome(){
    const navigate = useNavigate();

    useEffect(() => {
        (async () => await isLogged(navigate))()
    }, [])

    return (

        <Box sx={{
            backgroundImage: `url(${LandingPgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            minHeight: '92vh',
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
                        onClick={() =>  navigate(bdAdsPath) }
                    > <Typography variant="h6"> See all boardings  </Typography> </Button>
                </Box>
            </Stack>
        </Box>
    );
}

export default function BdHomePage(){
    return (
            <TopNavBar childComponent={ <BdHome />} title={"Nexster BoardingFinder"}/>
        
    )
}
