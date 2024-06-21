import React, { useState } from 'react';
import './index.css'


import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const SideBarHome = ({ page }) => {
    const navigate = useNavigate()
    const [showSidebar, setShowSidebar] = useState(true)

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }

    return (
        <>
            <Row className='align-items-center d-none d-sm-flex'>
                <Col className='sidebar px-4'>
                    <a className={`circle ${page === '/' ? 'home' : ''}`} onClick={() => navigate('/')}><img src='./images/home.png' width='30' alt='Ícone de home' title='Home' /></a>
                    <a className={`circle ${page === '/pets' ? 'home' : ''}`} onClick={() => navigate('/pets')}><img src='./images/pet-icon-sidebar.png' width='30' alt='Ícone de animal de estimação' title='Adicionar Pet' /></a>
                    <a className={`circle ${page === '/pontos' ? 'home' : ''}`} onClick={() => navigate('/pontos')}><img src='./images/location-icon-sidebar.png' width='30' alt='Ícone de ponto de adoção' title='Adicionar Ponto de Adoção' /></a>
                </Col>
            </Row>
            
        </>
    )
}

export default SideBarHome