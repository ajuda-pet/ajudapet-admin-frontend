import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Button, Col, Offcanvas, Row } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import './index.css'

const logout = () => {
    window.localStorage.removeItem('token')
    window.location.reload()
}

function Header() {
    const [showOffCanva, setOffCanva] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleOpenOffCanva = () => setOffCanva(true)
    const handleCloseOffCanva = () => setOffCanva(false)


    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token)
    }, []);

    return (
        <>
            <Navbar className='p-2' style={{ borderRadius: '2px', backgroundColor: ' #212f3f'}} expand="lg" data-bs-theme='dark'>
                <Container fluid>
                    <Navbar.Brand href="/"> <img src='./images/header-logo.png' width='210' /></Navbar.Brand>

                    <Navbar.Toggle aria-controls="" onClick={handleOpenOffCanva} />

                        <Nav.Link onClick={logout} className='d-none d-lg-block'>
                            <Button variant='danger' className="d-flex align-items-center btn-danger">
                                <span>🐾 Logout &nbsp;&nbsp;</span>
                                <span className="material-symbols-outlined">logout</span>
                            </Button>
                        </Nav.Link>

                </Container>
            </Navbar>

            <Offcanvas show={showOffCanva} onHide={handleCloseOffCanva} style={{ backgroundColor: '#212f3f'}}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <img src='./images/header-logo.png' width='300'></img>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                        
                        <a href='/' className='anchor'>
                            <Row className={`p-2 ${window.location.pathname == '/' ? 'off-canva-item-target' : 'off-canva-item'}`}>
                                <Col xs={12}> 
                                    <img src='./images/home.png' width='30'></img> &nbsp;
                                    <span>Home</span>
                                </Col>
                            </Row>
                        </a>

                        <a href='/addPet' className='anchor'>
                        <Row className={`p-2 ${window.location.pathname == '/addPet' ? 'off-canva-item-target' : 'off-canva-item'}`}>
                                <Col xs={12}> 
                                    <img src='./images/pets.png' width='30'></img> &nbsp;
                                    <span>Pets</span>
                                </Col>
                            </Row>
                        </a>

                        <a href='/addAdoptPoint' className='anchor'>
                        <Row className={`p-2 ${window.location.pathname == '/addAdoptPoint' ? 'off-canva-item-target' : 'off-canva-item'}`}>
                                <Col xs={12}> 
                                    <img src='./images/location.png' width='30'></img> &nbsp;
                                    <span>Pontos</span>
                                </Col>
                            </Row>
                        </a>

                        <Row className='mt-5' onClick={logout}>
                            <Button variant='danger' className="d-flex align-items-center btn-danger">
                                <span className="material-symbols-outlined">logout</span>
                                <span>Logout &nbsp;&nbsp;</span>
                            </Button>
                        </Row>

                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Header;