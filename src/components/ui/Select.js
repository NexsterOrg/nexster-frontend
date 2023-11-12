import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const selectWidth = {
    xl: 200,
    lg: 195,
    xmd: 190,
    md: 185,
    sm: 180
}

export function BasicSelect({label, options, styles, defaultValue, value, setValue}) {
    if(!Array.isArray(options)) {
        options = []
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
    <Box sx={[{ width: selectWidth }, styles]}>
        <FormControl fullWidth>
            <InputLabel id="select-input">{label}</InputLabel>
            <Select
                labelId="basic-select-label"
                id="basic-select"
                value={value}
                label={label}
                onChange={handleChange}
                defaultValue={defaultValue}
            >
            {
                options.map((item, index) => {
                    return  <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                })
            }
            </Select>
        </FormControl>
    </Box>
    );
}

