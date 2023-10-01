import { useMemo } from 'react';
import {Box, SpeedDial, SpeedDialIcon, SpeedDialAction, Typography} from "@mui/material/"

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useNavigate } from 'react-router-dom';
import Base1 from '../layout/base1';
import { FriendsRequestRoute, FriendSuggsRoute, AllFriendsRoute } from '../../apis/fetch';

export default function FriendsBase({mainComponent}) {

    const completeComponent = <>
        {mainComponent}
        <QuickFriendNav />
    </>
    return <Base1 SideComponent={completeComponent} styles={{alignItems: "flex-start"}}/>
}

function QuickFriendNav() {
  const navigate = useNavigate()

  const actions = useMemo(() => {
    return [
      { icon: <PeopleAltIcon />, name: 'My Friends', nav: AllFriendsRoute },
      { icon: <PersonAddIcon />, name: 'Friend Requests', nav:FriendsRequestRoute },
      { icon: <Diversity3Icon />, name: 'Friends Pool', nav: FriendSuggsRoute }
    ]
  }, []) 

  return (
      <SpeedDial
        ariaLabel="Quick-Friend-Nav"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipOpen
            tooltipTitle={<Typography sx={{color: "black"}}> {action.name} </Typography>}
            onClick={() => navigate(action.nav)}
            sx={{
              '& .MuiSpeedDialAction-staticTooltipLabel': {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                background: "#D9D9D9"
              },
            }}
          />
        ))}
      </SpeedDial>
  );
}

// function QuickFriendNav({rootStyles}){
//   const navigate = useNavigate()
//   const [friendCount, setFriendCount] = useState(0)

//   const onReqLinkClick = () => {
//     navigate(FriendsRequestRoute);
//   }

//   const onSuggsLinkClick = () => {
//     navigate(FriendSuggsRoute)
//   }

//   const onAllFriendsLinkClick = () => {
//     navigate(AllFriendsRoute)
//   }

//   useEffect(() => {
//     (async () => {
//       try {
//         const {userid} = GetUserInfoFromLS()
//         if (userid === undefined) {
//           CleanLS()
//           navigate(LoginPath, { replace: true });
//           return
//         }
//         const frndCount = await GetFriendCount(userid)
//         if(frndCount < 0) return // TODO: How to indicate the failure to front end.
//         setFriendCount(frndCount)
//       } catch (err) {
//         if (err instanceof UnAuthorizedError) {
//           navigate(LoginPath, { replace: true });
//           return
//         } 
//         console.error("failed to get userId for quick nav: ", err)
//       }
//     })()

//   }, [])

//   return (
//       <Paper sx={[{ width: 260, maxWidth: '100%', padding: "10px" }, rootStyles]}>
//           <Typography sx={{fontWeight: "bold", marginTop: "5px", marginLeft: "10px"}}>Quick Navigation</Typography>
//         <MenuList>
//           <MenuItem onClick={onAllFriendsLinkClick} >
//             <ListItemIcon>
//               <PeopleAltIcon />
//             </ListItemIcon>
//             <ListItemText>My Friends</ListItemText>
//             <Typography variant="body2" color="text.secondary">
//               {friendCount}
//             </Typography>
//           </MenuItem>
  
//           <MenuItem onClick={onReqLinkClick}>
//             <ListItemIcon>
//               <PersonAddIcon />
//             </ListItemIcon>
//             <ListItemText>Friend Requests</ListItemText>
//           </MenuItem>
  
//           <MenuItem onClick={onSuggsLinkClick}>
//             <ListItemIcon>
//               <Diversity3Icon />
//             </ListItemIcon>
//             <ListItemText>Friends Pool</ListItemText>
//           </MenuItem>
//         </MenuList>
//       </Paper>
//     );
// }