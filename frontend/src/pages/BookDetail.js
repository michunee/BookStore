import { Button, Card, CardMedia, Divider, Fade, Grid, List, ListItem, ListItemText, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header"
import GoBackBtn from "../components/GoBackBtn";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReadMore from "../components/ReadMore";

function BookDetail() {
    const [count, setCount] = useState(1);
    const [data, setData] = useState({});
    const { id } = useParams();
    console.log(id);
    // const { response, error, loading } = useAxios({ url: `/api/books/${id}` })

    useEffect(() => {
        const fetchData = () => {
            axios
                .get(`api/books/${id}`)
                .then(res => setData(res.data))
        }
        fetchData();
    }, [id]);

    console.log(data.book);

    return (
        <div>
            <Header />

            {data.book && (
                <Grid container mt={12} className='animate__animated animate__fadeIn' spacing={3}>
                    <Grid item xs={4} className='animate__animated animate__fadeInLeft' >
                        <Fade in>
                            <Card raised sx={{ my: 3 }}>
                                <CardMedia component='img' image={require(`../assets/${(data.book[0].bookImg).replace(/(\r\n|\n|\r)/gm, "")}`)} alt={id} />
                            </Card>
                        </Fade>

                        <Box
                            display='flex'
                            justifyContent='space-between'
                            mt={2}
                            alignContent='center'
                        >
                            <GoBackBtn />

                            <Typography component='h5' variant='h6' textAlign='center'>
                                {data.book[0].bookPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                            </Typography>
                        </Box>
                    </Grid>



                    <Grid item xs={8} >
                        <Paper elevation={8} sx={{ my: 3 }}>
                            <List>
                                <ListItem>
                                    <ListItemText primary='Tên sách' secondary={data.book[0].bookName} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary='Tác giả' secondary={data.book[0].bookAuthor} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary='Mô tả' secondary={<ReadMore>{data.book[0].bookDes}</ReadMore>} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary='Trạng thái' secondary={data.book[0].enable ? "Còn hàng" : "Hết hàng"} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary='Số lượng' />
                                    <TextField
                                        sx={{ mx: 1 }}
                                        value={count}
                                        onChange={(e) => setCount(e.target.value)}
                                        variant='outlined'
                                        size='small'
                                        type='number'
                                        inputProps={{ min: 1, max: 10 }}
                                    />
                                </ListItem>
                            </List>
                        </Paper>

                        <Button
                            aria-label='addToCart'
                            variant='outlined'
                            color='primary'

                            startIcon={<ShoppingCartIcon />}
                            sx={{ mt: 1 }}
                        >
                            Thêm vào giỏ hàng
                        </Button>

                    </Grid>
                </Grid>
            )
            }
        </div >
    )
}

export default BookDetail   