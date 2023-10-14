import { Box, Button, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

// import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';

export function ReactionButtons({rootStyls}){
    return (
        <Box sx={rootStyls}>
            <Box sx={{display: "flex", gap: "10px"}}>
                <Button variant="outlined" disableRipple
                    sx={{ textTransform: "none"}}
                    startIcon={<FavoriteBorderOutlinedIcon />} > Love </Button>
                <Button variant="outlined" disableRipple
                    sx={{ textTransform: "none"}}
                    startIcon={<QuestionMarkOutlinedIcon />}> Going </Button>
            </Box>
            <Box sx={{ marginTop: "12px", display: "flex", justifyContent: "space-between"}}>
                <Typography variant="caption"> 123 loves, 18 going</Typography>
                <Typography variant="caption"> posted by: Namal Sanjaya </Typography>
            </Box>
        </Box>
    )
}
