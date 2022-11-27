import { AppBar, Avatar, Badge, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Logout from '@mui/icons-material/Logout';
import { Box } from "@mui/system";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/selectors";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useState } from "react";

function Header() {
    const username = useSelector(userSelector);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // console.log(username);
    const navigate = useNavigate();

    const handleLogout = () => {
        axios
            .post('api/users/logout', {
                headers: {
                    'token': `Bearer ${localStorage.getItem('token')}`
                }
            }
            )
            .then(res => {
                console.log(res.data);
                localStorage.removeItem('token');
                navigate('/');
            })
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleGoToCart = () => {
        navigate('/cart');
        window.scrollTo(0, 0)
    }

    const handleGoToUserPage = () => {
        navigate('/user/account');
    }

    return (
        <AppBar color="inherit" position='fixed' >
            <Toolbar>
                <Typography color="inherit" variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                        <img width="100px" alt="" src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/National_Book_Store_2016_logo.svg/800px-National_Book_Store_2016_logo.svg.png">
                        </img>
                    </Link>
                </Typography>

                <SearchBar />

                <Box
                    display='flex'
                    justifyContent='space-between'
                    alignContent='center'
                >
                    {localStorage.getItem('token') ?
                        <Button color='inherit' onClick={handleGoToCart}>
                            <Badge badgeContent={4} color='error'>
                                <ShoppingCartIcon />
                            </Badge>
                        </Button>
                        : (
                            <Button color='inherit' onClick={() => navigate('/login')}>
                                <Badge badgeContent={0} color='error'>
                                    <ShoppingCartIcon />
                                </Badge>
                            </Button>
                        )
                    }
                    {/* // <Button color='inherit' onClick={handleGoToCart}>
                    //     <Badge badgeContent={4} color='secondary'>
                    //         <ShoppingCartIcon />
                    //     </Badge>
                    // </Button> */}


                    {localStorage.getItem('token') ? (
                        <div>

                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            {username}
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}

                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={handleGoToUserPage}><Avatar sx={{ width: 24, height: 24 }} />
                                    Tài khoản của tôi
                                </MenuItem>

                                <MenuItem onClick={handleLogout}><Logout fontSize="small" />
                                    <Typography sx={{ ml: 2 }}>
                                        Đăng xuất
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>
                            <Button >Đăng nhập</Button>
                        </Link>
                    )}

                    {/* <Button color='inherit' onClick={handleGoToUserPage}>{username}</Button>

                    <Button color='inherit' onClick={handleLogout}>Logout</Button> */}
                </Box>
            </Toolbar>
        </AppBar >
    )
}

export default Header;