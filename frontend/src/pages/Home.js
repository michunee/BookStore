import { Container, Grid } from '@mui/material';

import Header from '../components/Header';
import ScrollTop from '../components/ScrollTop';
import Sidebar from '../components/Book/Sidebar';
import Book from '../components/Book/Book';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import AllBook from '../components/AllBook';
import ControlledCarousel from '../components/BestSeller';


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

    }, [id]);

    // TODO: Get api những category 
    // const { response, error, loading } = useAxios({ url: "api/books/categories/1" })
    return (
        <div >
            <Header />
            <Container style={{ marginTop: "100px" }} maxWidth="lg">
                <ControlledCarousel />
                <AllBook />
                <Grid sx={{ mt: 10 }} container spacing={1}>
                    <Grid item xs={3} >
                        <Sidebar onClickSelectTab={useSelectTabHandler} />
                    </Grid>
                    <Grid item xs={9}>
                        <Book response={data} />
                    </Grid>
                </Grid>
                <ScrollTop />
            </Container>
            <Footer />
        </div >
    )
}

export default Home;