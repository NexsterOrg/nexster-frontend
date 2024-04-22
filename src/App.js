import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Routes, Route} from "react-router-dom"
import React, { useState, useEffect, useMemo } from 'react';
import { GetUserInfoFromLS} from "./apis/store";

import { isMobile } from 'react-device-detect';

import Timeline from "./components/timeline"
import FriendsPanel from './components/friend/friends_panel';
import NotFound from './components/layout/notfound';
import Profile from './components/user/user_profile';
import FriendReqSite from './components/friend/friend_req_site';
import FriendSuggsSite from './components/friend/friend_sugg_site';
import AllFriendsSite from './components/friend/friends_all';
import EventListView from './components/events/EventListView';
import MyEventListView from './components/events/MyEventListView';
import SearchUserSite from './components/search/SearchUserSite';
import SettingSite from './components/settings/Settings';
import LoginSite from './components/login/LoginSite';
import SignUpSite from './components/signUp/SignUp';
import UniIdentitySite from './components/signUp/UniIdentity';
import BoardingFinderBanner from './components/bdFinderBanner';
import Banner from './components/mobile/Banner';
import { SendPasswordResetLink, PasswordResetSite } from './components/login/PasswordReset';

// Boarding Finder
import AdListPage from './BoardingFinder/Ad/AdList';
import BdHomePage from './BoardingFinder/Home/Home';
import BdAdMainViewPage from './BoardingFinder/Ad/AdMainView';
import BdLoginPage from './BoardingFinder/Login/Login';
import BdOwnerAccountCreation from './BoardingFinder/SignUp/BdAccountCreation';
import AfterAccReqSubmission from './BoardingFinder/SignUp/AfterRequestSubmission';
import AdCreatePage from './BoardingFinder/Ad/AdCreate';
import AdCreateSuccessPage from './BoardingFinder/Ad/AdCreateSuccess';

const theme = createTheme({
  palette: {
    mode: "dark"
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 900,
      md: 1100,
      xmd: 1300,
      lg: 1500,
      xl: 1600,
    },
  },

  // TODO: Need to properly add
  typography: {

    h6: {
      fontSize: '0.9rem',
      '@media (min-width: 1300px)': { 
        fontSize: '1.05rem'
      },
      '@media (min-width: 1600px)': { 
        fontSize: '1.25rem',
      },
    },

    h5: {
      fontSize: '0.9rem',
      '@media (min-width: 1300px)': { 
        fontSize: '1.1rem'
      },
      '@media (min-width: 1600px)': { 
        fontSize: '1.5rem',
      },
    },

    body1: {
      fontSize: '0.9rem',
      '@media (min-width: 1300px)': { 
        fontSize: '0.8rem'
      },
      '@media (min-width: 1600px)': { 
        fontSize: '1rem',
      },
    },

    body2: {
      fontSize: '0.6rem',
      letterSpacing: "0.008em",
      '@media (min-width: 1300px)': { 
        fontSize: '0.7rem',
        letterSpacing: "0.01em"
      },
      '@media (min-width: 1600px)': { 
        fontSize: '0.875rem',
        letterSpacing: "0.0107em"
      },
    },

    caption: {
      fontSize: '0.5rem',
      letterSpacing: "0.03333em",
      '@media (min-width: 1300px)': { 
        fontSize: '0.65rem',
        letterSpacing: "0.02em",
      },
      '@media (min-width: 1600px)': { 
        fontSize: '0.75rem',
      },
    },
    subtitle2: {
      fontSize: '0.9rem',
      '@media (min-width: 1300px)': { 
        fontSize: '0.75rem'
      },
      '@media (min-width: 1600px)': { 
        fontSize: '0.875rem',
      },
    },

  },
});


const mobileTheme = createTheme({
  palette: {
    mode: "light"
  },
})

function App() {
    
  const [userTimeSpent, setUserTimeSpent] = useState(0);
  const {userID} = useMemo(GetUserInfoFromLS, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setUserTimeSpent(prevTimeSpent => prevTimeSpent + 60); // Increment time by 1 minute
    }, 60000); // Trigger every minute

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const sendUserTimeToServer = async () => {
      if (userTimeSpent > 0) {
        try {
          await fetch(`/insights/users/${userID}/screen-time`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ timeSpent: userTimeSpent })
          });
          console.log('Time spent sent to the backend:', userTimeSpent);
        } catch (error) {
          console.error('Error sending time spent data:', error);
        }
      }
    };

    sendUserTimeToServer();
  }, [userTimeSpent]);
  if(isMobile) {
    return (
      <ThemeProvider theme={mobileTheme}>
        <Banner />
      </ThemeProvider>
    )
  }

  return (
      <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Timeline />} />

        <Route path="/friends" element={<FriendsPanel />} />
        <Route path="/friends/request" element={<FriendReqSite />} />
        <Route path="/friends/suggs" element={<FriendSuggsSite />} />
        <Route path="/friends/my" element={<AllFriendsSite rootStyles={styles.allFriendsSite}/>} />

        <Route path="/events" element={<EventListView />} />
        <Route path="/events/my" element={<MyEventListView />} />

        <Route path="/login" element={<LoginSite />} />

        <Route path="/index/:indexNo" element={<Profile />} />

        <Route path="/search/results" element={<SearchUserSite />} />
        
        <Route path="/settings" element={<SettingSite />} />

        <Route path="/account/reg" element={<SignUpSite />} />
        <Route path="/account/password-reset-link" element={<SendPasswordResetLink />} />
        <Route path="/account/reg-link" element={<UniIdentitySite />} />
        <Route path="/account/password-reset" element={<PasswordResetSite />} />

        <Route path="/boardingFinder" element={<BoardingFinderBanner />} />

        {/* Boarding Finder */}
        <Route path="/boarding/owner/reg" element={ <BdOwnerAccountCreation /> } />
        <Route path="/boarding/owner/after-reg" element={ <AfterAccReqSubmission /> } />
        <Route path="/boarding/login" element={ <BdLoginPage /> } />

        <Route path="/boarding/ads/create" element={ <AdCreatePage /> } />
        <Route path="/boarding/ads/after-create" element={ <AdCreateSuccessPage /> } />

        <Route path="/boarding/ads/:id" element={ <BdAdMainViewPage /> } />
        <Route path="/boarding/ads" element={ <AdListPage /> } />
        <Route path="/boarding" element={ <BdHomePage /> } />

        <Route path="/page-not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
      </ThemeProvider>
  );
}

export default App;

const styles = {
  allFriendsSite : {
    marginLeft: "5%", marginTop: "10px", marginBottom: "30px"
  }
}
