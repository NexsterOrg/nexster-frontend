import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Routes, Route} from "react-router-dom"

import Timeline from "./components/timeline"
import FriendsPanel from './components/friend/friends_panel';
import MsgPanel from './components/message_panel';
import NotFound from './components/layout/notfound';
import Profile from './components/user/user_profile';
import FriendReqSite from './components/friend/friend_req_site';
import FriendSuggsSite from './components/friend/friend_sugg_site';
import AllFriendsSite from './components/friend/friends_all';
import TestGround from './components/test';

function Login() {
  return (
    <div>
      <h1> Login Page </h1>
    </div>
  )
}

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  },
});

function App() {
  return (
    // <ThemeProvider theme={darkTheme}>
    <Routes>
      <Route path="/" element={<Timeline />} />
      <Route path="/test" element={<TestGround />} />

      <Route path="/friends" element={<FriendsPanel />} />
      <Route path="/friends/request" element={<FriendReqSite />} />
      <Route path="/friends/suggs" element={<FriendSuggsSite />} />
      <Route path="/friends/my" element={<AllFriendsSite rootStyles={styles.allFriendsSite}/>} />

      <Route path="/message" element={<MsgPanel />} />
      <Route path="/login" element={<Login />} />
      <Route path="/page-not-found" element={<NotFound />} />

      <Route path="/index/:indexNo" element={<Profile />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  // </ThemeProvider>
  );
}

export default App;

const styles = {
  allFriendsSite : {
    marginLeft: "5%", marginTop: "10px", marginBottom: "30px"
  }
}

// TOday
/**
 * 1. Finish friend delete part
 * 2. Think about Event of the nexster & assign work
 * 3. 
 */