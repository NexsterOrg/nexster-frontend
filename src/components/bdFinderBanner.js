import { Paper, Typography, Button, Stack } from "@mui/material"
import Base1 from "./layout/base1"
import { MkFullPath } from "../apis/fetch"

export default function BoardingFinderBanner(){
    const comp =  
    <Paper sx={styles.noElementCard}>
        <Stack sx={{ alignItems: "center" }} spacing={1} >
            <Typography variant="h6"> Tired of searching for boarding places door-to-door? 😫</Typography>
            <Typography> Find them easily online, all in one place. 🚀 </Typography>
            <Button sx={{ background: "#c78af2", color: "black", textTransform: "none", marginTop: "30px !important",
                '&:hover': {
                    background: "#8e53b8",
                }}}
            onClick={() =>  window.open(MkFullPath(`boarding`), '_blank') }
            > Go to BoardingFinder </Button>
        </Stack>
        <Stack>
            <Typography variant="caption"> Nexster BoardingFinder is an online place to find boarding places for students at UOM. </Typography>
        </Stack>
    </Paper>

    return (
        <Base1 SideComponent={ comp } />
    )
}

const styles  = {
    noElementCard: {
        width: "60%", height: "260px", borderRadius: "10px", paddingLeft: "25px", flexDirection: "column",
        display: "flex", alignItems: "center",  marginY: "50px", marginX: "40px", rowGap: "10px", justifyContent:"space-between",
        paddingTop: "40px", paddingBottom: "15px"
    },
}
