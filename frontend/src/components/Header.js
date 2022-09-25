import { AppBar, Badge, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box } from "@mui/system";
import SearchBar from "./SearchBar";

function Header() {

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
                        <Link to='/login' style={{ textDecoration: 'none', color: 'white' }}>
                            Đăng nhập
                        </Link>
                    </Button>
                </Box>
            </Toolbar>
        </AppBar >
    )
}

export default Header;