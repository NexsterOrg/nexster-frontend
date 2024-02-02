import { useEffect, useState } from "react";
import { Stack, Pagination, Box, Paper, Typography } from "@mui/material";
import AdCard from "./AdCard";
import AdFilters from "./AdFilters";
import TopNavBar from "../Components/TopNavBar";
import { useNavigate } from 'react-router-dom';

import { ListAds, UnAuthorizedError, bdLoginPath } from "../apis/api";
import {mostRecent, lowestPrice, noPrefer, defaultMin, defaultMax, billTypes } from "./AdFilters"

const imgUrl = "https://api.slingacademy.com/public/sample-photos/1.jpeg"

const data = [
    {key: "hello1", imageUrl: imgUrl, rent: 6500, shortAddr: "Molpe rd, temple", beds: 5, baths: 2, gender: "boys", postedDate: "2024-01-25T16:47:06Z"},
    {key: "hello2", imageUrl: imgUrl, rent: 5500, shortAddr: "John Mw", beds: 8, baths: 4, gender: "girls", postedDate: "2024-01-09T16:00:06Z"},
    {key: "hello3", imageUrl: imgUrl, rent: 7000, shortAddr: "1 st lane", beds: 4, baths: 1, gender: "boys", postedDate: "2024-01-14T14:45:00Z"},
    {key: "hello4", imageUrl: imgUrl, rent: 7000, shortAddr: "1 st lane", beds: 4, baths: 1, gender: "boys", postedDate: "2024-01-14T14:45:00Z"},
    {key: "hello5", imageUrl: imgUrl, rent: 7000, shortAddr: "1 st lane", beds: 4, baths: 1, gender: "boys", postedDate: "2024-01-14T14:45:00Z"},
    {key: "hello6", imageUrl: imgUrl, rent: 7000, shortAddr: "1 st lane", beds: 4, baths: 1, gender: "boys", postedDate: "2024-01-14T14:45:00Z"},
    {key: "hello7", imageUrl: imgUrl, rent: 7000, shortAddr: "1 st lane", beds: 4, baths: 1, gender: "boys", postedDate: "2024-01-14T14:45:00Z"},
]

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
                console.error("failed to list ads", err)  
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
                        return <AdCard key={`ad-list-${d.key}`}
                            key1={d.key} imageUrl={d.imageUrl} rent={d.rent} address={d.address}
                            beds={d.beds} baths={d.baths} gender={d.gender} postedDate={d.createdAt}
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
