import * as React from 'react';
import { Container } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  return (
    <div className='App'>
      <Router>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books/:id" element={<BookDetail />} />
            {/* <Route path="/cart/:id" element={<Cart />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
        // create conflict here
      </Router>
    </div>
  )
}

export default App;
