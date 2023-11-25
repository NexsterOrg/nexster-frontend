import { useMemo } from 'react';
import { SpeedDial, SpeedDialIcon, SpeedDialAction, Typography } from "@mui/material/"
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { useNavigate } from 'react-router-dom';

import { MyEventsListRoute } from '../../apis/fetch';

export function QuickEventNav({ setCreateEventOpen }) {
  const navigate = useNavigate()

  const actions = useMemo(() => {
      return [
        { icon: <PermContactCalendarIcon />, name: 'My Events', onClickFunc: (state) => navigate(MyEventsListRoute) },
        { icon: <AddCircleOutlineRoundedIcon />, name: 'Create Event', onClickFunc: setCreateEventOpen },
      ]
  }, [setCreateEventOpen]) 
  

  if( typeof(setCreateEventOpen) !== "function" ) {
      return <> Error </>
  }

  return (
      <SpeedDial
        ariaLabel="Quick-Event-Nav"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipOpen
            tooltipTitle={<Typography sx={{color: "black"}}> {action.name} </Typography>}
            onClick={() => action.onClickFunc(true) }
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
