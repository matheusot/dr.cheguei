import { Home } from './components/Home/home';
import { MoreInfo } from './components/MoreInfo/more-info';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { CssBaseline } from '@mui/material';
import { AdminPage } from './components/AdminPage/admin-page';


function App() {
  return (
    <>
      <CssBaseline>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/more-info" element={<MoreInfo />}></Route>
            <Route path="/admin" element={<AdminPage />}></Route>
          </Routes>
        </Router>
      </CssBaseline>
    </>
  );
}

export default App;
