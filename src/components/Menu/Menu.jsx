import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export const Menu = () => {
    // Menu 
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Movies</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/"> Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/favoritos"> Favoritos</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
