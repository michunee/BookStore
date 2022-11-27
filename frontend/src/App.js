import * as React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import NotFound from './pages/PageNotFound';

import MainPage from './pages/User/components/MainPage';
import { MDBListGroupItem } from 'mdb-react-ui-kit';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/account" element={<MainPage />} />

        {/* <Route path="/user/account/profile" element={<Profile />} /> */}
        <Route path="*" element={<NotFound />} />

        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/comment" element={<Comment />} /> */}

      </Routes>
    </Router>
  )
}

export default App;
