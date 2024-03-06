import { useState } from "react"
import { Card, CardContent, Stack, Typography, Button, Divider, Dialog, TextField, IconButton, Box} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

import { DeleteUser, LoginPath, UnAuthorizedError } from "../../apis/fetch";
import { CleanLS } from "../../apis/store";

const fontDelSizes = {
    xl: 15,
    lg: 13,
    xmd: 10,
    md: 9,
    sm: 8
}

export function DeleteAccount(){
    const [conseqMsgOpen, setConseqMsgOpen] = useState(false)
    const [confirmOpen, setConfirmOpen] = useState(false)

    return (
        <>
        <Card sx={{ margin: "15px", width: "90%"  }} > 
        <CardContent>
            <Stack sx={{ paddingX: "10px" }} spacing={3}>
                <Typography variant="h6" sx={{ marginTop: "5px", fontWeight: "bold", color: "red"}}> 3. Delete Account </Typography>

                <Typography> Deleting your account is irreversible. 
                    All associated data will be permanently removed and cannot be recovered. 
                    Please ensure you've backed up any important information before proceeding with the deletion. 
                </Typography>

                <Stack alignItems={"center"}>
                    <Button variant="outlined" sx={{ width: "16%",  bgcolor: "red", fontSize: fontDelSizes, color: "black", fontWeight: "bold"}}
                    onClick={() => setConseqMsgOpen(true)}
                    > Delete this Account </Button>
                </Stack>

            </Stack>
        </CardContent>
        </Card>
        <DeleteConsequenceMsg open={conseqMsgOpen} setOpen={setConseqMsgOpen} setNextOpen={setConfirmOpen} />
        {
            confirmOpen ? <DeleteConfirmation open={confirmOpen} setOpen={setConfirmOpen}/> : null
        }
        </>
    )
}

function DeleteConsequenceMsg({open, setOpen, setNextOpen}){

    const onNext = () => {
        setOpen(false)
        setNextOpen(true)
    }

    return (
    <Dialog
        open={open} 
        scroll={"paper"}
        aria-labelledby="delete-consequence-model-title"
        aria-describedby="delete-consequence-model-description"
    >
      <Stack sx={{ width: "600px", padding: "10px"}} spacing={3} >

        <div>
        <Stack direction={"row"} justifyContent={"space-between"} >
        
          <Stack justifyContent={"center"} >
          <Typography sx={{fontWeight: "bold" }} > Consequences of deleting this account </Typography>
          </Stack>

        <IconButton aria-label="delete-conseq-close-btn" onClick={() => setOpen(false)}>
            <CloseIcon />
        </IconButton>

        </Stack>
        <Divider />
        </div>

        <Stack>
            <Typography variant="body1" sx={{marginBottom: "10px"}}> Before you proceed, please note: </Typography>
            <Typography variant="body2"> 1. Deleting your account will remove all your personal information associated with it. </Typography>
            <Typography variant="body2"> 2. Any photos, videos, events, or posts you've shared will be permanently removed from our platform. </Typography>
            <Typography variant="body2"> 3. Any reactions you've given to posts or content will also be deleted.</Typography>
        </Stack>
        <Stack>
            <Button variant="outlined" sx={{ textTransform: "none" }} 
              onClick={onNext}
            > I have read and understand these consequences </Button>
        </Stack>

      </Stack>

      </Dialog>
    )

}

const deleteCofirmContent = "delete my account"

// msgs
const deleteOk = "Account deleted"
const deleteFailed = "Failed to delete. Try again later."

function DeleteConfirmation({open, setOpen}){ 
    const navigate = useNavigate();
    const [content, setContent] = useState("")
    const [isDeleteDisabled, setIsDeleteDisbled] = useState(true)

    const handleChange = (event) => {
        const typedText = event?.target?.value
        if (typedText === deleteCofirmContent) {
            setIsDeleteDisbled(false)
        } else {
            setIsDeleteDisbled(true)
        }
        setContent(typedText)
    }

    const onDeleteUser = async () => {
        try {
            const isSucceeded =  await DeleteUser()
            if (isSucceeded) {
                alert(deleteOk)
                setOpen(false)
                CleanLS()
                navigate(LoginPath, { replace: true });
                return
            }

        } catch (err) {
            if (err instanceof UnAuthorizedError) {
                navigate(LoginPath, { replace: true });
                return
            }
        }
        alert(deleteFailed)
        setOpen(false)
    }

    return (
        <Dialog
            open={open} 
            scroll={"paper"}
            aria-labelledby="delete-confirm-model-title"
            aria-describedby="delete-confirm-model-description"
        >
        <Stack sx={{ width: "600px", padding: "10px", marginBottom: "5px"}} spacing={2} >

            <div>
            <Stack direction={"row"} justifyContent={"space-between"} >
                <Stack justifyContent={"center"} >
                    <Typography sx={{fontWeight: "bold" }} > Delete this account </Typography>
                </Stack>

                <IconButton aria-label="delete-conseq-close-btn" onClick={() => setOpen(false)}>
                    <CloseIcon />
                </IconButton>
            </Stack>
            <Divider />
            </div>

            <Stack spacing={2}>
                <Typography> To confirm, type "{deleteCofirmContent}" (without quotes) in the box below. </Typography>
                <TextField
                    value={content}
                    onChange={handleChange}
                />
            </Stack>

            <Stack alignItems={"center"}>
                <Button variant="outlined" disabled={isDeleteDisabled} onClick={onDeleteUser}
                    sx={{ width: "80%", bgcolor: "red", color: "black", fontWeight: "bold"}}> 
                    Delete this Account 
                </Button>
            </Stack>

        </Stack>
        </Dialog>
    )
}
