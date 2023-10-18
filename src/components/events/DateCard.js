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

const iconSize = {
    xl: 24,
    lg: 22,
    xmd: 20,
    md: 18,
    sm: 16
}

const cardSize = {
    xl: 105,
    lg: 100,
    xmd: 98,
    md: 95
}

// const cardPaddingY = {
//     xl: 1,
//     lg: 0,
//     xmd: 0,
//     md: 0
// }

export function MonthDateCard({utcDateString}) {
    const { month, day } = GetMonthDate(utcDateString)

    return (
        <Paper sx={{ width: cardSize, display: "flex", gap: "8px", paddingX: 1, paddingY: 1, justifyContent: "center"  }} >
            <Box sx={{ display: "flex", alignItems: "center" }}> 
                <CalendarMonthOutlinedIcon sx={{ width: iconSize, height: iconSize }}/>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }} >
                <Typography sx={{ textAlign: "center" }}> {month} </Typography>
            </Box>
            <Box sx={{  display: "flex", alignItems: "center" }}>
                <Typography sx={{ textAlign: "center"}}> {day} </Typography>
            </Box>
        </Paper>
    )
}

const timeCardSize = {
    size1: {
        xl: 120,
        lg: 110,
        xmd: 105,
        md: 100
    },
    size2: {
        xl: 220,
        lg: 210,
        xmd: 205,
        md: 200
    }
}

export function TimeCard({ utcFromDate, utcToDate = ""}){
    let pattern2 = ""
    let width = timeCardSize.size1
    if (utcToDate !== "") {
        pattern2 = ` - ${GetTimeInAmPm(utcToDate)}`
        width = timeCardSize.size2
    }
    const pattern = GetTimeInAmPm(utcFromDate).concat(pattern2)
    
    return (
        <Paper sx={{ width: width, display: "flex", gap: "8px", paddingX: "1%", justifyContent: "center"  }} >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <ScheduleOutlinedIcon sx={{ width: iconSize, height: iconSize }}/>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}> 
                <Typography sx={{ textAlign: "center" }}> {pattern} </Typography>
            </Box>
        </Paper>
    )
}
