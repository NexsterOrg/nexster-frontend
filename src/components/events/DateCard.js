import { Paper, Typography, Box } from "@mui/material"
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';

import { GetMonthDate, GetTimeInAmPm } from "../../helper/date"

export function MonthDateWeekCard({utcDateString}) {
    const { month, day, week } = GetMonthDate(utcDateString)

    return (
        <Paper sx={{ width: "100px" }}>
           <Typography sx={{bgcolor: "#4dabf5", textAlign: "center", color: "white"}}> { month } </Typography>
           <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", marginY: "3px"}}> { day } </Typography>
           <Typography variant="body2" sx={{ textAlign: "center", paddingBottom: "2px"}}> { week } </Typography>
        </Paper>
    )
}

export function MonthDateCard({utcDateString}) {
    const { month, day } = GetMonthDate(utcDateString)

    return (
        <Paper sx={{ width: "105px", display: "flex", gap: "8px", paddingX: "5px", paddingY: "5px",  justifyContent: "center"  }} >
            <CalendarMonthOutlinedIcon />
            <Typography sx={{ textAlign: "center" }}> {month} </Typography>
            <Typography sx={{ textAlign: "center"}}> {day} </Typography>
        </Paper>
    )
}

export function TimeCard({ utcFromDate, utcToDate = ""}){
    let pattern2 = ""
    let width = "120px"
    if (utcToDate !== "") {
        pattern2 = ` - ${GetTimeInAmPm(utcToDate)}`
        width = "220px"
    }
    const pattern = GetTimeInAmPm(utcFromDate).concat(pattern2)
    
    return (
        <Paper sx={{ width: width, display: "flex", gap: "8px", paddingX: "10px", paddingY: "5px", justifyContent: "center"  }} >
            <ScheduleOutlinedIcon />
            <Typography sx={{ textAlign: "center" }}> {pattern} </Typography>
        </Paper>
    )
}
