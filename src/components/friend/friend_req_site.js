import {Box, Button} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

import FriendReqsPanel from "./friend_req_panel"
import Base1 from "../layout/base1";
import { FriendsRoute } from '../../apis/fetch';

const reqCountPerFetch = 15

export default function FriendReqSite(){
    const navigate = useNavigate();

    const backHandler = () => {
        navigate(FriendsRoute);
    }

    const comp = <Box> 
        <Button sx={styles.butn} startIcon={<ArrowBackIcon />} onClick={backHandler}>Back to Friends</Button>
        <FriendReqsPanel rootStyles={{marginX: "30px", marginBottom: "30px", marginTop: "8px"}} showButton={false} initPageNo={1} initPageSize={reqCountPerFetch} 
        pageSize={reqCountPerFetch}/>
    </Box>

    return <Base1 SideComponent={comp} styles={{alignItems: "flex-start"}}/>
}

const styles = {
    butn: {
        marginTop: "30px", marginLeft: "30px", textTransform: "none"
    }
}
