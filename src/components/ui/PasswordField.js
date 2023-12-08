import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const textTooLongErr = "input exceeds the character limit"

export default function PasswordField({ maxCount, content, setContent, textErr, setTextErr, label, htmlId }){
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    maxCount = maxCount || 100

    const handleChange = (event) => {
      const curText = event.target.value || ""
      if(curText.length  > maxCount){
        setContent(curText.substring(0, maxCount))
        setTextErr(textTooLongErr)
        return
      } 
      setContent(curText)
      setTextErr("")
    }
  

    return (
        <Box>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor={htmlId}> {label}</InputLabel>
            <OutlinedInput
                id={htmlId}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                        {showPassword ? <Visibility /> : <VisibilityOff /> }
                    </IconButton>
                    </InputAdornment>
                }
                label="password"
                value={content}
                onChange={handleChange}
                error={textErr !== ""}
            />
        </FormControl>
      </Box>
    )
}
