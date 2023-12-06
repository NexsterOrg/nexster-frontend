import { useState } from "react";
import { Typography, Stack, Card, CardContent , Button} from "@mui/material";
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { TextFieldWithUpdateIndicator } from "../ui/TextComponents";
import { SelectWithUpdateIndicator } from "../ui/Select";
import { DatePickerWithUpdateIndicator } from '../ui/DatePicker';

// options 
import { FieldOptions, FacultyOptions , defaultField, defaultFaculty, BatchOptions, defaultBatch,  GenderOptions, defaultGender,
    FacultEngineering } from "./Options";
import { BottomLeftSnackbar } from '../ui/snack_bar';

import { UpdateBasicUserInfo, UnAuthorizedError, LoginPath } from "../../apis/fetch";

// widths
const selectWidth = 120

const maxNameCount = 25
const maxAboutCount = 250
const maxAboutRows = 3

const maxDate = dayjs("2022-12-31")
const minDate = dayjs("1990-01-01")

const updatedOk = "Successfully updated"
const updateFailed = "Failed to update. Try again later."

// take the root style.
export function EditProfile({userId, initFirstName, initSecondName, initAbout, initFaculty, initField, initBatch, initGender, initBirthday}){
    const navigate = useNavigate();

    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [updateSucceeded, setUpdateSucceeded] = useState(false)

    const [firstName, setFirstName] = useState(initFirstName)
    const [firstNameErr, setFirstNameErr] = useState("")
    const [firstNameChanged, setFirstNameChanged] = useState(false)

    const [secondName, setSecondName] = useState(initSecondName)
    const [secondNameErr, setSecondNameErr] = useState("")
    const [secondNameChanged, setSecondNameChanged] = useState(false)

    const [about, setAbout] = useState(initAbout)
    const [aboutErr, setAboutErr] = useState("")
    const [aboutChanged, setAboutChanged] = useState(false)
    
    const [faculty, setFaculty] = useState(initFaculty)
    const [facultyChanged, setFacultyChanged] = useState(false)

    const [field, setField] = useState(initField)
    const [fieldChanged, setFieldChanged] = useState(false)

    const [batch, setBatch] = useState(initBatch)
    const [batchChanged, setBatchChanged] = useState(false)

    const [gender, setGender] = useState(initGender)
    const [genderChanged, setGenderChanged] = useState(false)

    const [birthday, setBirthday] = useState( dayjs(initBirthday) )  // eg: initBirthday = 2002-05-24
    const [birthdayErr, setBirthdayErr] = useState("")
    const [birthdayChanged, setBirthdayChanged] = useState(false)

    const onDiscard = () => {
        if (firstNameChanged) {
            setFirstName(initFirstName)
            setFirstNameChanged(false)
        }
        if (secondNameChanged) {
            setSecondName(initSecondName)
            setSecondNameChanged(false)
        }
        if (aboutChanged) {
            setAbout(initAbout)
            setAboutChanged(false)
        }
        if(facultyChanged){
            setFaculty(initFaculty)
            setFacultyChanged(false)
        }
        if (fieldChanged) {
            setField(initField)
            setFieldChanged(false)
        }
        if (batchChanged) {
            setBatch(initBatch)
            setBatchChanged(false)
        }
        if (genderChanged) {
            setGender(initGender)
            setGenderChanged(false)
        }
        if(birthdayChanged){
            setBirthday( dayjs(initBirthday))
            setBirthdayChanged(false)
        }
    }

    const onSave = () => {
        let updatedFields = {}

        if (faculty === FacultEngineering && (field === "" || field === undefined || field === null)) {
            alert("field can not be empty")
            return
        }

        if (firstNameChanged) {
            updatedFields["firstName"] = firstName
        }
        if (secondNameChanged) {
            updatedFields["secondName"] = secondName
        }
        if (aboutChanged) {
            updatedFields["about"] = about
        }
        if(facultyChanged){
            updatedFields["faculty"] = faculty
        }
        if (fieldChanged) {
            updatedFields["field"] = field
        }
        if (batchChanged) {
            updatedFields["batch"] = batch
        }
        if (genderChanged) {
            updatedFields["gender"] = gender
        }
        if(birthdayChanged){
            updatedFields["birthday"] = birthday
        }
        
        (async () => {
            try {
                let isSucceeded = await UpdateBasicUserInfo(updatedFields);
                setUpdateSucceeded(isSucceeded)
                if (isSucceeded) {
                    setFirstNameChanged(false)
                    setSecondNameChanged(false)
                    setAboutChanged(false)
                    setFacultyChanged(false)
                    setFieldChanged(false)
                    setBatchChanged(false)
                    setGenderChanged(false)
                    setBirthdayChanged(false)
                }

            } catch (err) {
                if (err instanceof UnAuthorizedError) {
                    navigate(LoginPath, { replace: true });
                    return
                } 
                setUpdateSucceeded(false)
                console.error('Error fetching user profile info:', err); // TODO : Remove this in production
            }
        })();

        setSnackBarOpen(true)
    }

    const snackInfo = updateSucceeded ? {level: "success", msg: updatedOk} : {level: "error", msg: updateFailed}

    return (
        <Card sx={{ margin: "15px", width: "90%"  }} > 
        <CardContent>
            <Stack sx={{ paddingX: "10px" }} spacing={3}>
                <Typography variant="h6" sx={{ marginTop: "5px", fontWeight: "bold"}}> 1. Edit Profile </Typography>

                <Stack direction={"row"} spacing={6}>
                    <TextFieldWithUpdateIndicator content={firstName} setContent={setFirstName} textErr={firstNameErr} setTextErr={setFirstNameErr} variant="outlined" 
                        textFieldStyles={{width: "100%"}} maxCount={maxNameCount} required={true} multiline={false} label={"First name"} maxRows={1}
                        isChanged={firstNameChanged} setIsChanged={setFirstNameChanged}/>

                    <TextFieldWithUpdateIndicator content={secondName} setContent={setSecondName} textErr={secondNameErr} setTextErr={setSecondNameErr} variant="outlined" 
                        textFieldStyles={{width: "100%"}} maxCount={maxNameCount} required={true} multiline={false} label={"Second name"} maxRows={1}
                        isChanged={secondNameChanged} setIsChanged={setSecondNameChanged} />
                </Stack>

                <Stack>
                    <TextFieldWithUpdateIndicator content={about} setContent={setAbout} textErr={aboutErr} setTextErr={setAboutErr} variant="outlined" 
                        textFieldStyles={{width: "80%"}} maxCount={maxAboutCount} required={true} multiline={true} label={"About"} maxRows={maxAboutRows}
                        isChanged={aboutChanged} setIsChanged={setAboutChanged} />
                </Stack>

                <Stack direction={"row"} spacing={6}>
                    <SelectWithUpdateIndicator value={batch} setValue={setBatch}  isChanged={batchChanged} setIsChanged={setBatchChanged}
                        label={"Batch"} styles={{paddingTop: "8px", width: selectWidth}} defaultValue={defaultBatch}
                        options={BatchOptions}/>

                    <SelectWithUpdateIndicator value={faculty} setValue={setFaculty} isChanged={facultyChanged} setIsChanged={setFacultyChanged}
                        label={"Faculty"} styles={{paddingTop: "8px", width: selectWidth}} defaultValue={defaultFaculty}
                        options={FacultyOptions}/>

                    {
                        faculty === FacultEngineering ? 

                        <SelectWithUpdateIndicator value={field} setValue={setField} isChanged={fieldChanged} setIsChanged={setFieldChanged}
                        label={"Field"} styles={{paddingTop: "8px", width: selectWidth}} defaultValue={defaultField} options={FieldOptions}/> : null
                    }

                </Stack>

                <Stack direction={"row"} spacing={6}>
                    <SelectWithUpdateIndicator value={gender} setValue={setGender}  isChanged={genderChanged} setIsChanged={setGenderChanged}
                        label={"Gender"} styles={{paddingTop: "8px", width: selectWidth}} defaultValue={defaultGender}
                        options={GenderOptions}/>

                    <DatePickerWithUpdateIndicator label={"Birthday"} value={birthday} setValue={setBirthday} textErr={birthdayErr} setTextErr={setBirthdayErr} 
                        maxDate={maxDate} minDate={minDate} isChanged={birthdayChanged} setIsChanged={setBirthdayChanged}/>
                </Stack>

                {
                    (firstNameChanged || secondNameChanged || facultyChanged || fieldChanged || batchChanged || genderChanged
                        || birthdayChanged || aboutChanged) ? 
                    <Stack direction={"row-reverse"} spacing={1} >
                        <Button sx={{ textTransform: "none"}} variant="outlined" onClick={onDiscard}> Discard </Button>
                        <Button sx={{ textTransform: "none"}} variant="contained" onClick={onSave}> &nbsp;Save&nbsp; </Button>
                    </Stack> : null
                }

            </Stack>
        </CardContent>
        <BottomLeftSnackbar open={snackBarOpen}  setOpen={setSnackBarOpen} level={snackInfo.level} msg={snackInfo.msg}/>
        </Card>
    )    
}
