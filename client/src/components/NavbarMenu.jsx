import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';
import Logout from './Log/Logout';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';


function NavbarMenu() {
    const uid = useContext(UidContext);
    const userData = useSelector(state => state.userReducer)

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ "minHeight": "4rem" }}>
                <NavLink exact to="/">
                    <Navbar.Brand href="/">Map-comment</Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {uid ? (
                            <>
                                <NavLink exact to="/settings">
                                    <Nav.Link href="/settings"><i class="fas fa-cog"></i> Paramètres</Nav.Link>
                                </NavLink>
                                <NavDropdown title={userData.first_name} id="collasible-nav-dropdown" class="dropdown-menu-right text-right" right>
                                    <NavLink exact to="/profil">
                                        <NavDropdown.Item href="/profil"><i class="fas fa-user"></i> Profil</NavDropdown.Item>
                                    </NavLink>
                                    <NavDropdown.Divider />
                                    <Logout/>
                                </NavDropdown>
                            </>
                        ) : (
                            <NavLink exact to="/profil">
                                <Nav.Link href="/profil"><i class="fas fa-sign-in-alt"></i> Login</Nav.Link>
                            </NavLink>
                        )}
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">A propos de nous</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )

}

export default NavbarMenu
