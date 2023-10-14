import { Box } from '@mui/material';
import EventCardView from './events/EventCardView';
// import { MonthDateWeekCard, MonthDateCard, TimeCard } from './events/DateCard';


export default function TestGround() {
  return (
    <Box sx={{padding: "20px"}}> 
      <EventCardView />
      {/* <MonthDateWeekCard utcDateString={"2023-10-14T14:30:00Z"}/> */}
      {/* <MonthDateCard utcDateString={"2023-12-09T14:30:00Z"}/> */}
      {/* <TimeCard utcFromDate={"2023-12-09T14:30:00Z"} utcToDate={"2023-12-09T16:30:00Z"}/> */}
    </Box>
  );
}
