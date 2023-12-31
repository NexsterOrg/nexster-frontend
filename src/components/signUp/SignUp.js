import { useCallback, useMemo, useState, useEffect } from "react";
import { Stack, Typography, Divider, Paper, Button, Avatar, useTheme } from "@mui/material"
import ImageUploading from 'react-images-uploading';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

import { TextFieldWithCount } from "../ui/TextComponents";
import { BasicSelect } from "../ui/Select";
import { BasicDatePicker } from '../ui/DatePicker';
import { SaveLoading } from '../ui/LoadingComponents';

// options 
import { FieldOptions, FacultyOptions , defaultField, defaultFaculty, BatchOptions, defaultBatch,  GenderOptions, defaultGender,
    FacultEngineering } from "../settings/Options";

import PasswordField from "../ui/PasswordField"

import { BottomLeftSnackbar } from '../ui/snack_bar';

import { LoginPath, ValidateAccountCreationLink, accCreateLinkPath, UploadImage, CreateUserAccount } from "../../apis/fetch";

// namespace
const avatarNamespace = "avatar" 

// widths
const selectWidth = 120

const maxNameCount = 25
const maxAboutCount = 250
const maxAboutRows = 3

// dates
const maxDate = dayjs("2022-12-31")
const minDate = dayjs("1990-01-01")
const defaultBirthday = dayjs("2022-01-01")

// password
const maxPasswordLn = 30
const minPasswordLn = 8

// messages
const createdOk = "Account created successfully!. Redirecting to login page."
const createFailed = "Account creation failed. Please try again."
const cantEmpty = "Field cannot be empty"
const formNotDulyFilled = "Some required fields are empty."
const uploadImageFailedErr = "Failed to upload the image. Try again."

const passwdNotEnoughLenMsg = `Passwords must at least have ${minPasswordLn} characters.`
const bothPasswdNotSameMsg = "Both passwords should be same."

// TODO: Change later

export default function SignUpSite() {

    const [urlValid, setUrlValid] = useState(false)

    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    const index = searchParams.get('index') || "";
    const expAt = searchParams.get('exp') || "";
    const hmac = searchParams.get('hmac') || "";

    useEffect( () => {
        (async () => {
            try {
              const isValid = await ValidateAccountCreationLink(index, expAt, hmac);
              if(isValid) {
                setUrlValid(true)
                return 
              }
            } catch (err) {
                console.error('Error validating URL:', err); // TODO : Remove this in production
            }

            alert("Invalid account creation URL. Get a new link.")
            navigate(accCreateLinkPath, { replace: true });
            return;

        })();
    }, [])

    if(!urlValid){
        return <>Error...</>
    }

    return <SignUp indexNo={index} expiredAt={expAt} hmac={hmac}/>
    
}

function SignUp({indexNo, expiredAt, hmac}) {
    const navigate = useNavigate();
    const theme = useTheme();

    const [saveSpinner, startSaveSpinner] = useState(false)
    const [snackBarOpen, setSnackBarOpen] = useState(false)

    const [images, setImages] = useState([]);
    const [imagesErr, setImagesErr] = useState("");

    const [firstName, setFirstName] = useState("")
    const [firstNameErr, setFirstNameErr] = useState("")

    const [secondName, setSecondName] = useState("")
    const [secondNameErr, setSecondNameErr] = useState("")

    const [about, setAbout] = useState("")
    const [aboutErr, setAboutErr] = useState("")

    const [faculty, setFaculty] = useState("")

    const [field, setField] = useState("")

    const [batch, setBatch] = useState("")

    const [gender, setGender] = useState("")

    const [birthday, setBirthday] = useState("")  // eg: initBirthday = 2002-05-24
    const [birthdayErr, setBirthdayErr] = useState("")

    const [password, setPassword] = useState("")
    const [ passwordErr, setPasswordErr ] = useState("")

    const [retypedPassword, setRetypedPassword] = useState("")
    const [ retypedPasswordErr, setRetypedPasswordErr ] = useState("")

    const [formErr, setFormErr] = useState("")

    const modeColor = theme.palette.mode === 'dark' ? 'white' : 'black' ;

    const isPasswdNotEmpty = password.length !== 0

    const passwdNotEnoughLen = isPasswdNotEmpty && password.length < 8

    const passwordsNotMatched = (isPasswdNotEmpty && retypedPassword !== "" && password !== retypedPassword)  // check whether passwords are matched or not.

    const onCancel = useCallback(() => {
        setImages([])
        setImagesErr("")
        setFirstName("")
        setFirstNameErr("")
        setSecondName("")
        setSecondNameErr("")
        setAbout("")
        setAboutErr("")
        setFaculty("")
        setField("")
        setBatch("")
        setGender("")
        setBirthday("")
        setBirthdayErr("")

        setPassword("")
        setPasswordErr("")
        setRetypedPassword("")
        setRetypedPasswordErr("")
    }, [])

    const onCreate = async () => {
        if( !isPasswdNotEmpty || retypedPassword.length === 0) {
            // passwords are not duly filled
            setFormErr("Please set a password")
            setSnackBarOpen(true)
            return
        }
        if(passwdNotEnoughLen){
            setFormErr(passwdNotEnoughLenMsg)
            setSnackBarOpen(true)
            return
        }

        if(passwordsNotMatched){
            setFormErr(bothPasswdNotSameMsg)
            setSnackBarOpen(true)
            return
        }

        if (images.length === 0) {
            setImagesErr("Please upload a profile picture")
            return
        }
        if (firstName === "") {
            setFirstNameErr(cantEmpty)
            return
        }
        if (secondName === "") {
            setSecondNameErr(cantEmpty)
            return
        }
        if (batch === "" || gender === "" || faculty === "" || birthday === "") {
            setFormErr(formNotDulyFilled)
            setSnackBarOpen(true)
            return
        }
        if (faculty === FacultEngineering && field === "" ) {
            setFormErr(formNotDulyFilled)
            setSnackBarOpen(true)
            return
        }

        startSaveSpinner(true)

        try {

            const img = images[0]
            const typeName = getImageType(img["file"]["type"])
            const imageName = await UploadImage(avatarNamespace, typeName, img["data_url"])
      
            if(imageName === "") {
              startSaveSpinner(false)
              setFormErr(uploadImageFailedErr)
              setSnackBarOpen(true)
              return
            } 

            const isSucceeded = await CreateUserAccount(firstName, secondName, imageName, birthday, faculty, field, batch, about, gender, password,
                indexNo, expiredAt, hmac)
            if(isSucceeded){
                // ok - direct to login page
                setFormErr("")
                onCancel()
                startSaveSpinner(false)
                alert(createdOk)
                navigate(LoginPath, { replace: true });
                return
            }
            setFormErr(createFailed)
            setSnackBarOpen(true)
        } catch (error) {
            setFormErr(createFailed)
            setSnackBarOpen(true)
        }
        startSaveSpinner(false)
        // setFormErr("")
    }
    const snackInfo =  useMemo(() => formErr === "" ? {level: "success", msg: createdOk} : {level: "error", msg: formErr}, [formErr]) 

    return (
        <Stack alignItems={"center"} sx={ { bgcolor: 'background.default', minHeight: "100vh" } }>
            <Stack sx={{ width: "60%", paddingY: "15px" }}>
            
            {  saveSpinner ? <SaveLoading rootStyles={{marginTop: 10}} label={"Creating..."}/>  :
                <Paper sx={{ paddingX: "15px", paddingBottom: "20px" }} elevation={4}>
                <SignUpHeader />

                <Stack spacing={2}>
                    <Typography sx={{ marginTop: "18px"}} variant="body2">
                        Use <b> {indexNo} </b> for your future logins. Set a new password for your Nexster account.
                    </Typography>

                    <Stack direction={"row"} spacing={2}>
                        <PasswordField content={password} setContent={setPassword} textErr={passwordErr} setTextErr={setPasswordErr} 
                                maxCount={maxPasswordLn} label={"Password*"} htmlId={"acc-create-new-passwd"}/>
                        
                        <PasswordField content={retypedPassword} setContent={setRetypedPassword} textErr={retypedPasswordErr} 
                            setTextErr={setRetypedPasswordErr} maxCount={maxPasswordLn} label={"Retype Password*"} htmlId={"acc-create-confirm-passwd"}/>

                        <Stack justifyContent={"center"}>
                            <Typography variant="body2"> * Password should be {minPasswordLn} to {maxPasswordLn} characters long </Typography>
                            <Typography variant="body2"> * Include a mix of uppercase and lowercase letters, numbers, and special characters. </Typography>
                            <Typography variant="body2"> * Retype your password again to confirm the password. </Typography>
                        </Stack>
                    </Stack>
                </Stack>
                {
                    passwdNotEnoughLen ?
                    <Typography sx={{ color: "red" }} variant="caption"> {passwdNotEnoughLenMsg} </Typography> : 
                    passwordsNotMatched ? 
                    <Typography sx={{ color: "red" }} variant="caption"> {bothPasswdNotSameMsg} </Typography> : null
                }

                <ProfileImageUpload 
                    images={images} setImages={setImages} 
                    uploadErr={imagesErr} setUploadErr={setImagesErr}
                />

                <Stack sx={{ paddingX: "10px", marginTop: "30px" }} spacing={3}>
                    
                    <Stack direction={"row"} spacing={6}>
                        <TextFieldWithCount content={firstName} setContent={setFirstName} textErr={firstNameErr} setTextErr={setFirstNameErr} variant="outlined" 
                            textFieldStyles={{width: "100%"}} maxCount={maxNameCount} required={true} multiline={false} label={"First name"} maxRows={1} />

                        <TextFieldWithCount content={secondName} setContent={setSecondName} textErr={secondNameErr} setTextErr={setSecondNameErr} variant="outlined" 
                            textFieldStyles={{width: "100%"}} maxCount={maxNameCount} required={true} multiline={false} label={"Second name"} maxRows={1} />
                    </Stack>

                    <Stack>
                        <TextFieldWithCount content={about} setContent={setAbout} textErr={aboutErr} setTextErr={setAboutErr} variant="outlined" placeholder={"About (optional)"}
                            textFieldStyles={{width: "80%"}} maxCount={maxAboutCount} required={false} multiline={true} label={"About"} maxRows={maxAboutRows} />
                    </Stack>

                    <Stack direction={"row"} spacing={6}>
                        <BasicSelect value={batch} setValue={setBatch} label={"Batch *"} styles={{paddingTop: "8px", width: selectWidth}} 
                            defaultValue={defaultBatch} options={BatchOptions}/>

                        <BasicSelect value={faculty} setValue={setFaculty} label={"Faculty *"} styles={{paddingTop: "8px", width: selectWidth}} 
                            defaultValue={defaultFaculty} options={FacultyOptions}/>

                        {
                            faculty === FacultEngineering ? 

                            <BasicSelect value={field} setValue={setField} label={"Field"} styles={{paddingTop: "8px", width: selectWidth}} 
                                defaultValue={defaultField} options={FieldOptions}/> : null
                        }

                    </Stack>

                    <Stack direction={"row"} spacing={6}>
                        <BasicSelect value={gender} setValue={setGender} label={"Gender *"} styles={{paddingTop: "8px", width: selectWidth}} 
                            defaultValue={defaultGender} options={GenderOptions}/>

                        <BasicDatePicker label={"Birthday *"} value={birthday} setValue={setBirthday} textErr={birthdayErr} setTextErr={setBirthdayErr} 
                            maxDate={maxDate} minDate={minDate} defaultDate={defaultBirthday} />
                    </Stack>

                    <Stack direction={"row-reverse"} spacing={1} >
                        <Button sx={{ textTransform: "none"}} variant="outlined" onClick={onCancel}> Cancel </Button>
                        <Button sx={{ textTransform: "none"}} variant="contained" onClick={onCreate}> Create </Button>
                    </Stack> 

                </Stack>
            </Paper>
            }

            <BottomLeftSnackbar open={snackBarOpen} setOpen={setSnackBarOpen} level={snackInfo.level} msg={snackInfo.msg}/>
            </Stack>
        </Stack>
    )
}


function SignUpHeader(){
    return (
      <>
      <Stack direction={"row"} justifyContent={"center"} sx={{paddingY: "10px"}}>
          <Typography sx={{fontWeight: "bold"}} > Create new account in Nexster </Typography>
      </Stack>
      <Divider />
      </>
    )
}


function ProfileImageUpload({images, setImages, uploadErr, setUploadErr}){

    const onChange = (imageList) => {
      setUploadErr("")
      setImages(imageList);
    };
  
    return (
      <ImageUploading
          value={images}
          onChange={onChange}
          dataURLKey="data_url"
          acceptType={['jpg', 'png']}
      >
        {({
          imageList,
          onImageUpload
        }) => (
        <>
          <Stack alignItems="center" spacing={2}>
              <Stack sx={{width: 500, height: 300, marginTop: 2 }} justifyContent={"center"} alignItems={"center"}>
                {
                  imageList.length ? 
                  imageList.map((img, index) => (
                    <Avatar key={index} variant='square'
                      src={img['data_url']}
                      sx={{width: 500, height: 300 }}
                    />
                  )) : <> 
                        <PersonIcon sx={{ width: 80, height: 80 }}/> 
                        { uploadErr ? <Typography sx={{color: "red"}}> *{uploadErr} </Typography> : null }
                      </>
                }
  
              </Stack>
              <Button variant='contained' sx={{textTransform: "none"}} onClick={onImageUpload} size='small'> Upload Profile Picture </Button>
          </Stack>
        </>
        )}
        </ImageUploading>
    )
  }

function getImageType(mimeType){
    if(typeof mimeType !== "string") return ""
    const parts = mimeType.split('/');
    return parts.length !== 2  ? "" : parts[1]
}
