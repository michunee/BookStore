import { AppBar, Badge, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box } from "@mui/system";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/selectors";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
    const username = useSelector(userSelector);
    // console.log(username);
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.
            post('api/users/logout', {
                headers: {
                    'token': `Bearer ${localStorage.getItem('token')}`
                }
            }
            )
            .then(res => {
                console.log(res.data);
                localStorage.removeItem('token');
                navigate('/login');
            })
    }

    const handleGoToUserPage = () => {
        navigate(`/users/${username}`);
    }

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

                    <Link to='/cart' style={{ textDecoration: 'none', color: 'white' }}>
                        <Button color='inherit'>
                            <Badge badgeContent={4} color='secondary'>
                                <ShoppingCartIcon />
                            </Badge>
                        </Button>
                    </Link>

                    <Button color='inherit' onClick={handleGoToUserPage}>{username}</Button>

                    <Button color='inherit' onClick={handleLogout}>Logout</Button>
                </Box>
            </Toolbar>
        </AppBar >
    )
}

export default Header;