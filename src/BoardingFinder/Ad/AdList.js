import { useEffect, useState } from "react";
import { Stack, Pagination, Box, Paper, Typography } from "@mui/material";
import AdCard from "./AdCard";
import AdFilters from "./AdFilters";
import TopNavBar from "../Components/TopNavBar";
import { useNavigate } from 'react-router-dom';

import { ListAds, UnAuthorizedError, bdLoginPath } from "../apis/api";
import {mostRecent, lowestPrice, noPrefer, defaultMin, defaultMax, billTypes } from "./AdFilters"

const pgSize = 10
const defaultMaxDistance = 100000

function AdList(){
    const navigate = useNavigate();
    const [page, setPage] = useState(1)
    const [adListInfo, setAdListInfo] = useState({ads: [], size: 0, total: 0})

    // filters
    const [sortType, setSortType] = useState(mostRecent)
    const [gender, setGender] = useState(noPrefer)

    const [rentMin, setRentMin] = useState(defaultMin)
    const [rentMax, setRentMax] = useState(defaultMax)

    const [bedsMin, setBedsMin] = useState(defaultMin)
    const [bedsMax, setBedsMax] = useState(defaultMax)

    const [bathsMin, setBathsMin] = useState(defaultMin)
    const [bathsMax, setBathsMax] = useState(defaultMax)


    useEffect( ()=> {

        (async () => {
            try {
                let genderArr = gender === noPrefer ? ["girls", "boys", "any"] : [gender]
                let sortTypeName = sortType === lowestPrice ? "rental" : "date"
                const newAdsInfo = await ListAds(page, pgSize, rentMin, rentMax, defaultMaxDistance, bedsMin, bedsMax, bathsMin, bathsMax, genderArr, billTypes, sortTypeName )
                
                setAdListInfo({ads: newAdsInfo.data, size: newAdsInfo.resultsCount, total: newAdsInfo.total})
            } catch (err) {
                if (err instanceof UnAuthorizedError) {
                    navigate(bdLoginPath, { replace: true });
                    return
                }  
            }
        })()

    }, [page, sortType, gender, rentMin, rentMax, bedsMin, bedsMax, bathsMin, bathsMax])

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <Stack direction={"row"} spacing={4}>
            <Stack spacing={3} sx={{ width: "70%", marginLeft: "4%" } } >

            {
                adListInfo.size === 0 ? <NoResultsFoundMsg /> : 
                <>
                {
                    adListInfo.ads.map( (d) => {
                        const preparedGender = prepareGender(d.gender)
                        return <AdCard key={`ad-list-${d.key}`}
                            key1={d.key} imageUrl={d.imageUrl} rent={d.rent} address={d.address}
                            beds={d.beds} baths={d.baths} gender={preparedGender} postedDate={d.createdAt}
                        />
                    })
                }
                <Box sx={{ marginTop: "40px !important", marginBottom: "20px !important", display: "flex", flexDirection: "row-reverse"}} >
                    <Pagination 
                        count={Math.ceil(adListInfo.total/pgSize)} 
                        variant="outlined" color="secondary" 
                        onChange={handleChange}
                        page={page}
                    />
                </Box>
                </>

            }
            </Stack>
            <AdFilters sortType={sortType} gender={gender} setSortType={setSortType} setGender={setGender}
                setBedsMin={setBedsMin} setBedsMax={setBedsMax} setBathsMin={setBathsMin} setBathsMax={setBathsMax}
                setRentMax={setRentMax} setRentMin={setRentMin} setPage={setPage}
            />
        </Stack>
    )

}

export default function AdListPage() {
    return (
        <Box sx={{ padding: "10px" }}>
            <TopNavBar childComponent={ <AdList />} title={"Nexster BoardingFinder"}/>
        </Box>
    )
}


function NoResultsFoundMsg(){
    return (
        <Paper sx={{ width: "840px", height: "100px", borderRadius: "10px", display: "flex", justifyContent: "center",
            alignItems: "center", marginTop: "50px" }}>
            <Typography> No results found </Typography>
        </Paper>
    )
}

function prepareGender(gender) {
    if(gender === "any") return "no preference"
    return gender
}
