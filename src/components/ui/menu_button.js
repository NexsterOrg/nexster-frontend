import { useState } from 'react';
import {Menu, MenuItem, IconButton, Button, Dialog, DialogActions, DialogContent, Box,
    DialogContentText, DialogTitle} from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

export default function MenuButton({question, content, onYes, onNo, rootStyles}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false)
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onRemove = () => {
    setOpenDialog(true)
    setAnchorEl(null);
  };
  return (
    <Box sx={[rootStyles]}>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <DragIndicatorIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={onRemove}>Remove</MenuItem>
      </Menu>
      <ConfirmDialog open={openDialog} setOpen={setOpenDialog} onYes={onYes} onNo={onNo}
        question={question} content={content}/>
    </Box>
  );
}

export function ConfirmDialog({open, setOpen, question, content, onYes, onNo}) {
  // const [alert, setAlert] = useState(false) // set alert properly
  const onYesFunc = async () => {
    const isSucc = await onYes()
    if (!isSucc) {
      // failed to execute the onYes action.
    }
    setOpen(false)
  }

  const onNoFunc = () => {
    onNo()
    setOpen(false)
  }

  return (
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {question}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onYesFunc} disableRipple variant="outlined" sx={{textTransform: "none"}}>Yes</Button>
          <Button onClick={onNoFunc} disableRipple variant="outlined" autoFocus sx={{textTransform: "none"}}>
            No
          </Button>
        </DialogActions>
      </Dialog>
  );
}
