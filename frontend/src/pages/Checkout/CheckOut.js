import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import Review from './Review';
import Header from '../../components/Header';
import GoBackBtn from '../../components/GoBackBtn';
import { useState, useEffect } from 'react';
import { userSelector } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import axios from 'axios';

const steps = ['Địa chỉ nhận hàng', 'Kiểm tra đơn đặt hàng'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}

const theme = createTheme();

export default function Checkout() {
    const [activeStep, setActiveStep] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const shippingFee = 15000;
    const username = useSelector(userSelector);

    useEffect(() => {
        const fetchData = () => {
            axios
                .get(`api/carts/${username}`, {
                    headers: {
                        'token': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(res => {
                    setCartItems(res.data.data);
                    console.log(res.data.data);
                })
        }
        fetchData();
    }, [username])

    useEffect(() => {
        let subTotal = 0;
        cartItems.forEach(item => {
            subTotal += item.totalprice;
        })
        setSubtotal(subTotal);
        setTotal(subTotal + shippingFee);
    }, [cartItems])

    const handlePayment = (e) => {
        e.preventDefault();
        const data = {
            price: subtotal,
            ship: shippingFee,
            discount: 0,
            totalPrice: total
        }

        axios
            .post(`api/bills/${username}`, data, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                console.log(res);
                setActiveStep(activeStep + 1)
            })
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1)
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Toolbar>
                <Header />
            </Toolbar>
            <Container component="main" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <GoBackBtn></GoBackBtn>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your order number is #2001539. We have emailed your order
                                confirmation, and will send you an update when your order has
                                shipped.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: "20px" }}>
                                {activeStep !== 0 && (
                                    <Button color="warning" onClick={handleBack} >
                                        Quay lại
                                    </Button>
                                )}

                                {activeStep === steps.length - 1 ? (
                                    <Box component="form" onSubmit={handlePayment}>
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            type="submit"
                                        >
                                            Đặt hàng
                                        </Button>
                                    </Box>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        onClick={handleNext}
                                    >
                                        Tiếp theo
                                    </Button>
                                )
                                }
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
            </Container>
        </ThemeProvider>
    );
}