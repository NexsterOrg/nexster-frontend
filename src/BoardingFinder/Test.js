// import AdCard from "./Ad/AdCard"
import { Box } from "@mui/material"
import TopNavBar from "./Components/TopNavBar"

export default function TestComponent(){

    return (
    <Box sx={{ padding: "10px" }}>
        <TopNavBar childComponent={ <div> </div>} title={"Nexster BoardingFinder"}/>
    </Box>
    )
}
