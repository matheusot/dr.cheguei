import { Home } from './components/Home/home';
import { MoreInfo } from './components/MoreInfo/more-info';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { CssBaseline } from '@mui/material';
import { AdminPage } from './components/AdminPage/admin-page';
import { AdminLogin } from './components/AdminLogin/admin-login';

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: "black",
          },
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.MuiInputBase-colorPrimary': {
            '&.Mui-focused fieldset': {
              borderColor: 'red',
            },
          }
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: 'red',
          }
        }
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: 'red',
          }
        }
      }
    }
  }
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/more-info" element={<MoreInfo />}></Route>
            <Route path="/admin" element={<AdminPage />}></Route>
            <Route path="/admin-login" element={<AdminLogin />}></Route>
          </Routes>
        </Router>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
