import React, { useEffect, useState } from 'react';
import './index.css';
import Card from 'react-bootstrap/Card';
import { Alert, Badge, Button, Container, Image, ListGroup, Modal } from 'react-bootstrap';

const CardComponent = (content) => {
    const { pet } = content
    
    const genderHash = { 'MALE': 'Macho', 'FEMALE': 'Fêmea' }
    const ageHash = {'BABY': 'Bebê', 'ADULT': 'Adulto', 'OLD': 'Idoso'}
    const sizeHash = { 'SMALL': 'Pequeno', 'MEDIUM': 'Médio', 'LARGE': 'Grande'}

    const petIcon = pet.species == 'DOG' ? '🐶' : '🐱'
    const genderIcon = pet.gender == 'MALE' ? '♂️' : '♀️'

    const date = new Date(pet.createdAt)
    const formatDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Card className='mx-3 mb-5 card d-flex flex-column'>
                <Card.Img variant="top" src={pet.picture} width='260' height='260/'/>
                <Card.Body>
                    <Card.Title>{petIcon} {pet.name}</Card.Title>
                    
                    <ListGroup className='mt-4'>
                        <ListGroup.Item> <Badge bg="secondary">🎂 Idade&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Badge>&nbsp;&nbsp;{ageHash[pet.age]} </ListGroup.Item>
                        <ListGroup.Item> <Badge bg="secondary">📏 Tamanho</Badge>&nbsp;&nbsp;{sizeHash[pet.size]} </ListGroup.Item>
                        <ListGroup.Item> <Badge bg="secondary">{genderIcon} Gênero&nbsp;&nbsp;&nbsp;</Badge>&nbsp;&nbsp;{genderHash[pet.gender]} </ListGroup.Item>
                        <ListGroup.Item> <Badge bg="secondary">🧬 Espécie &nbsp;&nbsp;</Badge>&nbsp;&nbsp;{pet.species == 'DOG' ? 'Cachorro' : 'Gato'} </ListGroup.Item>
                    </ListGroup>

                    <Button className='adopt-btn mt-3' style={{width: '100%'}} onClick={handleShow}>
                        Quero adotar    
                    </Button>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted"><strong>Publicado em: </strong>{formatDate}</small>
                </Card.Footer>
            </Card>

            <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{petIcon} {pet.name}</Modal.Title>
                </Modal.Header>
                    
                <Modal.Body>
                    <Container className='text-center'>
                        <Image src={pet.picture} thumbnail width='400' className="mx-auto mb-3" />
                        <Alert>🐾 {pet.description}</Alert>
                    </Container>



                    <ListGroup className='mt-4'>
                        <ListGroup.Item> <Badge bg="secondary">🎂 Idade&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Badge>&nbsp;&nbsp;{ageHash[pet.age]} </ListGroup.Item>
                        <ListGroup.Item> <Badge bg="secondary">📏 Tamanho</Badge>&nbsp;&nbsp;{sizeHash[pet.size]} </ListGroup.Item>
                        <ListGroup.Item> <Badge bg="secondary">{genderIcon} Gênero&nbsp;&nbsp;&nbsp;</Badge>&nbsp;&nbsp;{genderHash[pet.gender]} </ListGroup.Item>
                        <ListGroup.Item> <Badge bg="secondary">🧬 Espécie &nbsp;&nbsp;</Badge>&nbsp;&nbsp;{pet.species == 'DOG' ? 'Cachorro' : 'Gato'} </ListGroup.Item>
                    </ListGroup>


                    <h5 className='mt-5'> Ponto de adoção: </h5>
                    <ListGroup className='mt-4'>
                        <ListGroup.Item> <Button className='alert-danger-button'>📍 Localização</Button>  
                        &nbsp;&nbsp;
                        {pet.adoptionPoint.addressStreet}, {pet.adoptionPoint.addressNumber}. 
                        &nbsp;{pet.adoptionPoint.addressNeighborhood}. {pet.adoptionPoint.addressCity}, {pet.adoptionPoint.addressState}
                        </ListGroup.Item>
                    </ListGroup>
                    </Modal.Body>


                <Modal.Footer>
                    <Button variant="danger" className='px-3 py-2' onClick={handleClose}>
                        Fechar
                    </Button>
                    <Button className='whatsapp-button adoption-btn' onClick={handleClose}>
                        <img src='./images/whatsapp-icon.png' width='25'></img>
                        <span> Adotar </span>
                    </Button>
                </Modal.Footer>
            </Modal>
        
        </>
    )
}

export default CardComponent;