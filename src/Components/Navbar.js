/*
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
    CDBNavbar,
    CDBNavBrand,
    CDBNavItem,
    CDBNavLink,
    CDBDropDown,
    CDBDropDownMenu,
    CDBDropDownToggle,
    CDBBtn,
    CDBNavToggle,
    CDBIcon,
    CDBCollapse,
    CDBNavbarNav,
    CDBContainer,
} from 'cdbreact';
import { useState } from 'react';

const Navbar = () => {
    const [collapse2, setCollapse2] = useState(false);

    const bgBlack = { backgroundColor: '#000000', color: '#f4f4f4' };

    return (
        <CDBContainer>
            <Router style={{ width: '100%' }}>
                <CDBNavbar style={bgBlack} dark expand="md" scrolling>
                    <CDBNavBrand href="/">
                        <strong>Navbar</strong>
                    </CDBNavBrand>
                    <CDBNavToggle
                        onClick={() => {
                            setCollapse2(!collapse2);
                        }}
                    />
                    <CDBCollapse id="navbarCollapse1" isOpen={collapse2} navbar>
                        <CDBNavbarNav left className="align-items-center">
                            <CDBNavItem>
                                <CDBDropDown>
                                    <CDBDropDownToggle caret style={{ padding: 0 }} color="dark" circle>
                                        Categories
                                    </CDBDropDownToggle>
                                    <CDBDropDownMenu>Coming soon #pleaseStayUpdated.</CDBDropDownMenu>
                                </CDBDropDown>
                            </CDBNavItem>
                            <CDBNavItem>
                                <CDBBtn circle color="dark" style={{ padding: 0 }}>
                                    <CDBNavLink to="#">Help</CDBNavLink>
                                </CDBBtn>
                            </CDBNavItem>
                            <CDBNavItem>
                                <CDBBtn circle color="dark" style={{ padding: 0 }}>
                                    <CDBNavLink to="#">About</CDBNavLink>
                                </CDBBtn>
                            </CDBNavItem>
                        </CDBNavbarNav>
                        <CDBNavbarNav right>
                            <CDBNavItem>
                                <CDBBtn circle color="dark" style={{ padding: 0 }}>
                                    <CDBNavLink to="#">
                                        <CDBIcon className="me-2" icon="globe" />
                                        EN
                                    </CDBNavLink>
                                </CDBBtn>
                            </CDBNavItem>

                            <CDBNavItem>
                                <CDBBtn circle color="dark" style={{ padding: 0 }}>
                                    <CDBNavLink to="#">
                                        <CDBIcon className="me-2" icon="user" />
                                        Login
                                    </CDBNavLink>
                                </CDBBtn>
                            </CDBNavItem>
                            <CDBNavItem>
                                <CDBBtn color="white" style={{ padding: '0px 10px' }}>
                                    <CDBNavLink to="#" style={{ color: '#000' }}>
                                        Sign Up
                                    </CDBNavLink>
                                </CDBBtn>
                            </CDBNavItem>
                        </CDBNavbarNav>
                    </CDBCollapse>
                </CDBNavbar>
            </Router>
        </CDBContainer>
    );
};
export default Navbar;

*/