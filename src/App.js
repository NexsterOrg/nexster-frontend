import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Routes, Route} from "react-router-dom"

import Timeline from "./components/timeline"
import FriendsPanel from './components/friend/friends_panel';
import MsgPanel from './components/message_panel';
import NotFound from './components/layout/notfound';
import Profile from './components/user/user_profile';
import FriendsBase from './components/friend/friends_base';
import FriendReqSite from './components/friend/friend_req_site';
import FriendSuggsSite from './components/friend/friend_sugg_site';

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
      <Route path="/test" element={<FriendsBase />} />

      <Route path="/friends" element={<FriendsPanel />} />
      <Route path="/friends/request" element={<FriendReqSite />} />
      <Route path="/friends/suggs" element={<FriendSuggsSite />} />

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
