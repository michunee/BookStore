import { Divider, Grid, IconButton, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

const CustomerList = () => {
    const [user, setUser] = useState([]);
    const [searchedVal, setSearchedVal] = useState("");

    useEffect(() => {
        const fetchData = () => {
            axios
                .get('api/users', {
                    headers: {
                        'token': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(res => {
                    setUser(res.data.user);
                    console.log(res.data.user)
                })
        }
        fetchData();
    }, [])

    return (
        <div>
            <TableContainer sx={{ px: 2 }} component={Box}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="h6" component="div" gutterBottom>
                        Danh sách tài khoản
                    </Typography>
                    <Box>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Tìm kiếm..."
                            onChange={(e) => setSearchedVal(e.target.value)}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Divider></Divider>

                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên tài khoản</TableCell>
                            <TableCell>Họ tên</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Số điện thoại</TableCell>
                            <TableCell>Địa chỉ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user.filter((item) => {
                            if (searchedVal === "") {
                                return item
                            } else if (item.username.toLowerCase().includes(searchedVal.toLowerCase())) {
                                return item
                            }
                        }).map((item) => (
                            <TableRow key={item.username}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {item.username}
                                </TableCell>
                                <TableCell>{item.birthname}</TableCell>
                                <TableCell >{item.email}</TableCell>
                                <TableCell>{item.phonenumber}</TableCell>
                                <TableCell>{item.address}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        </div >
    )
}

export default CustomerList
