import { useState, useMemo,useEffect } from 'react';
import { Box, Paper, Grid, Stack, Typography, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { CreateAd, afterAdCreatePath, isLogged } from '../apis/api';
import TopNavBar from "../Components/TopNavBar";
import { TypedTextField, TextFieldWithCount } from '../../components/ui/TextComponents';
import { BasicSelect } from '../../components/ui/Select';
import { includeBill, excludeBill, noPrefer, genderOptions } from "../Ad/AdFilters"
import ImageUploader from "../../antd/components/ImageUploader";
import { ConfirmDialog } from "../../components/ui/menu_button";
import { SaveLoading } from "../../components/ui/LoadingComponents";
import { BottomLeftSnackbar } from "../../components/ui/snack_bar";

const billOptions = [
    {label: "Include", value: includeBill },
    {label: "Exclude", value: excludeBill }
]

const addrOptions = [
    {label: "Yes", value: true },
    {label: "No", value: false }
]

const selectWidth = {
    xl: 130,
    lg: 125,
    xmd: 120,
    md: 115,
    sm: 110
}

const cardWidth = {
    xl: "60%",
    lg: "60%",
    xmd: "60%",
    md: "70%",
    sm: "85%",
    xs: "90%"
}

const rentFieldWidth = {
    xl: "60%",
    lg: "60%",
    xmd: "60%",
    md: "60%",
    sm: "60%",
    xs: "100%"
}

// messages
const confirmQuestion = "Submit the Ad ?"
const confirmContent = "Select 'Yes' to submit your Ad request or 'No' to go back editing."
const invalidInput = "Invalid input."
const createdOk = "Ad request successfully submitted."
const createFailed = "Ad request submission failed. Please try again."

function AdCreate(){
    const navigate = useNavigate();

    const [saveSpinner, startSaveSpinner] = useState(false)
    const [snackBarOpen, setSnackBarOpen] = useState(false)

    const [rent, setRent] = useState(0)
    const [rentErr, setRentErr] = useState("")

    const [beds, setBeds] = useState(0)
    const [bedsErr, setBedsErr] = useState("")

    const [baths, setBaths] = useState(0)
    const [bathsErr, setBathsErr] = useState("")

    const [bill, setBill] = useState(includeBill)
    const [gender, setGender] = useState(noPrefer)
    const [sameAsOwnerAddr, setSameAsOwnerAddr] = useState(false)

    const [address, setAddress] = useState("")
    const [addressErr, setAddressErr] = useState("")

    const [description, setDescription] = useState("")
    const [descriptionErr, setDescriptionErr] = useState("")

    const [imgIds, setImgIds] = useState([])

    const [openDialog, setOpenDialog] = useState(false)
    const [formErr, setFormErr] = useState("")

    useEffect(() => {
        (async () => await isLogged(navigate))()
    }, [])

    const onSubmit = () => {
        if(rent <= 0) {
            setRentErr(invalidInput)
            return
        }
        if(beds <= 0) {
            setBedsErr(invalidInput)
            return
        }
        if(baths <= 0) {
            setBathsErr(invalidInput)
            return
        }
        if(!sameAsOwnerAddr && address === ""){
            setAddressErr("Can't be empty")
            return
        }
        if(imgIds.length === 0){
            setFormErr("At least one image is needed.")
            setSnackBarOpen(true)
            return
        }
        setOpenDialog(true)
    }

    const onYes = async () => {
        setOpenDialog(false)

        startSaveSpinner(true)

        try {
            const calGender = gender === noPrefer ? "any" : gender
            const isSucceeded = await CreateAd(description, bill, imgIds, rent, address, beds, baths, calGender, sameAsOwnerAddr)

            if(isSucceeded){
                setFormErr("")
                startSaveSpinner(false)
                alert(createdOk)
                navigate(afterAdCreatePath, { replace: true });
                return
            }
            setFormErr(createFailed)
            setSnackBarOpen(true)

        } catch (error) {
            setFormErr(createFailed)
            setSnackBarOpen(true)
        }
        startSaveSpinner(false)
    }

    const snackInfo =  useMemo(() => formErr === "" ? {level: "success", msg: createdOk} : {level: "error", msg: formErr}, [formErr]) 

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
            {
                saveSpinner ? <SaveLoading rootStyles={{marginTop: 10}} label={"Creating..."}/>  : 
                <Paper elevation={3}
                    sx={{ flexGrow: 1, maxWidth: cardWidth, marginTop: "20px"}}>
                    <Header />
                    <Grid columnSpacing={2} rowSpacing={4} container sx={{ marginTop: "10px", marginBottom: "40px", paddingX: "12px" }} >
                        <Grid item xs={8} md={4}>
                            <TypedTextField content={rent} setContent={setRent} textErr={rentErr} setTextErr={setRentErr} variant="outlined" 
                                required={true} label={"Rent per person, month"} styles={{ width: rentFieldWidth}} />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TypedTextField content={beds} setContent={setBeds} textErr={bedsErr} setTextErr={setBedsErr} variant="outlined" 
                                required={true} label={"Beds"} styles={{ width: "60%"}}/>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TypedTextField content={baths} setContent={setBaths} textErr={bathsErr} setTextErr={setBathsErr} variant="outlined" 
                                required={true} label={"Baths"} styles={{ width: "60%"}} />
                        </Grid>

                        <Grid item xs={6} md={4}> 
                            <BasicSelect value={bill} setValue={setBill}
                                label={"Bill"} styles={{paddingTop: "8px"}} defaultValue={includeBill}
                                options={billOptions}/>
                        </Grid>
                        <Grid item xs={6} md={4}> 
                            <BasicSelect value={gender} setValue={setGender}
                                label={"Gender"} styles={{paddingTop: "8px"}} defaultValue={noPrefer}
                                options={genderOptions}/>
                        </Grid>
                        <Grid item xs={10} md={4}> 
                            <BasicSelect value={sameAsOwnerAddr} setValue={setSameAsOwnerAddr}
                                label={"Same as owner's address?"} styles={{paddingTop: "8px"}} defaultValue={false}
                                options={addrOptions}/>
                        </Grid>

                        {
                          sameAsOwnerAddr ? null : 
                            <Grid item xs={12} md={6}> 
                                <TextFieldWithCount content={address} setContent={setAddress} textErr={addressErr} setTextErr={setAddressErr} variant="outlined" 
                                    textFieldStyles={{ width: "100%" }} maxCount={200} required={true} multiline={true} label={"Address"} maxRows={5} />
                            </Grid>

                        }


                        <Grid item xs={12}> 
                            <ImageUploader setImgArr={setImgIds} namespace={"bdAds"} maxImgCount={5}/>
                        </Grid>

                        <Grid item xs={12} md={10}> 
                            <TextFieldWithCount content={description} setContent={setDescription} textErr={descriptionErr} setTextErr={setDescriptionErr} variant="outlined" 
                                textFieldStyles={{ width: "100%" }} maxCount={800} required={false} multiline={true} label={"Description (optional)"} maxRows={10} />
                        </Grid>
                    </Grid>
                    <Stack sx={{ marginBottom: "20px"}} alignItems={"flex-end"}>
                        <Button variant="contained" onClick={onSubmit}
                            sx={{ textTransform: "none", width: "100px", bgcolor: "#35dbcb", marginRight: "25px"}}> Submit </Button> 
                    </Stack>
                </Paper>
            }
            <ConfirmDialog open={openDialog} setOpen={setOpenDialog} onYes={onYes} onNo={() => {}}
                question={confirmQuestion} content={confirmContent}/>
            <BottomLeftSnackbar open={snackBarOpen}  setOpen={setSnackBarOpen} level={snackInfo.level} msg={snackInfo.msg}/>
        </Box>
    )
}

function Header(){
    return (
      <>
      <Stack direction={"row"} justifyContent={"center"} sx={{paddingY: 1}}>
          <Typography sx={{fontWeight: "bold"}} > Create a new Ad </Typography>
      </Stack>
      <Divider />
      </>
    )
}  

export default function AdCreatePage(){
    return (
        <TopNavBar childComponent={ <AdCreate />} title={"Nexster BoardingFinder"}/>
    )
}
