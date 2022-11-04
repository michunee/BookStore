import { AppBar, Badge, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box } from "@mui/system";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/selectors";

function Header() {
    const username = useSelector(userSelector);
    console.log(username);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
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

                    <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                        {username}
                    </Typography>

                    <Button color='inherit' onClick={handleLogout}>Logout</Button>
                </Box>
            </Toolbar>
        </AppBar >
    )
}

export default Header;