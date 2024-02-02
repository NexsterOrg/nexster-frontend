import { useMemo, useEffect, useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import TopNavBar from "../Components/TopNavBar";
import ImagePreviewer from "../../antd/components/ImageViewer";
import { useNavigate, useParams } from 'react-router-dom';

import { TimeDiffWithNow } from "../../helper/date"
import { GetAd, UnAuthorizedError, bdLoginPath } from "../apis/api";


function AdMainView({adId}){
    const navigate = useNavigate();
    const [adInfo, setAdInfo] = useState({ad: null, owner: null})

    useEffect( ()=> {

        (async () => {
            try {
                const fetchedAdInfo = await GetAd(adId)
                setAdInfo(fetchedAdInfo)
            } catch (err) {
                if (err instanceof UnAuthorizedError) {
                    navigate(bdLoginPath, { replace: true });
                    return
                }
                console.error("failed to get ad", err)  
            }
        })()

    }, [adId])

    return (
        <Stack sx={{ paddingLeft: "20px"}} spacing={3}>
            <Stack direction={"row"} spacing={18}>
                <RenderImages ad={adInfo.ad}/>
                <OwnerInfo ownerInfo={adInfo.owner}/>
            </Stack>
            <AdInfo ad={adInfo.ad}/>
        </Stack>
    )
}

export default function BdAdMainViewPage(){
    const {id} = useParams()
    return (
    <Box sx={{ padding: "10px" }}>
        <TopNavBar childComponent={ <AdMainView adId={id}/>} title={"Nexster BoardingFinder"}/>
    </Box>
    )
}

function RenderImages({ad}){
    let imgs = ad?.imageUrls
    let firstImg = ""

    if(!Array.isArray(imgs)) {
        imgs = []
    }
    if(imgs.length > 0){
        firstImg = imgs[0]
    }
    return (
        <Box sx={{ width: "30%"}}>
            <ImagePreviewer firstImgUrl={firstImg} imgUrls={imgs} style={{ width: "100%", maxHeight: "60vh" }}/>
        </Box>
    )
}

function OwnerInfo({ownerInfo}){
    const ownerKey = ownerInfo?.key
    const comp = !ownerKey ? <> </> : 
    <>
        <Typography variant="h6" sx={{ marginBottom: "20px", fontWeight: "bold"}}> Owner Infomation </Typography>
        <Typography sx={{marginBottom: "5px"}}> {ownerInfo?.name} </Typography>
        <Typography> {ownerInfo?.mainContact} </Typography>
    </>
        
    return (
        <Paper elevation={3} sx={{ width: "22%", padding: "20px", height: "30%"}}>
            {comp}
        </Paper>
    )
}

function AdInfo({ad}){
    const dateStr = useMemo(() => TimeDiffWithNow(ad?.createdAt), [ad])
    const gender = useMemo(() => prepareGender(ad?.gender), [ad])

    if(!ad){
        return (
            <Paper elevation={3} sx={{ maxWidth: "60%", padding: "12px" }} >
                {/* <Typography> Not Found </Typography> */}
            </Paper>
        )
    }

    return (
    <Paper elevation={3} sx={{ maxWidth: "60%", padding: "12px" }} >
        <Stack spacing={3}>
            <Box>
                <Typography variant="h6" sx={{ marginBottom: "4px", color: "#4dd672", fontWeight: "bold" }} > Rs {ad?.rent}  
                    <Typography variant="caption"  >  per person, month </Typography> 
                </Typography>
                <Typography variant="body2"> {ad?.address} </Typography>
            </Box>

            <Stack spacing={0.3}>
                <Typography > {ad?.beds} beds, {ad?.baths} baths</Typography>
                <Typography > Bills: {ad?.bills} </Typography>
                <Typography> For: <span style={{ color: "#de6a8f" }}> {gender} </span> </Typography>
            </Stack>

            {
                ad?.description ? 
                <Box>
                    <Typography color={"#96d171"}> Description </Typography>
                    <Typography variant="body2"> {ad?.description} </Typography>
                </Box> : null
            }

            <Box sx={{ textAlign: "end"}}>
                <Typography variant="caption"> Posted {dateStr} ago </Typography>
            </Box>
        </Stack>
    </Paper>
    )
}

function prepareGender(gender) {
    if(gender === "any") return "no preference"
    return gender
}
