import { TextField, Paper, Stack, Button, Typography, Box} from "@mui/material";
import { BasicSelect } from "../../components/ui/Select";
import { useEffect, useState } from "react";

// sort types
export const mostRecent = "mostRecent" // default type
export const lowestPrice = "lowestPrice"

const sortOptions = [
    {label: "Most recent", value: mostRecent},
    {label: "Lowest price", value: lowestPrice}
]

export const noPrefer = "noPreference"
const genderOptions = [
    {label: "Girls", value: "girls"},
    {label: "Boys", value: "boys"},
    {label: "No preference", value: noPrefer}
]

export const billTypes = ["include", "exclude"]

export const defaultMin = 1
export const defaultMax = 10000

export default function AdFilters({sortType, setSortType, gender, setGender, setRentMin, setRentMax, 
    setBedsMin, setBedsMax, setBathsMin, setBathsMax}){
    const [resetChange, setResetChange] = useState(false)

    const onReset = () => {
        setSortType(mostRecent)
        setGender(noPrefer)

        setRentMin(defaultMin)
        setRentMax(defaultMax)

        setBedsMin(defaultMin)
        setBedsMax(defaultMax)

        setBathsMin(defaultMin)
        setBathsMax(defaultMax)

        setResetChange((preVal) => !preVal)
    }

    return (
        <Paper sx={{ width: "28%", display: "flex", gap: "30px", flexDirection: "column", height: "60%",
            justifyContent: "center", paddingY: "25px", paddingLeft: "25px", margin: "2px"}} elevation={4}>

            <BasicSelect value={sortType} setValue={setSortType} label={"Sort"} 
                defaultValue={mostRecent} options={sortOptions}/>

            <BasicSelect value={gender} setValue={setGender} label={"For"} 
                defaultValue={noPrefer} options={genderOptions}/>
            
            <MinMaxFilter id={"rent"} title={"Rent"} setParentMinVal={setRentMin} setParentMaxVal={setRentMax} isChanged={resetChange}/>
            <MinMaxFilter id={"beds"} title={"Beds"} setParentMinVal={setBedsMin} setParentMaxVal={setBedsMax} isChanged={resetChange} />
            <MinMaxFilter id={"baths"} title={"Baths"} setParentMinVal={setBathsMin} setParentMaxVal={setBathsMax} isChanged={resetChange} />

            <Button variant="contained" 
                sx={{ textTransform: "none", width: "20%", background: "orange"}}
                onClick={onReset}
            > Reset </Button>
             
        </Paper>
    )
}

const minMaxWidth = "32%"

function MinMaxFilter({id, title, setParentMinVal, setParentMaxVal, isChanged}){

    const [minVal, setMinVal] = useState("")
    const [maxVal, setMaxVal] = useState("")

    const onApply = () => {
        if(minVal > maxVal) return
        setParentMinVal(minVal === "" ? defaultMin: minVal)
        setParentMaxVal(maxVal === "" ? defaultMax: maxVal)
    }

    useEffect( () => {
        setMinVal("")
        setMaxVal("")
    }, [isChanged])

    const onValueChange = (event, type) => {
        let inputValue = event.target.value;
        inputValue = inputValue.replace(/[^0-9]/g, '');
        const val = parseInt(inputValue, 10);
        const positiveValue = isNaN(val) ? '' : Math.max(1, val);
        if(type === "min") setMinVal(positiveValue);
        else setMaxVal(positiveValue)
      };

    return(
        <Box>
            <Typography sx={{ marginBottom: "16px", fontWeight: "bold"}}> {title} </Typography>
            <Stack direction={"row"} spacing={2}>
                <TextField
                    id={`min-${id}`}
                    label="Min"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ width: minMaxWidth }}
                    value={minVal}
                    onChange={(e) => onValueChange(e, "min")}
                />

                <TextField
                    id={`max-${id}`}
                    label="Max"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ width: minMaxWidth }}
                    value={maxVal}
                    onChange={(e) => onValueChange(e, "max")}
                />

                <Button variant="contained" 
                    sx={{ textTransform: "none"}}
                    onClick={onApply}
                >Apply</Button>

            </Stack>
        </Box>
    )
}
