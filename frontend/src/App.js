import { Typography, Box, Container } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './pages/Home';

function App() {

  return (
    <div className="App">
      <Router>
        <Container>
          <Box>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Home />
                  </>
                }
              />
            </Routes>
          </Box>
        </Container>
      </Router >
    </div>
  )
}

export default App;
