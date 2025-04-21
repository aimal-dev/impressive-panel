import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// MUI icons
import { AutoAwesome, ChatBubble, LocalMall, Stars, TextSnippet } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";

import { Ai } from './ai';
import { ChatUi } from "./chat/ChatUi";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }} className='main-container'>
      <Box sx={{ maxWidth: { xs: 520, sm: 480 } }} >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          className='tab-container'
          TabIndicatorProps={{ style: { display: 'none' } }} // 🔥 Hides the underline
          sx={{
            minHeight: "unset",

            ".MuiTabs-hideScrollbar": {
              top: `0px !important`,
            },

            ".MuiTabs-scrollButtons": {
              position: "absolute",
              zIndex: 1,
              width: 25,
              height: 25,
              borderRadius: 25,
              bgcolor: "#3C436F",
              opacity: 1,
              top: "50%",
              transform: "translateY(-50%)",

              "&:first-child": {
                left: 12,
              },

              "&:last-child": {
                right: 12,
              },

              "&.MuiTabScrollButton-root.Mui-disabled": {
                opacity: 0,
              },

              "@media (max-width: 599.95px)": {
                display: "inline-flex",
              },
            },

            ".MuiTab-root": {
              mx: 1,

              "&:first-child": {
                ml: 2,
              },

              "&:last-child": {
                mr: 4,
              },
            },

            ".MuiTabs-indicator": {
              display: "none",
            },
          }}
        >
          <Tab className='tab-btn' icon={<ChatBubble />} label="Chat" {...a11yProps(0)} />
          <Tab className='tab-btn' icon={<LocalMall />} label="Shop" {...a11yProps(1)} />
          <Tab className='tab-btn' icon={<TextSnippet />} label="Read" {...a11yProps(2)} />
          <Tab className='tab-btn' icon={<AutoAwesome />} label="AI" {...a11yProps(3)} />
          <Tab className='tab-btn' icon={<Stars />} label="Rewards" {...a11yProps(4)} />
          <Tab className='tab-btn' icon={<SettingsIcon />} label="Settings" {...a11yProps(4)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
       <ChatUi />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <Typography>Shop</Typography>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Typography>Read panel content</Typography>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Ai />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <Typography>Settings panel content</Typography>
      </CustomTabPanel>
    </Box>
  );
}
