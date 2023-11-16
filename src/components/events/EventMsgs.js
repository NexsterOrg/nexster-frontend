import { Snackbar, Alert } from '@mui/material';

// type = "success" | "error"
export function EventCreationSnackbar({open, setOpen, type, msg}) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;

    setOpen(false);
  };

  return (
    <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
    > 
        <Alert severity={type} sx={{ width: '100%' }}>
            {msg}
        </Alert>
    </Snackbar>
  );
}
