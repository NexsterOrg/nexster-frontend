import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, AppBar, Toolbar,CssBaseline, Typography, useScrollTrigger, Box, Container, Slide } from '@mui/material';

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
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
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function TopNavBar(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar sx={{ background: "#95D258"}}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ color: "black", width: "20%" }}>
              {props.title}
            </Typography>
            <Box sx={{ width: "80%", display: "flex", flexDirection: "row-reverse", gap: "50px"}}>

                <Button sx={{ background: "#D9D9D9", color: "black", textTransform: "none", 
                    padding: "8px",
                    '&:hover': {
                        background: "#BFBFBF",
                    },
                }}> Profile </Button>

                <Button sx={{ background: "#e08af2", fontWeight: "bold", color: "black", textTransform: "none", 
                    padding: "8px",
                    '&:hover': {
                        background: "#a76fe5",
                    },
                }}> Post an Ad </Button>

            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container>
        <Box>
           {props.childComponent}
        </Box>
      </Container>
    </React.Fragment>
  );
}
