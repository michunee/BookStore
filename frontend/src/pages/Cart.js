import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBListGroup,
    MDBListGroupItem,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";
import { Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/selectors";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const shippingFee = 15000;
    const username = useSelector(userSelector);

    const navigate = useNavigate();

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
            // console.log(localStorage.getItem('token'));
        }
        fetchData();
        return () => {
        }
    }, [username])

    useEffect(() => {
        let subTotal = 0;
        cartItems.forEach(item => {
            subTotal += item.totalprice;
        })
        setSubtotal(subTotal);
        setTotal(subTotal + shippingFee);
    }, [cartItems])

    const handleIncreaseBook = (id, amount, price) => {
        const data = {
            bookAmount: amount,
            totalprice: amount * price,
            bookPrice: price
        }
        axios.create({
            headers: {
                'token': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .patch(`api/carts/${username}/book/${id}/increase`, data)
            .then(res => {

                setCartItems(res.data);
                console.log(res.data);
            })
    }

    const handleDecreaseBook = (id, amount, price) => {
        const data = {
            bookAmount: amount,
            totalprice: amount * price,
            bookPrice: price
        }
        axios.create({
            headers: {
                'token': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .patch(`api/carts/${username}/book/${id}/decrease`, data)
            .then(res => {
                setCartItems(res.data);
                console.log(res.data);
            })
    }


    const handleDeleteBookFromCart = (id) => {
        axios
            .delete(`api/carts/${username}/book/${id}`, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                console.log('123', res.data);
                setCartItems(res.data);
            }
            )
    }

    const handleClickImage = (id) => {
        navigate(`/books/${id}`);
    }


    return (
        <div className="h-100 gradient-custom">
            <Header></Header>
            <MDBContainer className="py-5 mt-4 h-100">
                <MDBRow className="justify-content-center my-4">
                    <MDBCol md="8">
                        <MDBCard className="mb-4">
                            <MDBCardHeader className="py-3">

                                <MDBTypography tag="h5" className="mb-0">
                                    Giỏ hàng - {cartItems.length} sản phẩm
                                </MDBTypography>
                            </MDBCardHeader>
                            <MDBCardBody >
                                <MDBRow className="align-items-center">
                                    <MDBCol md="2" className="d-flex justify-content-center">
                                        <p className="small text-muted">Sản phẩm</p>
                                    </MDBCol>
                                    <MDBCol md="3">

                                    </MDBCol>
                                    <MDBCol md="2" className="d-flex justify-content-center">
                                        <p className="small text-muted">Đơn giá</p>
                                    </MDBCol>
                                    <MDBCol md="2" className="d-flex justify-content-center">
                                        <p className="small text-muted">Số lượng</p>
                                    </MDBCol>
                                    <MDBCol md="2" className="d-flex justify-content-center">
                                        <p className="small text-muted">Số tiền</p>
                                    </MDBCol>
                                    <MDBCol md="1" className="d-flex justify-content-center">
                                        <p className="small text-muted">Xóa</p>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                            {cartItems && cartItems.map((item) => (
                                <MDBCardBody key={item.bookId}>

                                    <MDBRow className="align-items-center">

                                        <MDBCol md="2"  >
                                            <MDBCardImage onClick={() => handleClickImage(item.bookId)} style={{ maxWidth: "100px", cursor: "pointer" }}
                                                src={require(`/assets/${(item.bookImg).replace(/(\r\n|\n|\r)/gm, "")}`)}
                                                alt="Generic placeholder image"
                                            />
                                        </MDBCol>
                                        <MDBCol md="3" >
                                            <div>
                                                {item.bookName}
                                            </div>
                                        </MDBCol>
                                        <MDBCol md="2" className="d-flex justify-content-center">
                                            <div>
                                                {item.bookPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                            </div>
                                        </MDBCol>
                                        <MDBCol md="2" className="d-flex justify-content-center">
                                            <div>
                                                <IconButton onClick={() => handleIncreaseBook(item.bookId, item.amount, item.bookPrice)}>
                                                    <AddCircleIcon margin="5px" fontSize="10px" color="primary" />
                                                </IconButton>
                                                {item.amount}
                                                <IconButton onClick={() => handleDecreaseBook(item.bookId, item.amount, item.bookPrice)}>
                                                    <RemoveCircleIcon fontSize="10px" color="primary" />
                                                </IconButton>
                                            </div>
                                        </MDBCol>
                                        <MDBCol md="2" className="d-flex justify-content-center">

                                            {item.totalprice.toLocaleString('vi', { style: 'currency', currency: 'VND' })}

                                        </MDBCol>
                                        <MDBCol md="1" className="d-flex justify-content-center">
                                            <IconButton aria-label="delete" onClick={() => handleDeleteBookFromCart(item.bookId)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>

                            ))

                            }
                        </MDBCard>

                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <p>
                                    <strong>Expected shipping delivery</strong>
                                </p>
                                <p className="mb-0">12.10.2020 - 14.10.2020</p>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard className="mb-4 mb-lg-0">
                            <MDBCardBody>
                                <p>
                                    <strong>We accept</strong>
                                </p>
                                <MDBCardImage className="me-2" width="45px"
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                    alt="Visa" />
                                <MDBCardImage className="me-2" width="45px"
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                    alt="American Express" />
                                <MDBCardImage className="me-2" width="45px"
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                    alt="Mastercard" />
                                <MDBCardImage className="me-2" width="45px"
                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                                    alt="PayPal acceptance mark" />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol >
                    <MDBCol md="4">
                        <MDBCard className="mb-4">
                            <MDBCardHeader className="py-3">
                                <MDBTypography tag="h5" className="mb-0">
                                    Tổng thanh toán ({cartItems.length} Sản phẩm)
                                </MDBTypography>
                            </MDBCardHeader>
                            <MDBCardBody>
                                <MDBListGroup flush="true">
                                    <MDBListGroupItem
                                        className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                        Tạm tính
                                        <span>
                                            {subtotal.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                        </span>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                                        Phí vận chuyển
                                        <span>
                                            {shippingFee.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                        </span>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem
                                        className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <strong>
                                                Tổng cộng
                                            </strong>
                                        </div>
                                        <span>
                                            <strong>
                                                {total.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                                            </strong>
                                        </span>
                                    </MDBListGroupItem>
                                </MDBListGroup>

                                <Button fullWidth variant="contained"> Thanh Toán </Button>

                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow >
            </MDBContainer >
        </ div>

    )
}

export default Cart;