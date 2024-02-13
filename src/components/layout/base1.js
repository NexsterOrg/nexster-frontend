import React, {useMemo, useRef, useState} from "react";
import {Stack, Typography, Drawer, List, Avatar, Divider, Box, TextField, IconButton, MenuItem, Menu, Button,
    ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'

import { useNavigate } from 'react-router-dom';
import { CleanLS, GetUserInfoFromLS } from "../../apis/store";
import PostCreationDialog from "../media/postCreation";
import { SearchResultsRoute, NxterHome, LoginPath } from "../../apis/fetch";
// filled icons
// import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
// import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
// import TextsmsRoundedIcon from '@mui/icons-material/TextsmsRounded';
// import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

// for outline icons
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';

// TODO: Set this value based on the screen size.
const drawerWidth = "12%";

const iconSize = {
    xl: 30,
    lg: 27,
    xmd: 24,
    md: 20
}

const navFontSize = {
    xl: 18,
    lg: 16,
    xmd: 15,
    md: 12
}

const iconWidth = {xl: 50, lg: 45, xmd: 40}

export default function Base1({styles, SideComponent}){
    const navigate = useNavigate();
    const {name, imgUrl, indexNo} =  useMemo(GetUserInfoFromLS, [])
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
    const searchKeywordRef = useRef(null)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

    const onSearch = () => {
        const keyword = searchKeywordRef?.current?.value || ""
        if(keyword === "") return

        navigate({
            pathname: SearchResultsRoute,
            search: `?${new URLSearchParams({query: keyword}).toString()}`,
          }, { replace: true });
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            const keyword = searchKeywordRef?.current?.value || ""
            if(keyword === "") return
    
            navigate({
                pathname: SearchResultsRoute,
                search: `?${new URLSearchParams({query: keyword}).toString()}`,
              }, { replace: true });
        }
      };

    return (
        <Stack direction="row" spacing={0} sx={{height: "auto"}}>
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
            
            {/* TODO: Need to replace with acutal Nexster logo and make it resposive */}

            <Stack direction={"row"} sx={{ paddingLeft: "6%", marginBottom: "13%", marginTop: "10%" }}>
                <Typography variant="h4"> 
                    Nexster
                </Typography>
                <Typography variant="caption"> [beta] </Typography>
            </Stack>
                <List> 
                    <ListItem key={1} disablePadding >
                        <ListItemButton href="/" >
                            <ListItemIcon sx={{minWidth: 35 , width: iconWidth}}>
                                <HomeOutlinedIcon sx={{width: iconSize, height: iconSize}} />
                            </ListItemIcon>
                            <ListItemText primary={"Home"} disableTypography sx={{fontSize: navFontSize}}/>
                        </ListItemButton>
                    </ListItem>

                    <ListItem key={2} disablePadding>
                        <ListItemButton href="/friends">
                            <ListItemIcon sx={{minWidth: 35 , width: iconWidth}}>
                                <PeopleAltOutlinedIcon sx={{width: iconSize, height: iconSize}}/>
                            </ListItemIcon>
                            <ListItemText primary={"Friends"} disableTypography sx={{fontSize: navFontSize}}/>
                        </ListItemButton>
                    </ListItem>

                    <ListItem key={3} disablePadding>
                        <ListItemButton href="/events">
                            <ListItemIcon sx={{minWidth: 35 , width: iconWidth}}>
                                <EventAvailableOutlinedIcon sx={{width: iconSize, height: iconSize}}/>
                            </ListItemIcon>
                            <ListItemText primary={"Events"} disableTypography sx={{fontSize: navFontSize}}/>
                        </ListItemButton>
                    </ListItem>

                    <ListItem key={4} disablePadding>
                        <ListItemButton href="/boardingFinder">
                            <ListItemIcon sx={{minWidth: 35 , width: iconWidth}}>
                                <ApartmentOutlinedIcon sx={{width: iconSize, height: iconSize}}/>
                            </ListItemIcon>
                            <ListItemText primary={"Boardings"} disableTypography sx={{fontSize: navFontSize}}/>
                        </ListItemButton>
                    </ListItem>

                    <ListItem key={5} disablePadding>
                        <ListItemButton onClick={() => setIsCreatePostOpen(preState => !preState)} >
                            <ListItemIcon sx={{minWidth: 35 , width: iconWidth}}>
                                <AddCircleOutlineRoundedIcon  sx={{width: iconSize, height: iconSize}}/>
                            </ListItemIcon>
                            <ListItemText primary={"Share"}  disableTypography sx={{fontSize: navFontSize}}/>
                        </ListItemButton>
                    </ListItem>

                </List>
                <Divider />

                <ListItem key={6} disablePadding sx={{marginTop: "15%"}}> 

                    <ListItemButton 
                        id="base-profile-menu-button"
                        aria-controls={open ? 'base-profile-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleProfileClick}
                    >
                        <ListItemIcon sx={{minWidth: 35 , width: iconWidth}}>
                            <Avatar alt={name} sx={{height: "80%", width: "80%"}}
                            src={imgUrl}  />
                        </ListItemIcon>
                        <ListItemText primary={"Profile"}  disableTypography sx={{fontSize: navFontSize}}/>

                    </ListItemButton>

                </ListItem>

                <Menu
                    id="base-profile-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                    MenuListProps={{
                    'aria-labelledby': 'base-profile-menu-button',
                    }}
                >
                    <MenuItem onClick={() => navigate(`/index/${indexNo}`)}> Go to profile </MenuItem>
                    <MenuItem onClick={() => navigate("/settings") }>Settings</MenuItem>
                    <MenuItem onClick={() => {
                        CleanLS()
                        navigate(LoginPath)
                    }}> Logout </MenuItem>
                </Menu>
 
                <Typography variant="caption" sx={{position: "fixed", bottom: 10, marginLeft: "0.8%"}}> © 2024 Namal Sanjaya </Typography>
            </Drawer>

            <Box
                component="main"
                sx={[{display: "flex", flexDirection: "column",flexGrow: 1, bgcolor: 'background.default', minHeight: "100vh"}, styles]}>
                
                <Box sx={{position: "fixed", right: "8px", marginTop: "5px", display: "flex"}}>
                    <TextField id="outlined-search" type="search" size="small" label="Find Friends..." variant="filled" 
                        inputRef={searchKeywordRef}
                        onKeyDown={handleKeyPress}
                    />

                    <Box sx={{display: "flex", background: "#c7c7c7"}}>
                        <IconButton aria-label="friend-search-btn" onClick={onSearch} >
                            <SearchIcon />
                        </IconButton>
                    </Box>

                </Box>
                {SideComponent}
            </Box>
            <PostCreationDialog isCreatePostOpen={isCreatePostOpen} setIsCreatePostOpen={setIsCreatePostOpen} />
        </Stack>
    )
}
