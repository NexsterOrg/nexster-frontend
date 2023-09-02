import {Box, Button} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

import Base1 from "../layout/base1";
import FriendSuggPanel from "./friends_sugg_panel"
import { FriendsRoute } from '../../apis/fetch';

const suggsSitePageSize = 18

export default function FriendSuggsSite(){
    const navigate = useNavigate();

    const backHandler = () => {
        navigate(FriendsRoute);
    }
    const comp = <Box> 
        <Button sx={styles.butn} startIcon={<ArrowBackIcon />} onClick={backHandler}>Back to Friends</Button>
        <FriendSuggPanel rootStyles={{marginX: "30px", marginBottom: "30px", marginTop: "8px"}} showButton={false} pageSize={suggsSitePageSize}/>
    </Box>
    return <Base1 SideComponent={comp} styles={{alignItems: "flex-start"}}/>
}

const styles = {
    butn: {
        marginTop: "30px", marginLeft: "30px", textTransform: "none"
    }
}
