import React from "react";
import { Box, Avatar, Typography, Paper } from "@mui/material";
import ImageGrid from "./img_grid";
import Base1 from "../layout/base1";

const userImgUrl = "https://picsum.photos/id/58/200/300"

// test data
const testImg = [
    {
      url: 'https://picsum.photos/id/54/200/300',
      title: 'Breakfast'
    },
    {
      url: 'https://picsum.photos/id/51/200/300',
      title: 'Burgers'
    },
    {
      url: 'https://picsum.photos/id/50/200/300',
      title: 'Camera'
    },
    {
      url: 'https://picsum.photos/id/46/200/300',
      title: 'Breakfast'
    },
    {
      url: 'https://picsum.photos/id/49/200/300',
      title: 'Burgers'
    },
    {
      url: 'https://picsum.photos/id/59/200/300',
      title: 'Camera'
    },
    {
      url: 'https://picsum.photos/id/51/200/300',
      title: 'Burgers'
    },
  
  ];


function ProfileHeader(){

    return (
        <Box sx={styles.headerContainer}>
            <Avatar src={userImgUrl} aria-label="some-prof" sx={styles.avatar}/>
            <Paper sx={styles.textHeaderContainer} elevation={2}>
                <Typography variant="h6" sx={styles.name}> Namal Sanjaya </Typography>
                <Typography> Electronic & Telecommunication Engineering </Typography>
                <Typography> 4th Year </Typography>
                <Typography variant="body2" sx={styles.friendCount}> 124 Friends </Typography>
            </Paper>
        </Box>
    )
}

function AboutSection(){
    return (
        <Paper elevation={2} sx={styles.aboutContainer}>
            <Typography variant="h6" sx={styles.about}> About </Typography>
            <Typography variant="body1">I am passinate Engineer, like to build things from scratch. I like
                to read books and see how those concepts being implemented in real world.
            </Typography>
        </Paper>
    )
}

function ProfileSection(){
    return (
        <Box sx={styles.profContainer}>
            <ProfileHeader />
            <AboutSection />
            <ImageGrid images={testImg}/>
        </Box>
    )
}

export default function Profile(){
    return <Base1 SideComponent={ <ProfileSection /> }/>
}

const styles = {
    headerContainer : {
        display: "flex"
    },
    avatar: {
        width: 140,
        height: 140
    },
    textHeaderContainer: {
        padding: "18px", 
        marginLeft: "30px",
        width: "576px",
        // backgroundColor: "#D9D9D9"
    },
    aboutContainer : {
        padding: "15px",
        marginY: "20px",
        // backgroundColor: "#D9D9D9"
    },
    about: {
        fontWeight: "bold"
    },
    profContainer: {
        padding: "10px",
        width: "746px",
        border: "1px solid #000"
    },
    name: {
        fontWeight: "bold"
    },
    friendCount: {
        marginTop: "8px"
    }
}
