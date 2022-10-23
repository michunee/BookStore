import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBListGroup,
    MDBListGroupItem,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";


function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const shippingFee = 15000
    const userName = localStorage.getItem('user');

    useEffect(() => {
        const fetchData = () => {
            axios
                .get(`api/carts/${userName}`, {
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
    }, [userName])

    useEffect(() => {
        let subTotal = 0;
        cartItems.forEach(item => {
            subTotal += item.totalprice;
        })
        setSubtotal(subTotal);
        setTotal(subTotal + shippingFee);
    }, [cartItems])

    return (

        <section className="h-100 gradient-custom">
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
                            {
                                cartItems.map((item, index) => (
                                    <MDBCardBody key={item.bookId}>

                                        <MDBRow className="align-items-center">

                                            <MDBCol md="2">
                                                <MDBCardImage
                                                    fluid
                                                    src={require(`/assets/${(item.bookImg).replace(/(\r\n|\n|\r)/gm, "")}`)}
                                                    alt="Generic placeholder image"
                                                />
                                            </MDBCol>
                                            <MDBCol md="3" className="d-flex justify-content-center">
                                                <div>
                                                    <p className="small text-muted">Tên</p>
                                                    <p >{item.bookName.substr(0, 20)}</p>
                                                </div>
                                            </MDBCol>

                                            <MDBCol md="2" className="d-flex justify-content-center">
                                                <div>
                                                    <p className="small text-muted">Đơn giá</p>
                                                    <p> {item.bookPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                                                </div>
                                            </MDBCol>
                                            <MDBCol md="3" className="d-flex justify-content-center">
                                                <div>
                                                    <p className="small text-muted">Số lượng</p>
                                                    <p>{item.amount}</p>
                                                </div>
                                            </MDBCol>
                                            <MDBCol md="2" className="d-flex justify-content-center">
                                                <div>
                                                    <p className="small text-muted">Số tiền</p>
                                                    <p>{item.totalprice.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                                                </div>
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
                            <MDBCardHeader>
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

                                <MDBBtn block size="lg">
                                    Thanh toán
                                </MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow >
            </MDBContainer >
        </section >
    )
}

export default Cart;