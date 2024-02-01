import { Box, Typography } from "@mui/material";
import TopNavBar from "../Components/TopNavBar";
import LandingPgImage from "../assets/images/bdFinder_landingPg.svg"
import ImageResponsive from 'react-image-responsive';

function BdHome(){

    return (
        // <Box sx={{
        //     backgroundImage: `url(${LandingPgImage})`,
        //     backgroundSize: 'cover',
        //     backgroundPosition: 'center',
        //     display: 'flex',
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     height: '100vh',
        //     width: '100vw'
        // }}>
        // </Box>
        <Box>
            <ImageResponsive
                src={LandingPgImage}
                alt="this is my image"
                width="100px"
                height="100px"
            />
        </Box>
    );
}

export default function BdHomePage(){
    return (
            <TopNavBar childComponent={ <BdHome />} title={"Nexster BoardingFinder"}/>
        
    )
}
