import { Stack, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export function SaveLoading({rootStyles}){
    rootStyles = rootStyles || {}

    return (
        <Stack gap={2} sx={[rootStyles]} justifyContent={"center"} alignItems={"center"} direction={"column"}>
            <CircularProgress  aria-describedby="save-loading" aria-busy={true} />
            <Typography> &nbsp;&nbsp;&nbsp;Saving... </Typography>
        </Stack>
    )
}
