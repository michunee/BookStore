import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Rating, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/selectors";

const Order = () => {
    const [orders, setOrders] = useState([])
    const [detailBill, setDetailBill] = useState([])
    const [open, setOpen] = useState(false)
    const [openComment, setOpenComment] = useState(false)
    const [content, setContent] = useState('')
    const [rating, setRating] = useState(0)
    const shipping = 15000
    const username = useSelector(userSelector);

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
                })
        }
        fetchData();
    }, [username])

    const handleViewDetail = (id) => {
        setOpen(true)
        axios
            .get(`api/bills/${id}/books`, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                setDetailBill(res.data.data)
                console.log(res.data.data)
            })
    }

    const handleOpenComment = () => {
        setOpenComment(true)
    }

    const handleCloseComment = () => {
        setOpenComment(false)
    }

    const handleChangeContent = (e) => {
        setContent(e.target.value)
    }

    const handlePostComment = (id) => {
        const data = {
            content: content,
            rating: rating
        }
        axios
            .post(`api/comments/user/${username}/book/${id}`, data, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                console.log(res.data)
                setOpenComment(false)
            })
    }

    const handleClose = () => {
        setOpen(false)
    }

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
                                <TableCell align="center">{order.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</TableCell>
                                <TableCell align="center">{order.totalPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</TableCell>
                                <TableCell align="center">Đã thanh toán</TableCell>
                                <TableCell align="center">
                                    <Button onClick={() => handleViewDetail(order.billId)} color="error">Xem</Button>
                                    <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="scroll-dialog-title"
                                        aria-describedby="scroll-dialog-description"
                                        maxWidth="lg"
                                    >
                                        <DialogTitle id="scroll-dialog-title">
                                            Chi tiết đơn hàng
                                        </DialogTitle>
                                        <DialogContent width={1200} sx={{ p: 5 }}>
                                            <Box>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Tên sách</TableCell>
                                                            <TableCell></TableCell>
                                                            <TableCell>Tác giả</TableCell>
                                                            <TableCell align="center">Số lượng</TableCell>
                                                            <TableCell align="center">Tổng giá</TableCell>
                                                            <TableCell align="center">Đánh giá</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {detailBill.map((book) => (
                                                            <TableRow key={book.bookId}>
                                                                <TableCell><img width={80} src={book.bookImg}></img></TableCell>
                                                                <TableCell>{book.bookName}</TableCell>
                                                                <TableCell>{book.bookAuthor}</TableCell>
                                                                <TableCell align="center">{book.amount}</TableCell>
                                                                <TableCell align="center">{book.totalprice.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</TableCell>
                                                                <TableCell align="center">
                                                                    <Button onClick={handleOpenComment} color="error">Đánh giá</Button>
                                                                    <Dialog
                                                                        open={openComment}
                                                                        onClose={handleCloseComment}
                                                                        aria-labelledby="scroll-dialog-title"
                                                                        aria-describedby="scroll-dialog-description"
                                                                        maxWidth="lg"
                                                                    >
                                                                        <DialogTitle id="scroll-dialog-title">
                                                                            Đánh giá sản phẩm
                                                                        </DialogTitle>
                                                                        <DialogContent sx={{ p: 5 }}>
                                                                            <Rating
                                                                                name="simple-controlled"
                                                                                value={rating}
                                                                                onChange={(event, newValue) => {
                                                                                    setRating(newValue);
                                                                                }}
                                                                            />
                                                                            <TextField
                                                                                fullWidth
                                                                                label="Nội dung"
                                                                                margin="normal"
                                                                                name="content"
                                                                                required
                                                                                variant="outlined"
                                                                                value={content}
                                                                                onChange={handleChangeContent}

                                                                            />
                                                                        </DialogContent>
                                                                        <DialogActions>
                                                                            <Button onClick={handleCloseComment}>Đóng</Button>
                                                                            <Button onClick={() => handlePostComment(book.bookId)} variant="outlined" color="error">Gửi</Button>
                                                                        </DialogActions>
                                                                    </Dialog>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </Box>
                                            <Box sx={{ mt: 2, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }} >
                                                <Typography variant="h7">
                                                    Phí vận chuyển: {shipping.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                                </Typography>

                                                <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                    Tổng tiền: <Typography variant='h6' color="red">{detailBill.reduce((total, book) => total + book.totalprice, shipping).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</Typography>
                                                </Box>
                                            </Box>

                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Cancel</Button>
                                            <Button onClick={handleClose}>Subscribe</Button>
                                        </DialogActions>
                                    </Dialog>
                                </TableCell>
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
