import { Card, CardActionArea, CardContent, CardMedia, Grid, Pagination, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MDBRipple } from 'mdb-react-ui-kit';


function AllBook() {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`api/books?page=${page}`)
            .then(res => {
                setBooks(res.data)
                console.log(res.data);
            })
    }, [page]);

    const handleChangePage = (event, value) => {
        setPage(value);
    }

    const navigateToBookDetail = (id) => {
        navigate(`/books/${id}`,)
    }

    return (
        <div style={{ marginTop: "70px" }}>
            <Typography variant="h6" component="div" gutterBottom>
                Tất cả sách (trang {page})
            </Typography>
            <Grid container spacing={1}>
                {books.bookList && books.bookList.map((book, index) => {
                    return (
                        <Grid item xs={2} key={index}>
                            <Card sx={{ height: "100%" }} style={{ boxShadow: "0 0 5px #ccc" }}>
                                <CardActionArea onClick={() => navigateToBookDetail(book.bookId)} component="div" >
                                    <MDBRipple rippleTag='div' className='bg-image hover-overlay hover-zoom '>
                                        <CardMedia
                                            component="img"
                                            image={book.bookImg}
                                            alt="image"
                                        />
                                    </MDBRipple>
                                    <CardContent>
                                        <Typography variant="body2" component="div" mb={1} noWrap>
                                            {book.bookName}
                                        </Typography>
                                        <Typography variant="h7" color="red">
                                            {book.bookPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
            <Stack direction="row" mt="20px" justifyContent="center" spacing={2}>
                <Pagination color="error" count={10} page={page} onChange={handleChangePage}></Pagination>
            </Stack>


        </div>
    );
}

export default AllBook;