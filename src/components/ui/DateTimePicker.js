import { Box, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const pickerWidth = {
    xl: 280,
    lg: 250,
    xmd: 220,
    md: 200,
    sm: 180
}

const dateFormats = {
    ampm: "YYYY/MM/DD: hh:mm A",
    yymmdd: "YYYY/MM/DD"
}

const defaultFormat = "YYYY/MM/DD: hh:mm A"

export function BasicDateTimePicker({value, setValue, label, styles, textErr, setTextErr, minDate, maxDate, formatType}) {
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
                format={dateFormats[formatType] || defaultFormat}
            />
            </DemoContainer>
        </LocalizationProvider>
        {textErr ? <Typography variant='caption' sx={{color: "red"}}> *{textErr} </Typography> : null}
    </Box>
    );
}
