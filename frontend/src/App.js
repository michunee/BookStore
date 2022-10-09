import * as React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Register from './pages/Register';
import Login from './components/Login';

function App() {

  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/:id" element={<BookDetail />} />
        {/* <Route path="/cart/:id" element={<Cart />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App;
