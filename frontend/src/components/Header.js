import { AppBar, Badge, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box } from "@mui/system";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";

function Header() {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLogin(true);
        }
        else {
            localStorage.removeItem('token');
            setIsLogin(false);
        }
    }, [])



    return (
        <AppBar position='fixed' >
            <Toolbar>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                        BOOKSTORE.ORG
                    </Link>
                </Typography>

                <SearchBar />

                <Box
                    display='flex'
                    justifyContent='space-between'
                    alignContent='center'
                >
                    <Button color='inherit'>
                        <Link to='/cart' style={{ textDecoration: 'none', color: 'white' }}>
                            <Badge badgeContent={4} color='secondary'>
                                <ShoppingCartIcon />
                            </Badge>
                        </Link>
                    </Button>


                    <Button color='inherit'>
                        {isLogin ? `${localStorage.getItem('user')}` : 'Guest'}
                    </Button>


                    <Button color='inherit'>
                        {isLogin ? <Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>Logout</Link> : <Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>Login</Link>}
                    </Button>
                </Box>
            </Toolbar>
        </AppBar >
    )
}

export default Header;