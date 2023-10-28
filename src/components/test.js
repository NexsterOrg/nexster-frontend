import { Box } from '@mui/material';

import { EventLoveReactionModel } from './events/EventReactionModel';
// import { UserReactionCard } from './events/EventReactionModel';

const url = "http://192.168.1.101:8002/content/images/avatar/1743365.jpg?perm=viewer&ts=8406&imgMac=qPiyxTsRlOYwtqZ51v4Pct29m9ZRUeUNKD74daiemyI="

export default function TestGround() {

  return (
    <Box sx={{padding: "20px"}}> 
      {/* <UserReactionCard newUsername={"Namal Sanjaya"} newFacField={"Engineering"} imgUrl={url} batch={18}/> */}
      <EventLoveReactionModel />
    </Box>
  );
}
