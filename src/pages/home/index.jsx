import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, CardGroup } from 'react-bootstrap'
import Header from '../../components/molecules/header';
import SideBarHome from '../../components/molecules/sideBarHome';
import CardComponent from '../../components/molecules/cards';
import petController from '../../controllers/pet.controller';
import Form from 'react-bootstrap/Form';
import './index.css';

function Home() {



  return (
    <>

      <Header />

      <div className='container'>
        <img src="./images/green.png" id='green' alt='mancha verde' />
        <img src="./images/yellow.png" id='yellow' alt='mancha amarela' />
        <img src="./images/pink.png" id='pink' alt='mancha rosa' />
        <img src="./images/black.png" id='black' alt='mancha preta' />
        {/* Header */}

        {/* Sidebar */}
        <SideBarHome/>
        
        {/* Container dos pets */}
       
      </div >
    </>
  );
}

export default Home;
