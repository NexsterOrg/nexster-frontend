
const defaultFaculty = "Architecture"
const defaultField =  "Chemical & Process Engineering"
const defaultBatch = "19"
const defaultGender = "female"

const FacultEngineering = "Engineering"

const FacultyOptions = [
    {label: "Architecture", value: "Architecture"},
    {label: "Business", value: "Business"},
    {label: "Engineering", value: "Engineering"},
    {label: "IT", value: "IT"},
    {label: "Medicine", value: "Medicine"},
]

const FieldOptions = [
    {label: "Chemical & Process Engineering", value: "Chemical & Process Engineering"},
    {label: "Civil Engineering", value: "Civil Engineering"},
    {label: "Computer Science & Engineering", value: "Computer Science & Engineering"},
    {label: "Earth Resource Engineering", value: "Earth Resource Engineering"},
    {label: "Electrical Engineering", value: "Electrical Engineering"},
    {label: "Electronic & Telecommunication Engineering", value: "Electronic & Telecommunication Engineering"},
    {label: "Materials Science & Engineering", value: "Materials Science & Engineering"},
    {label: "Mechanical Engineering", value: "Mechanical Engineering"},
    {label: "Textile & Apparel Engineering ", value: "Textile & Apparel Engineering "},
    {label: "Transport Management & Logistic Engineering", value: "Transport Management & Logistic Engineering"},
    {label: "Fashion Design and Product Development", value: "Fashion Design and Product Development"}
]

const BatchOptions = [
    {label: "19", value: "19"},
    {label: "20", value: "20"},
    {label: "21", value: "21"},
    {label: "22", value: "22"}
]

const GenderOptions = [
    {label: "Female", value: "female"},
    {label: "Male", value: "male"},
]

export {
    FieldOptions, FacultyOptions, defaultFaculty, defaultField, BatchOptions, defaultBatch, GenderOptions, defaultGender, FacultEngineering
}