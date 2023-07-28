import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Base1 } from "./components/layout/base1";

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  },
});

function App() {
  return (
    // <ThemeProvider theme={darkTheme}>
    //   <Base1 />
    // </ThemeProvider>

    <Base1 />
  );
}

export default App;
