import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userSelector } from "../../../redux/selectors";
import axios from "axios";
import { Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";

function Profile() {
    const [data, setData] = useState({});
    const username = useSelector(userSelector);

    useEffect(() => {
        const fetchData = () => {
            axios.create({
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .get(`api/users/${username}`)
                .then(res => setData(res.data))
        }
        fetchData();
    }, [username]);
    return (
        <Paper sx={{ p: 2 }} >
            {data.user && (
                <Box>
                    <Typography variant="h6" component="div" gutterBottom>
                        Hồ Sơ Của Tôi
                    </Typography>
                    <Typography marginBottom="20px" variant="body2" component="div" gutterBottom>
                        Quản lý thông tin tài khoản cá nhân
                    </Typography>
                    <Divider />
                    <Grid container spacing={1}>
                        <Grid item xs={2} >
                            <Box marginTop="20px" >
                                <Typography padding="15px" variant="body2" component="div" gutterBottom>
                                    Tên đăng nhập
                                </Typography>
                                <Typography padding="15px" variant="body2" component="div" gutterBottom>
                                    Họ và tên
                                </Typography>
                                <Typography padding="15px" variant="body2" component="div" gutterBottom>
                                    Email
                                </Typography>
                                <Typography padding="15px" variant="body2" component="div" gutterBottom>
                                    Số điện thoại
                                </Typography>
                                <Typography padding="15px" variant="body2" component="div" gutterBottom>
                                    Địa chỉ
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={10}>
                            {data.user && (
                                <Box component="form" marginTop="20px" >
                                    <Typography padding="15px" variant="body2" component="div" gutterBottom>
                                        {data.user[0].username}
                                    </Typography>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Họ và tên"
                                        defaultValue={data.user[0].birthname}
                                    />
                                    <Typography padding="15px" variant="body2" component="div" gutterBottom>
                                        {data.user[0].email}
                                    </Typography>
                                    <Typography padding="15px" variant="body2" component="div" gutterBottom>
                                        {data.user[0].phonenumber || "Chưa cập nhật"}
                                    </Typography>
                                    <Typography padding="15px" variant="body2" component="div" gutterBottom>
                                        {data.user[0].address || "Chưa cập nhật"}
                                    </Typography>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Paper>
    )
}

export default Profile