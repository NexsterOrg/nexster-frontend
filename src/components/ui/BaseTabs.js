import { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Box  } from '@mui/material';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
    iconPosition: "start"
  };
}

export default function BaseTabs({tabsInfo=[]}) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ minWidth: 500, minHeight: 300 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="Model-with-tabs">
          {
            tabsInfo.map( (tb, index) => (
              <Tab label={tb.label} {...a11yProps(index)} icon={tb.icon} sx={{textTransform: "none"}}/>
            ))
          }
        </Tabs>
      </Box>
      {
        tabsInfo.map((tb, index) => (
          <CustomTabPanel value={value} index={index}>
            {tb.tab}
          </CustomTabPanel>
        ))
      }
    </Box>
  );
}

