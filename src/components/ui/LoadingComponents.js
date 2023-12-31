import { Stack, Typography, useTheme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export function SaveLoading({rootStyles, label}){
    const theme = useTheme();
    rootStyles = rootStyles || {}
    const modeColor = theme.palette.mode === 'dark' ? 'white' : 'black' ;
    return (
        <Stack gap={2} sx={[rootStyles, { color: modeColor }]} justifyContent={"center"} alignItems={"center"} direction={"column"} >
            <CircularProgress  aria-describedby="save-loading" aria-busy={true} />
            <Typography> {label} </Typography>
        </Stack>
    )
}
