import Header from "../components/Header"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userSelector } from "../redux/selectors";
import axios from "axios";
import { Divider, Paper, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

function User() {
    const [data, setData] = useState({});
    const username = useSelector(userSelector);

    useEffect(() => {
        const fetchData = () => {
            axios
                .get(`api/users/${username}`)
                .then(res => setData(res.data))
        }
        fetchData();
    }, [username]);
    return (
        <div>
            <Header />
            <Container sx={{ mt: 10 }} maxWidth="lg">
                <Paper elevation={8} sx={{ my: 2 }}>
                    {data.user && (
                        <div>
                            <div>
                                Tên đăng nhập
                            </div>
                            <div>
                                {data.user[0].username}
                            </div>
                        </div>
                    )}
                </Paper>
            </Container>
        </div>
    )
}

export default User