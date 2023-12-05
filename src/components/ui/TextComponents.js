import { Stack, TextField, Typography } from '@mui/material'

const textTooLongErr = "input exceeds the character limit"

export function TextFieldWithCount({textFieldStyles, maxCount, required, multiline, label, maxRows, placeholder, content, setContent, 
  textErr, setTextErr, variant}){
    maxCount = maxCount || 100
    maxRows = maxRows || 1

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
        <Stack direction={"row"} spacing={2}>
          <TextField 
            error={textErr !== ""}
            helperText={textErr}
            multiline={multiline}
            variant={variant}
            required={required}
            label={label}
            sx={[{width: "50%"}, textFieldStyles]}
            value={content}
            onChange={handleChange}
            maxRows={maxRows}
            placeholder={placeholder}
          />
          <Stack justifyContent={"flex-end"}>
            <Typography variant='caption'> {content.length}/{maxCount}</Typography>
          </Stack>
        </Stack>
    )
}
// count, is chnaged or not
export function TextFieldWithUpdateIndicator({textFieldStyles, maxCount, required, multiline, label, maxRows, placeholder, content, setContent, 
  textErr, setTextErr, variant, isChanged, setIsChanged}){
    maxCount = maxCount || 100
    maxRows = maxRows || 1

    const handleChange = (event) => {
      if(!isChanged){
        setIsChanged(true)
      }
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
        <Stack direction={"row"} spacing={2}>
          <TextField 
            error={textErr !== ""}
            helperText={textErr}
            multiline={multiline}
            variant={variant}
            required={required}
            label={label}
            sx={[{width: "50%"}, textFieldStyles]}
            value={content}
            onChange={handleChange}
            maxRows={maxRows}
            placeholder={placeholder}
          />
          <Stack justifyContent={"flex-end"}>
            <Typography variant='caption'> {content.length}/{maxCount}</Typography>
          </Stack>
        </Stack>
    )
}