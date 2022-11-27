import { Container, Grid } from "@mui/material";
import Sidebar from "./Sidebar";
import NavPage from "./NavPage";


const MainPage = () => {

    return (
        <div>
            <Container maxWidth="lg">
                <Grid container>
                    <Grid item xs={3}>
                        <Sidebar />
                    </Grid>
                    <Grid item xs={9}>
                        <NavPage />
                    </Grid>
                </Grid>
            </Container>
        </div >
    );

}

export default MainPage;