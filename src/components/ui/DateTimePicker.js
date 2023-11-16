import dayjs from 'dayjs';
import { Box, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { AddMonths } from '../../helper/date';

const pickerWidth = {
    xl: 280,
    lg: 250,
    xmd: 220,
    md: 200,
    sm: 180
}

const oneHour = 60 * 60 * 1000;
const currentDate = new Date()
const maxDate = dayjs(AddMonths(currentDate, 6))  // set max date as 6 months from now
const minDate = dayjs(new Date(currentDate.getTime() + oneHour))

export function BasicDateTimePicker({value, setValue, label, styles, textErr, setTextErr}) {
    if(value === "") value = minDate

    const handleChange = (newValue) => {
        setValue(newValue)
        setTextErr("")
    }

    return (
    <Box sx={[{width: pickerWidth}, styles]}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker
                label={label}
                value={value}
                onChange={handleChange}
                maxDate={maxDate}
                minDate={minDate}
                format="YYYY/MM/DD: hh:mm A"
            />
            </DemoContainer>
        </LocalizationProvider>
        {textErr ? <Typography variant='caption' sx={{color: "red"}}> *{textErr} </Typography> : null}
    </Box>
    );
}
