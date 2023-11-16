import { useMemo } from 'react';
import { SpeedDial, SpeedDialIcon, SpeedDialAction, Typography } from "@mui/material/"

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
