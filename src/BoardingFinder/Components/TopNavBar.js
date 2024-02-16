import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, AppBar, Toolbar,CssBaseline, useScrollTrigger, Box, Slide, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { bdAdsCreatePath, bdLoginPath } from '../apis/api';
import { CleanLS, GetRoleFromLS } from "../apis/store"

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function TopNavBar(props) {
  const navigate = useNavigate();
  const role =  useMemo(GetRoleFromLS, [])

  const onSignout = () => {
    CleanLS()
    navigate(bdLoginPath)
  }

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar sx={{ background: "#95D258"}}>
          <Toolbar>
            <Link href={"/boarding"} variant="h6" underline="none" sx={{ color: "black", width: "20%" }}> {props.title} </Link>
            <Box sx={{ width: "80%", display: "flex", flexDirection: "row-reverse", gap: "50px"}}>

                <Button sx={styles.profileButn} onClick={onSignout}> Log out </Button>

                {
                  role === "bdo" ? 
                  <Button onClick={() => navigate(bdAdsCreatePath)}
                    sx={styles.postButn} 
                  > Post an Ad </Button> : null
                }


            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Box sx={{ minWidth: "100%" }}>
           {props.childComponent}
      </Box>
    </>
  );
}

const styles = {
  profileButn: { 
    background: "#D9D9D9", color: "black", textTransform: "none", 
    padding: "8px",
    '&:hover': {
        background: "#BFBFBF",
    }
  },
  postButn: { 
    background: "#e08af2", fontWeight: "bold", color: "black", textTransform: "none", 
    padding: "8px",
    '&:hover': {
        background: "#a76fe5",
    }
  }
}
