import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { useState } from 'react';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(3),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '30ch',
        },
    },
}));

// const Submit = (bookName)=> {
//     bookName = 'a';
// }



function SearchBar() {
    const [books, setBooks] = useState([]);
    const a = async(e) => {
        console.log('Onclick')
        const response = await axios.get(`http://localhost:3000/api/books/a/${e.target.value}`, {
            // headers: {
            //     'Authorization': `Bearer ${localStorage.getItem('token')}`
            // }
        })
        setBooks(response.data)
    }
    console.log(books)
    return (
        <div>
            <Search onChange={(e) => a(e)}>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Tìm kiếm..."
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
            
        </div >
    );
}
export default SearchBar;