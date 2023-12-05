import { useState } from "react";
import { Typography, Stack, Card, CardContent , Button} from "@mui/material";
import { TextFieldWithUpdateIndicator } from "../ui/TextComponents";
import { SelectWithUpdateIndicator } from "../ui/Select";
import { DatePickerWithUpdateIndicator } from '../ui/DatePicker';
import dayjs from 'dayjs';

// widths
const selectWidth = 120

const maxNameCount = 25
const maxAboutCount = 250
const maxAboutRows = 3

// options
const facultyOptions = [
    {label: "Engineering", value: "engineering"},
    {label: "Medicine", value: "medicine"},
    {label: "IT", value: "it"},
]

const fieldOptions = [
    {label: "Electronic & Telecommunication Engineering", value: "entc"},
    {label: "Computer Scienct & Eng.", value: "CSE"},
    {label: "Civil", value: "civil"},
]

const batchOptions = [
    {label: "18 Batch", value: "18"},
    {label: "19 Batch", value: "19"},
    {label: "20 Batch", value: "20"},
]

const genderOptions = [
    {label: "Male", value: "male"},
    {label: "Female", value: "female"},
]

const maxDate = dayjs("2022-12-31")
const minDate = dayjs("1995-01-01")

// take the root style.
export function EditProfile({initFirstName, initSecondName, initAbout, initFaculty, initField, initBatch, initGender, initBirthday}){

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

    // if(firstName !== initFirstName) setFirstNameChanged(true)
    // if(secondName !== initSecondName) setSecondNameChanged(true)
    // if(about !== initAbout) setAboutChanged(true)
    // if(faculty !== initFaculty) setFacultyChanged(true)
    // if(field !== initField) setFieldChanged(true)
    // if(batch !== initBatch) setBatchChanged(true)
    // if(gender !== initGender) setGenderChanged(true)
    // if(birthday !== initBirthday) setBirthdayChanged(true)

    console.log(birthday, birthdayChanged)

    return (
        <Card sx={{ margin: "15px", width: "90%"  }} > 
        <CardContent>
            <Stack sx={{ paddingX: "10px" }} spacing={3}>
                <Typography variant="h6" sx={{ marginTop: "5px"}}> 1. Edit Profile </Typography>

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
                    <SelectWithUpdateIndicator value={faculty} setValue={setFaculty} isChanged={facultyChanged} setIsChanged={setFacultyChanged}
                        label={"Faculty"} styles={{paddingTop: "8px", width: selectWidth}} defaultValue="engineering"
                        options={facultyOptions}/>

                    <SelectWithUpdateIndicator value={field} setValue={setField} isChanged={fieldChanged} setIsChanged={setFieldChanged}
                        label={"Field"} styles={{paddingTop: "8px", width: selectWidth}} defaultValue="entc"
                        options={fieldOptions}/>

                    <SelectWithUpdateIndicator value={batch} setValue={setBatch}  isChanged={batchChanged} setIsChanged={setBatchChanged}
                        label={"Batch"} styles={{paddingTop: "8px", width: selectWidth}} defaultValue="18"
                        options={batchOptions}/>
                </Stack>

                <Stack direction={"row"} spacing={6}>
                    <SelectWithUpdateIndicator value={gender} setValue={setGender}  isChanged={genderChanged} setIsChanged={setGenderChanged}
                        label={"Gender"} styles={{paddingTop: "8px", width: selectWidth}} defaultValue="male"
                        options={genderOptions}/>

                    <DatePickerWithUpdateIndicator label={"Birthday"} value={birthday} setValue={setBirthday} textErr={birthdayErr} setTextErr={setBirthdayErr} 
                        maxDate={maxDate} minDate={minDate} isChanged={birthdayChanged} setIsChanged={setBirthdayChanged}/>
                </Stack>

                {
                    (firstNameChanged || secondNameChanged || facultyChanged || fieldChanged || batchChanged || genderChanged
                        || birthdayChanged || aboutChanged) ? 
                    <Stack direction={"row-reverse"} spacing={1} >
                        <Button sx={{ textTransform: "none"}} variant="outlined"> Discard </Button>
                        <Button sx={{ textTransform: "none"}} variant="contained"> &nbsp;Save&nbsp; </Button>
                    </Stack> : null
                }

            </Stack>
        </CardContent>
        </Card>
    )    
}
