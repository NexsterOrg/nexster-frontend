import { Box } from '@mui/material';
import PasswordField from './ui/PasswordField';
import { useState } from 'react';

export default function TestGround() {
  const [content, setContent] = useState("")
  const [err, setErr ] = useState("")

  return (
    <Box > 
      <PasswordField maxCount={10} content={content} setContent={setContent} textErr={err} setTextErr={setErr} label={"password"}/>
    </Box>
  );
}
