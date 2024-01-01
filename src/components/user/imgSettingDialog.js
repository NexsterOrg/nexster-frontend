import { useState } from "react"
import { Dialog, Divider, ListItemButton, Stack, Button,
    DialogTitle, DialogContent, DialogActions, DialogContentText } from "@mui/material"

import { SaveLoading } from '../ui/LoadingComponents';
import { DeleteImagePost } from "../../apis/fetch"
import { BottomLeftSnackbar } from '../ui/snack_bar';

export default function ImageSettingDialog({imageSetting, setImageSetting}){
    const [confirmationOpen, setConfirmationOpen] = useState(false)

    return (
    <>
    <Dialog
        open={imageSetting?.open} 
        aria-labelledby="image-setting-dialog-label"
        aria-describedby="image-setting-dialog-description"
    >
    <Stack sx={{width: "260px"}}>
        <ListItemButton sx={ [styles.listButn, {color: "red"}] } onClick={() => setConfirmationOpen(true)} >
            Delete
        </ListItemButton>
        <Divider />

        <ListItemButton sx={ styles.listButn } disabled>
            Edit
        </ListItemButton>
        <Divider />

        <ListItemButton sx={ styles.listButn } disabled>
            Make Public
        </ListItemButton>
        <Divider />

        <ListItemButton sx={ styles.listButn } onClick={() => setImageSetting({open: false, key: ""})}>
            Cancel
        </ListItemButton>
    </Stack>
    </Dialog>
    <ConfirmationDialog open={confirmationOpen} setOpen={setConfirmationOpen} mediaKey={imageSetting?.key} closeParent={setImageSetting}/>
    </>
)}

const styles = {
    listButn: {
        display: "flex", justifyContent: "center", padding: "15px"
    }
}

const failedToDel = "Failed to delete the post. Try again.."
const delOk = "Successfully deleted"

function ConfirmationDialog({open, setOpen, closeParent, mediaKey}) {
    const [saveSpinner, startSaveSpinner] = useState(false)
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [snackInfo, setSnackInfo] = useState({level: "success", msg: ""})

    const onYesFunc = async () => {
        try {
            startSaveSpinner(true)
            const isSucceded = await DeleteImagePost(mediaKey)
            if(!isSucceded) setSnackInfo({level: "error", msg: failedToDel})
            else setSnackInfo({level: "success", msg: delOk})
        } catch (error) {
            setSnackInfo({level: "error", msg: failedToDel})
        }
        startSaveSpinner(false)
        setSnackBarOpen(true)
        setOpen(false)
        closeParent({open: false, key: ""})
    }
  
    const onNoFunc = () => {
      setOpen(false)
    }
  
    return (
        <>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="img-setting-dialog-title"
          aria-describedby="img-setting-description"
        >

        { saveSpinner ?  <SaveLoading rootStyles={{marginTop: 10, width: 100, height: 100}} /> :
            <>
            <DialogTitle id="img-setting-dialog-title">
                Delete Post ?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="img-setting-description">
                Pressing Yes will permanently delete your post. Press No to cancel the operation.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onYesFunc} disableRipple variant="outlined" sx={{textTransform: "none"}}>Yes</Button>
                <Button onClick={onNoFunc} disableRipple variant="outlined" autoFocus sx={{textTransform: "none"}}>
                No
                </Button>
            </DialogActions>
            </>  
        }
        </Dialog>
        <BottomLeftSnackbar open={snackBarOpen}  setOpen={setSnackBarOpen} level={snackInfo.level} msg={snackInfo.msg}/>
        </>
    );
  }
