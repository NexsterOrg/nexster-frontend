import {Snackbar, Alert} from '@mui/material';

export function BasicSnackbar({open, setOpen, vertical, horizontal, msg, level}) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
    >
    <Alert severity={level} sx={{width: '100%'}}>{msg}</Alert>
    </Snackbar>
  );
}

export function BottomRightSnackbar({open, setOpen, level, msg}){
    return <BasicSnackbar open={open} setOpen={setOpen} vertical="bottom" horizontal="right" level={level} msg={msg}/>
}
