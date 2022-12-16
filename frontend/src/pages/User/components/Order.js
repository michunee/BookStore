import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/selectors";

const Order = () => {
    const [orders, setOrders] = useState([])
    const username = useSelector(userSelector);
    console.log(username);
    useEffect(() => {
        const fetchData = () => {
            axios
                .get(`api/bills/${username}`, {
                    headers: {
                        'token': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(res => {
                    setOrders(res.data)
                    console.log(orders.billList[0].billId);
                })
        }
        fetchData();
    }, [username])

    return (
        <div>
            <TableContainer component={Box}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Mã đơn hàng</TableCell>
                            <TableCell align="center">Ngày mua</TableCell>
                            <TableCell align="center">Tổng giá sản phẩm</TableCell>
                            <TableCell align="center">Tổng tiền thanh toán</TableCell>
                            <TableCell align="center">Trạng thái</TableCell>
                            <TableCell align="center">Chi tiết</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.billList?.map((order) => (
                            <TableRow key={order.billId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{order.billId}</TableCell>
                                <TableCell align="center">{order.date.split('T').join(' ').split('.000Z').join('')}</TableCell>
                                <TableCell align="center">{order.price}</TableCell>
                                <TableCell align="center">{order.totalPrice}</TableCell>
                                <TableCell align="center">Đã thanh toán</TableCell>
                                <TableCell align="center"><Button>Xem</Button></TableCell>
                            </TableRow>
                        )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default Order
