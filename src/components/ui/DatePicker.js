import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const pickerWidth = {
    xl: 280,
    lg: 250,
    xmd: 220,
    md: 200,
    sm: 180
}

export function BasicDatePicker({value, setValue, label, styles, textErr, setTextErr, minDate, maxDate, defaultDate}) {
    if(value === "") value = defaultDate

    const handleChange = (newValue) => {
        setValue(newValue)
        setTextErr("")
    }

    return (
    <Box sx={[{width: pickerWidth}, styles]}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
            <DatePicker 
                label={label}
                value={value}
                onChange={handleChange}
                maxDate={maxDate}
                minDate={minDate}
                format='YYYY/MM/DD'
                defaultValue={defaultDate}
             />
            </DemoContainer>
        </LocalizationProvider>   
        {textErr ? <Typography variant='caption' sx={{color: "red"}}> *{textErr} </Typography> : null}     
    </Box>
    );
}

export function DatePickerWithUpdateIndicator({value, setValue, label, styles, textErr, setTextErr, minDate, maxDate, isChanged, setIsChanged}) {
    if(value === "") value = minDate

    const handleChange = (newValue) => {
        if(!isChanged) setIsChanged(true)

        const dateOnly = dayjs(newValue); 
        const localDate = dateOnly.format('YYYY-MM-DD');

        setValue(localDate)
        setTextErr("")
    }

    return (
    <Box sx={[{width: pickerWidth}, styles]}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
            <DatePicker 
                label={label}
                value={value}
                onChange={handleChange}
                maxDate={maxDate}
                minDate={minDate}
                format='YYYY/MM/DD'
             />
            </DemoContainer>
        </LocalizationProvider>   
        {textErr ? <Typography variant='caption' sx={{color: "red"}}> *{textErr} </Typography> : null}     
    </Box>
    );
}