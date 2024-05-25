import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import './index.css'



const logout = () => {
    window.localStorage.removeItem('token')
    window.location.reload()
}

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token)
    }, []);

    return (
        <Navbar className='p-2' style={{ borderRadius: '2px', backgroundColor: ' #212f3f'}} expand="lg" data-bs-theme='dark'>
            <Container fluid>
                <Navbar.Brand href="/"> <img src='./images/header-logo.png' width='210' /></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll>
                    </Nav>

                    <Nav className="d-flex" style={{ maxHeight: '100px',  marginLeft:'40px'}} navbarScroll>
                        <Nav.Link href='https://www.instagram.com/ajudapet.rg/' target='_blank'>
                            <img src='./images/instagram.png' width='40' class='fade-in'/>
                            <span className='d-lg-none'>Instagram</span>
                        </Nav.Link>
                        {!isLoggedIn && (
                            <Nav.Link href='/login'>
                                <Button variant='warning' className="d-flex align-items-center btn-warning">
                                    <span>Login&nbsp;&nbsp;</span>
                                    <span className="material-symbols-outlined">login</span>
                                </Button>
                            </Nav.Link>
                        )}
                        {isLoggedIn && (
                            <Nav.Link onClick={logout}>
                                <Button variant='danger' className="d-flex align-items-center btn-danger">
                                    <span>🐾 Logout &nbsp;&nbsp;</span>
                                    <span className="material-symbols-outlined">logout</span>
                                </Button>
                            </Nav.Link>
                        )}
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;