import { Home } from './components/Home/home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { CssBaseline } from '@mui/material';


function App() {
  return (
    <>
      <CssBaseline>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<Home />}  
            >
            </Route>
          </Routes>
        </Router>
      </CssBaseline>
    </>
  );
}

export default App;
