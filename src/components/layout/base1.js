import React from "react";
import {Stack, Typography, Drawer, List, Avatar, Divider, Box, 
    ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'

// filled icons
// import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
// import TextsmsRoundedIcon from '@mui/icons-material/TextsmsRounded';
// import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

// for outline icons
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

import profImage from "../../static/profile1.jpg"

const drawerWidth = 210;

export function Base1(){

    return (
        <Stack direction="row" spacing={0} sx={{height: "100%"}}>
            <Drawer
                sx={{
                width: drawerWidth,
                flexShrink: 0,
                border: "1px solid #000",
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
                }}
                variant="persistent"
                anchor="left"
                open={true}>
            
            <Typography sx={{paddingLeft: "8%", marginBottom: "15%", marginTop: "10%"
            }} variant="h4"> 
                Nexster 
            </Typography>
            
                <List > 
                    <ListItem key={1} disablePadding >
                        <ListItemButton onClick={() => console.log("home-clicked")}>
                            <ListItemIcon>
                                <HomeOutlinedIcon sx={{width: "30px", height: "30px"}}/>
                            </ListItemIcon>
                            <ListItemText primary={"Home"} disableTypography sx={{fontSize: 18}}/>
                        </ListItemButton>
                    </ListItem>

                    <ListItem key={2} disablePadding>
                        <ListItemButton onClick={() => console.log("friend-clicked")}>
                            <ListItemIcon>
                                <PeopleAltOutlinedIcon sx={{width: "30px", height: "30px"}}/>
                            </ListItemIcon>
                            <ListItemText primary={"Friend"} disableTypography sx={{fontSize: 18}}/>
                        </ListItemButton>
                    </ListItem>

                    <ListItem key={3} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <TextsmsOutlinedIcon sx={{width: "30px", height: "30px"}}/>
                            </ListItemIcon>
                            <ListItemText primary={"Message"} disableTypography sx={{fontSize: 18}}/>
                        </ListItemButton>
                    </ListItem>

                    <ListItem key={4} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddCircleOutlineRoundedIcon  sx={{width: "30px", height: "30px"}}/>
                            </ListItemIcon>
                            <ListItemText primary={"Add"}  disableTypography sx={{fontSize: 18}}/>
                        </ListItemButton>
                    </ListItem>

                </List>
                <Divider />
                {/* <Box sx={{display: "flex", flexDirection: "row", justifyContent: "flex-start", 
                alignItems: "center", paddingLeft: "6%", marginTop: "15%"}}>
                    <Avatar alt="Namal-Sanjaya" src={profImage}  />
                    <Typography variant="body" sx={{marginLeft: "12%"}}> Namal </Typography>
                </Box> */}

                <ListItem key={5} disablePadding sx={{marginTop: "15%"}}> 
                    <ListItemButton>
                        <ListItemIcon>
                            <Avatar alt="Namal-Sanjaya" src={profImage}  />
                        </ListItemIcon>
                        <ListItemText primary={"Sanjaya"}  disableTypography sx={{fontSize: 18}}/>
                    </ListItemButton>
                </ListItem>

                <Typography variant="body" sx={{position: "fixed", bottom: 10, marginLeft: "0.7%"}}> © 2023 Namal Sanjaya </Typography>
            </Drawer>

            {/* <Box sx={{width: "80%", border: "1px solid #000"}}>

            </Box> */}

        <Box
            component="main"
            sx={{display: "flex", justifyContent: "center", flexGrow: 1, bgcolor: 'background.default'}}>
            <Box  sx={{border: "1px solid red", height: "100%", width: "40%"}}>

            </Box>

        </Box>

        </Stack>
    )
}
// border: "1px solid #000", z
