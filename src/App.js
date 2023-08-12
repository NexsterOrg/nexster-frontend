import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Routes, Route} from "react-router-dom"

import Timeline from "./components/timeline"
import FriendsPanel from './components/friend/friends_panel';
import MsgPanel from './components/message_panel';
import NotFound from './components/layout/notfound';
import Profile from './components/user/user_profile';

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
      <Route path="/friends" element={<FriendsPanel />} />
      <Route path="/message" element={<MsgPanel />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  //  </ThemeProvider>
  );
}

export default App;
