import Card from '@mui/material/Card';
import { Container, Grid } from '@mui/material';

import Header from '../components/Header';
import ScrollTop from '../components/ScrollTop';
import Sidebar from '../components/Sidebar';
import Book from '../components/Book';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';

function Home() {
    // TODO: Get api những cuốn sách theo category
    // TODO: Gọi api lấy tất cả category về sau đó truyền phần tử đầu tiên của category vào useState setId
    const [id, setId] = useState(1);
    const [data, setData] = useState({});


    const useSelectTabHandler = (id) => {
        setId(id);
    }

    useEffect(() => {
        const fetchData = () => {
            axios
                .get(`api/books/category/${id}`)
                .then(res => setData(res.data))
            // console.log(localStorage.getItem('token'));
        }
        fetchData();
        return () => {
        }
    }, [id]);

    // TODO: Get api những category 
    // const { response, error, loading } = useAxios({ url: "api/books/categories/1" })
    return (
        <div >
            <Header />
            <Container maxWidth="lg">
                <Grid sx={{ mt: 10 }} container spacing={1}>
                    <Grid item xs={3} >
                        <Card style={{ boxShadow: "0 0 5px #ccc" }}>
                            <Sidebar onClickSelectTab={useSelectTabHandler} />
                        </Card>
                    </Grid>
                    <Grid item xs={9}>
                        <Book response={data} />
                        <Pagination />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
            <ScrollTop />
        </div >
    )
}

export default Home;