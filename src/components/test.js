import {Box, SpeedDial, SpeedDialIcon, SpeedDialAction, Typography} from "@mui/material/"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const actions = [
  { icon: <PeopleAltIcon />, name: 'My Friends' },
  { icon: <PersonAddIcon />, name: 'Friend Requests' },
  { icon: <Diversity3Icon />, name: 'Friends Pool' }
];

export default function TestGround() {
  return (
    // <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipOpen
            tooltipTitle={<Typography sx={{color: "black"}}> {action.name} </Typography>}
            onClick={() => console.log("clicked")}
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
    // </Box>
  );
}
