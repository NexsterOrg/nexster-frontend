import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Routes, Route} from "react-router-dom"

import Timeline from "./components/timeline"
import FriendsPanel from './components/friends_panel';
import MsgPanel from './components/message_panel';
import NotFound from './components/layout/notfound';

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
      <Route path="*" element={<NotFound />} />
    </Routes>
  //  </ThemeProvider>
  );
}

export default App;
