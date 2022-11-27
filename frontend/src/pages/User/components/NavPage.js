import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import Git from '../pages/Git'
import Home from '../pages/Home'

const NavPage = () => {
    return (
        <React.Fragment>
            <section>

                <Routes>
                    <Route path="/user/account/profile" element={<Home />} />
                    <Route path="/user/account/git" element={<Git />} />
                </Routes>

            </section>
        </React.Fragment>
    );
};

export default NavPage;