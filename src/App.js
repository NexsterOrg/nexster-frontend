import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Routes, Route} from "react-router-dom"

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
import TestGround from './components/test';

function Login() {
  return (
    <div>
      <h1> Login Page </h1>
    </div>
  )
}

const theme = createTheme({
  // palette: {
  //   mode: "dark"
  // },

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
      fontSize: '0.1rem',
      letterSpacing: "0.03333em",
      '@media (min-width: 1300px)': { 
        fontSize: '0.6rem',
        letterSpacing: "0.02em",
      },
      '@media (min-width: 1600px)': { 
        fontSize: '0.75rem',
      },
    },

  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Routes>
      <Route path="/" element={<Timeline />} />
      <Route path="/test" element={<TestGround />} />

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

      <Route path="/account/reg-link" element={<UniIdentitySite />} />

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
