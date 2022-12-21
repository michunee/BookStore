import * as React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import MainPage from './pages/User/components/MainPage';
import Profile from './pages/User/components/Profile';
import Order from './pages/User/components/Order';
import Notification from './pages/User/components/Notification';
import Password from './pages/User/components/Password';
import Checkout from './pages/Checkout/CheckOut';
import Admin from './pages/Admin/components/Dashboard';
import { createTheme, ThemeProvider } from '@mui/material';
import PageNotFound from './pages/PageNotFound';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#f44336',
      },
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/account/" element={<MainPage />} >
            <Route path="/user/account/profile" element={<Profile />} />
            <Route path="/user/account/order" element={<Order />} />
            <Route path="/user/account/notification" element={<Notification />} />
            <Route path="/user/account/password" element={<Password />} />
            <Route index element={<Navigate to='/user/account/profile' />}></Route>
          </Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/dashboard" element={<Admin />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>

  )
}

export default App;
