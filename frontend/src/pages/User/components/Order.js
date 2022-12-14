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
    const [idBook, setIdBook] = useState('')
    const [rating, setRating] = useState(1)
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
        axios
            .get(`api/bills/${id}/books`, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                setDetailBill(res.data.data)
                console.log(res.data.data)
                setOpen(true)
            })
    }

    const handlePostComment = (id) => {
        const data = {
            content: content,
            rating: rating
        }
        console.log(id)
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

    const handleOpenComment = (id) => {
        setIdBook(id)
        setOpenComment(true)
    }

    const handleCloseComment = () => {
        setOpenComment(false)
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
                            <TableCell align="center">M?? ????n h??ng</TableCell>
                            <TableCell align="center">Ng??y mua</TableCell>
                            <TableCell align="center">T???ng gi?? s???n ph???m</TableCell>
                            <TableCell align="center">T???ng ti???n thanh to??n</TableCell>
                            <TableCell align="center">Tr???ng th??i</TableCell>
                            <TableCell align="center">Chi ti???t</TableCell>
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
                                <TableCell align="center">???? thanh to??n</TableCell>
                                <TableCell align="center">
                                    <Button onClick={() => handleViewDetail(order.billId)} color="error">Xem</Button>
                                </TableCell>
                            </TableRow>
                        )
                        )}
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="scroll-dialog-title"
                            aria-describedby="scroll-dialog-description"
                            maxWidth="lg"

                        >
                            <DialogTitle id="scroll-dialog-title">
                                Chi ti???t ????n h??ng
                            </DialogTitle>
                            <DialogContent width={1200} sx={{ p: 5 }}>
                                <Box>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>T??n s??ch</TableCell>
                                                <TableCell></TableCell>
                                                <TableCell>T??c gi???</TableCell>
                                                <TableCell align="center">S??? l?????ng</TableCell>
                                                <TableCell align="center">T???ng gi??</TableCell>
                                                <TableCell align="center">????nh gi??</TableCell>
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
                                                        <Button onClick={() => handleOpenComment(book.bookId)} color="error">????nh gi??</Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>
                                <Box sx={{ mt: 2, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }} >
                                    <Typography variant="h7">
                                        Ph?? v???n chuy???n: {shipping.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                    </Typography>

                                    <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        T???ng ti???n: <Typography variant='h6' color="red">{detailBill.reduce((total, book) => total + book.totalprice, shipping).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</Typography>
                                    </Box>
                                </Box>

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>H???y</Button>
                                <Button variant="outlined" onClick={handleClose}>?????ng ??</Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog
                            open={openComment}
                            onClose={handleCloseComment}
                            sx={{ opacity: 1 }}
                            aria-labelledby="scroll-dialog-title"
                            aria-describedby="scroll-dialog-description"
                            maxWidth="lg"
                        >
                            <DialogTitle id="scroll-dialog-title">
                                ????nh gi?? s???n ph???m
                            </DialogTitle>
                            <DialogContent sx={{ p: 5 }}>
                                <Rating
                                    name="simple-controlled"
                                    value={rating ?? 0}
                                    onChange={(event, newValue) => {
                                        setRating(newValue);
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="N???i dung"
                                    margin="normal"
                                    name="content"
                                    required
                                    variant="outlined"
                                    value={content}
                                    multiline
                                    rows={4}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseComment}>????ng</Button>
                                <Button color="error" onClick={() => handlePostComment(idBook)} variant='contained' >G???i</Button>
                            </DialogActions>
                        </Dialog>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Order
