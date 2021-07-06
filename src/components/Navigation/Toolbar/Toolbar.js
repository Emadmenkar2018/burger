import React, { useState } from 'react';
// import classes from './Toolbar.module.css'
import './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { FaChevronDown, FaAngleRight } from 'react-icons/fa';
import { FiMonitor } from 'react-icons/fi';
import { GiSuitcase } from 'react-icons/gi';
import { CgNotes } from 'react-icons/cg';
import { FaFolderOpen } from 'react-icons/fa';
import { HiMenu, HiOutlineDocument } from 'react-icons/hi';
import { BsBoundingBox } from 'react-icons/bs';
import { useHistory } from "react-router-dom";

const Toolbar = (props) => {
    const [showFirstDropDown, setShowFirstDropDown] = useState(false)
    const [showSecondDropDown, setShowSecondDropDown] = useState(false)
    const [showThirdDropDown, setShowThirdDropDown] = useState(false)
    const [showForthDropDown, setShowForthDropDown] = useState(false)
    // <header className={classes.Toolbar}>
    //     <DrawerToggle clicked={props.drawerToggleClicked}/>
    //     <div className={classes.Logo}>
    //         <Logo/>
    //     </div>
    //     <nav className={classes.DesktopOnly}>
    //         <NavigationItems isAuth={props.isAuth}/>
    //     </nav>
    // </header>
	let history = useHistory();

    const showDropdown = (title) => {
        if (title === "first") {
            setShowFirstDropDown(true)
        } else if (title === "second") {
            setShowSecondDropDown(true)
        } else if (title === "third") {
            setShowThirdDropDown(true)
        } else if (title === "forth") {
            setShowForthDropDown(true)
        }
    }


    const hideDropdown = (title) => {
        if (title === "first") {
            setShowFirstDropDown(false)
        } else if (title === "second") {
            setShowSecondDropDown(false)
        } else if (title === "third") {
            setShowThirdDropDown(false)
        } else if (title === "forth") {
            setShowForthDropDown(false)
        }
    }

    const roseDownarrow = () => {
        return (<
            FaChevronDown color="#E5356A"
            style={
                { marginLeft: 10 }
            }
        />
        )
    }

    const rightArrow = () => (<
        FaAngleRight style={
            { marginRight: 10 }
        }
        color="#475F7B" />
    )

    // const ProfileNav = () => {
    //     return (
    //         <div style={classes.profileNav}>
    //             <img src={"https://u-smile.live/usell/app-assets/images/portrait/small/avatar-s-11.jpg"} alt='U-Sell' />
    //         </div>
    //     )
    // }


    return (
        <>
            {
                /* <Navbar expand={'lg'} className={classes.navbar}>
                                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav"> */
            } { /* <DrawerToggle clicked={props.drawerToggleClicked} />  */}

            <div className="test" >

                <div className="icon" >
                    <HiMenu color="#fff" size={30} />
                </div>

                <div className="iconcenter" >
                    <Logo />
                </div>


                <div className="profileNav" >

                    <span class="profileLeftIcon">
                        <BsBoundingBox color={"#fff"}
                            style={
                                { marginRight: 10 }
                            }
                        />
                    </span>

                    <div className="profileNameContainer">

                        <div class="dropdownProfile">
                            <div data-toggle="dropdownProfile" class="profileName" >
                                <text class="profileNavDroptype">Selim Turquix</text>
                                <text class="profileNavDroptype">Consultant</text> 
                            </div>
                            <div class="dropdownProfile-content">
                                <a>Nederlands</a>
                                <a>Mon Profil</a>
                                <a>Deconnexion</a>
                            </div>
                        </div>


                        <span>
                            <img
                                alt="Avatar"
                                class="profileNavimg"
                                height='40'
                                width="40"
                                src={"https://u-smile.live/usell/app-assets/images/portrait/small/avatar-s-11.jpg"}
                                alt='U-Sell' />
                        </span>
                    </div>

                </div>

            </div>


            <Navbar  className="Toolbar" >
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className="mr-auto" >
                        <Nav.Link className="navItem"
                            href="#home" >
                            < FiMonitor
                                style={{ marginRight: 10 ,marginBottom:2}}
                                color="#475F7B" />
                            Accueil
                        </Nav.Link>

                        <NavDropdown
                            className="navItem"
                            onMouseEnter={() => showDropdown('first')}
                            onMouseLeave={() => hideDropdown('first')}
                            show={showFirstDropDown}
                            title={<span className="navItem" >
                                < GiSuitcase
                                    style={{ marginRight: 10,marginBottom:2 }}
                                    color="#475F7B" />
                                Nouveau contrat
                                <FaChevronDown color="#E5356A"
                                    style={{ marginLeft: 10 }}
                                />
                            </span >
                            } >
                            <NavDropdown.Item href="#action/3.1" >
                                <span onClick={()=>history.push('proximus')} className="dropDownItem" > {rightArrow()}Proximus </span> </NavDropdown.Item>
                                
                            <NavDropdown.Item href="#action/3.2" >
                                <span  onClick={()=>history.push('lampiris')} className="dropDownItem" > {rightArrow()}Lampiris </span>
                            </NavDropdown.Item >

                            <NavDropdown.Item href="#action/3.3" >
                                <span className="dropDownItem" > {rightArrow()}UCare </span> </NavDropdown.Item >

                            <NavDropdown.Item href="#action/3.4" >
                                <span className="dropDownItem" > {rightArrow()}Convention </span> </NavDropdown.Item >
                        </NavDropdown>

                        <NavDropdown className="navItem"
                            onMouseEnter={
                                () => showDropdown('second')
                            }
                            onMouseLeave={
                                () => hideDropdown('second')
                            }
                            show={showSecondDropDown}
                            title={< span className="navItem" > < CgNotes style={
                                { marginRight: 10 ,marginBottom:2}
                            }
                                color="#475F7B" /> Mes contrats < FaChevronDown color="#E5356A"
                                    style={
                                        { marginLeft: 10 }
                                    }
                                /></span >
                            }
                            id="basic-nav-dropdown" >
                            <NavDropdown.Item href="#action/3.1" >
                                <span className="dropDownItem" > {rightArrow()}
                                    Action </span> </NavDropdown.Item > <NavDropdown.Item href="#action/3.2" >
                                <span className="dropDownItem" > {rightArrow()}
                                    Another action </span> </NavDropdown.Item > <NavDropdown.Item href="#action/3.3" >
                                <span className="dropDownItem" > {rightArrow()}
                                    Something </span> </NavDropdown.Item >

                            <NavDropdown.Item href="#action/3.4" >
                                <span className="dropDownItem" > {rightArrow()}
                                    Separated link </span> </NavDropdown.Item > </NavDropdown>

                        <NavDropdown className="navItem"
                            onMouseEnter={
                                () => showDropdown('third')
                            }
                            onMouseLeave={
                                () => hideDropdown('third')
                            }
                            show={showThirdDropDown}
                            title={< span className="navItem" > < FaFolderOpen style={
                                { marginRight: 10 ,marginBottom:2}
                            }
                                color="#475F7B" /> Outils < FaChevronDown color="#E5356A"
                                    style={
                                        { marginLeft: 10 }
                                    }
                                /></span >
                            }
                            id="basic-nav-dropdown" >
                            <NavDropdown.Item href="#action/3.1" > Action </NavDropdown.Item> <NavDropdown.Item href="#action/3.2" > Another action </NavDropdown.Item> <NavDropdown.Item href="#action/3.3" > Something </NavDropdown.Item> <NavDropdown.Item href="#action/3.4" > Separated link </NavDropdown.Item> </NavDropdown >

                        <NavDropdown className="navItem"
                            show={showForthDropDown}
                            onMouseEnter={
                                () => showDropdown('forth')
                            }
                            onMouseLeave={
                                () => hideDropdown('forth')
                            }
                            title={< span className="navItem" > < HiOutlineDocument style={
                                { marginRight: 10 ,marginBottom:2}
                            }
                                color="#475F7B" /> Documents Proximus < FaChevronDown color="#E5356A"
                                    style={
                                        { marginLeft: 10 }
                                    }
                                /></span >
                            }
                            id="basic-nav-dropdown" >
                            <NavDropdown.Item href="#action/3.1" > Action </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2" > Another action </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3" > Something </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4" > Separated link </NavDropdown.Item>
                        </NavDropdown >
                    </Nav>

                </Navbar.Collapse>
            </Navbar >  

        </>

    )
}

export default Toolbar;