import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Container, Grid } from '@mui/material';
import Header from '../components/Header';
import ShoppingCard from '../components/ShoppingCard';
import useAxios from '../hooks/useAxios';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';


function Home() {
    const { response, error, loading } = useAxios({ url: "bookstore/books/" })

    if (loading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }

    if (error) {
        return (
            <Typography textAlign="center" variant="h6" mt={20} color="red"> Something Went Wrong!
            </Typography>
        )
    }

    return (
        <div>
            <Header />

            <Grid sx={{ mt: 10 }} container spacing={3}>
                {response.bookList && response.bookList.map((book, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>

                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea component="div">
                                    <CardMedia
                                        component="img"
                                        height="100%"
                                        width="100%"
                                        image={require(`../assets/${(book.bookImg).replace(/(\r\n|\n|\r)/gm, "")}`)}
                                        alt="image"
                                    />
                                    <CardContent>

                                        <Typography gutterBottom variant="h7" component="div">
                                            {book.bookName}
                                        </Typography>
                                        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                            <Grid item xs={9}>
                                                <Typography variant="body2" color="red">
                                                    {book.bookPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <ShoppingCard />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>

        </div>
    )
}

export default Home;