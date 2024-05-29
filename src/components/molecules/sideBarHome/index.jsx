import React, { useState } from 'react';
import './index.css'


import { Col, Row } from 'react-bootstrap'

const SideBarHome = () => {
    const [showSidebar, setShowSidebar] = useState(true)

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }

    return (
        <>
            <Row className='align-items-center d-none d-sm-flex'>
                <Col className='sidebar px-4'>
                    <a className='circle home' href='/'><img src='./images/home.png' width='30' alt='Ícone de home' title='Home' /></a>
                    <a className='circle' href='/addPet'><img src='./images/pet-icon-sidebar.png' width='30' alt='Ícone de animal de estimação' title='Adicionar Pet' /></a>
                    <a className='circle' href='/addAdoptPoint'><img src='./images/location-icon-sidebar.png' width='30' alt='Ícone de ponto de adoção' title='Adicionar Ponto de Adoção' /></a>
                </Col>
            </Row>
            
        </>
    )
}

export default SideBarHome