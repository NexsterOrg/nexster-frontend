import { Stack, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export function SaveLoading({rootStyles, label}){
    rootStyles = rootStyles || {}

    return (
        <Stack gap={2} sx={[rootStyles]} justifyContent={"center"} alignItems={"center"} direction={"column"}>
            <CircularProgress  aria-describedby="save-loading" aria-busy={true} />
            <Typography> {label} </Typography>
        </Stack>
    )
}
// &nbsp;&nbsp;&nbsp;Saving...

