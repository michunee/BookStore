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
    <div className='App'>
      <Router>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books/:id" element={<BookDetail />} />
          </Routes>
        </Container>
      </Router>
    </div>
  )
}

export default App;
