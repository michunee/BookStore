import * as React from 'react';
import { Container } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './pages/Home';
import BookDetail from './pages/BookDetail';

function App() {

  return (
    <Router>
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
      </Container>
    </Router >
  )
}

export default App;
