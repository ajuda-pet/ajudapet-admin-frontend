import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form'
import './index.css';
import Card from 'react-bootstrap/Card';
import { Alert, Badge, Button, Container, Image, ListGroup, Modal, Form } from 'react-bootstrap';
import petController from '../../../controllers/pet.controller';

const CardComponent = ({ pet, onPetUpdate, onPetRemove }) => {
    const genderHash = { 'MALE': 'Macho', 'FEMALE': 'Fêmea' };
    const ageHash = { 'BABY': 'Bebê', 'ADULT': 'Adulto', 'OLD': 'Idoso' };
    const sizeHash = { 'SMALL': 'Pequeno', 'MEDIUM': 'Médio', 'LARGE': 'Grande' };

    const petIcon = pet.species === 'DOG' ? '🐶' : '🐱';
    const genderIcon = pet.gender === 'MALE' ? '♂️' : '♀️';

    const date = new Date(pet.createdAt);
    const formatDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`

    const methods = useForm()
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        name: pet.name || '',
        age: pet.age || '',
        size: pet.size || '',
        gender: pet.gender || '',
        species: pet.species || '',
        description: pet.description || '',
        picture: pet.picture || '',
        adoptionPoint: pet.adoptionPoint || '',
    });
    
    useEffect(() => {
        // console.log("Novo pet recebido:", pet);
        setFormData({
            name: pet.name || '',
            age: pet.age || '',
            size: pet.size || '',
            gender: pet.gender || '',
            species: pet.species || '',
            description: pet.description || '',
            picture: pet.picture || '',
            adoptionPoint: pet.adoptionPoint || '',
        });
    }, [pet]);

    const handleClose = () => {
        setShow(false);
        setEditMode(false);
    };
    const handleShow = () => setShow(true);
    const handleEdit = () => setEditMode(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFormSubmit = (event) => {
        if (event) {
            onPetUpdate(event);
        } else {
            console.error('Form event is undefined');
        }
        event.preventDefault();
    
        console.log(event.target, "AQUI")
        const updatedPet = {
            name: event.target.name.value,
            age: event.target.age.value,
            size: event.target.size.value,
            gender: event.target.gender.value,
            species: event.target.species.value,
            description: event.target.description.value,
            picture: event.target.picture.value,
            adoptionPoint: event.target.adoptionPoint.value
        };
    
        onPetUpdate(updatedPet);
    };

    const prevFormData = useRef();
    const prevEditMode = useRef();
    
    useEffect(() => {
        if (editMode !== prevEditMode.current || JSON.stringify(formData) !== JSON.stringify(prevFormData.current)) {
            const updatedPet = {
                name: formData.name,
                age: formData.age,
                size: formData.size,
                gender: formData.gender,
                species: formData.species,
                description: formData.description,
                picture: formData.picture,
                adoptionPoint: formData.adoptionPoint
            };
        
            onPetUpdate(updatedPet);
        }
    
        prevFormData.current = formData;
        prevEditMode.current = editMode;
    }, [formData, editMode]);
    
    const handleRemove = async () => {
        try {
            setLoading(true)
            await petController.remove(pet.id);
            setLoading(false);
            setShow(false);
            onPetRemove(pet.id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Card className='mx-3 mb-5 card d-flex flex-column'>
                <Card.Img variant="top" src={pet.picture} width='260' height='260/' />
                <Card.Body>
                    <Card.Title>{petIcon} {pet.name}</Card.Title>

                    <ListGroup className='mt-4'>
                        <ListGroup.Item><Badge bg="secondary">🎂 Idade&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Badge>&nbsp;&nbsp;{ageHash[pet.age]} </ListGroup.Item>
                        <ListGroup.Item><Badge bg="secondary">📏 Tamanho</Badge>&nbsp;&nbsp;{sizeHash[pet.size]} </ListGroup.Item>
                        <ListGroup.Item><Badge bg="secondary">{genderIcon} Gênero&nbsp;&nbsp;&nbsp;</Badge>&nbsp;&nbsp;{genderHash[pet.gender]} </ListGroup.Item>
                        <ListGroup.Item><Badge bg="secondary">🧬 Espécie &nbsp;&nbsp;</Badge>&nbsp;&nbsp;{pet.species === 'DOG' ? 'Cachorro' : 'Gato'} </ListGroup.Item>
                    </ListGroup>

                    <Button className='adopt-btn mt-3' style={{ width: '100%' }} onClick={methods.handleSubmit(handleShow)}>
                        Editar (🛠️)
                    </Button>

                    <Button variant='danger' style={{ width: '100%' }} className='mt-2' onClick={methods.handleSubmit(handleRemove)}>
                        Remover (🛠️)
                    </Button>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted"><strong>Publicado em: </strong>{formatDate}</small>
                </Card.Footer>


                <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{petIcon} {pet.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Container className='text-center'>
                        <Image src={pet.picture} thumbnail width='400' className="mx-auto mb-3" />
                        <Alert>🐾 {pet.description}</Alert>
                    </Container>

                    {editMode ? (
                        <Form id="petForm" onSubmit={handleFormSubmit}>
                            <Form.Group controlId="formName">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formAge">
                                <Form.Label>Idade</Form.Label>
                                <Form.Control as="select" name="age" value={formData.age} onChange={handleChange}>
                                    <option value="BABY">Bebê</option>
                                    <option value="ADULT">Adulto</option>
                                    <option value="OLD">Idoso</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formSize">
                                <Form.Label>Tamanho</Form.Label>
                                <Form.Control as="select" name="size" value={formData.size} onChange={handleChange}>
                                    <option value="SMALL">Pequeno</option>
                                    <option value="MEDIUM">Médio</option>
                                    <option value="LARGE">Grande</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formGender">
                                <Form.Label>Gênero</Form.Label>
                                <Form.Control as="select" name="gender" value={formData.gender} onChange={handleChange}>
                                    <option value="MALE">Macho</option>
                                    <option value="FEMALE">Fêmea</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formSpecies">
                                <Form.Label>Espécie</Form.Label>
                                <Form.Control as="select" name="species" value={formData.species} onChange={handleChange}>
                                    <option value="DOG">Cachorro</option>
                                    <option value="CAT">Gato</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formDescription">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control as="textarea" name="description" rows={3} value={formData.description} onChange={handleChange} />
                            </Form.Group>
                                <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Foto</Form.Label>
                                <Form.Control type="file" accept='image/*' onChange={handleChange} />
                             </Form.Group>
                            <Form.Group controlId="formAdoptionPoint">
                                <Form.Control as="select" name="adoptionPoint" value={formData.adoptionPoint} onChange={handleChange}>
                                    <option value="Sítio de Adoção">Sítio de Adoção</option>
                                    <option value="Lar do Pedrinho">Lar do Pedrinho</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    ) : (
                        <ListGroup className='mt-4'>
                            <ListGroup.Item><Badge bg="secondary">🎂 Idade&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Badge>&nbsp;&nbsp;{ageHash[pet.age]} </ListGroup.Item>
                            <ListGroup.Item><Badge bg="secondary">📏 Tamanho</Badge>&nbsp;&nbsp;{sizeHash[pet.size]} </ListGroup.Item>
                            <ListGroup.Item><Badge bg="secondary">{genderIcon} Gênero&nbsp;&nbsp;&nbsp;</Badge>&nbsp;&nbsp;{genderHash[pet.gender]} </ListGroup.Item>
                            <ListGroup.Item><Badge bg="secondary">🧬 Espécie &nbsp;&nbsp;</Badge>&nbsp;&nbsp;{pet.species === 'DOG' ? 'Cachorro' : 'Gato'} </ListGroup.Item>
                        </ListGroup>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {editMode ? (
                        <Button variant="primary" type="submit" form="petForm" onClick={handleClose}>Salvar</Button>
                    ) : (
                        <Button variant="primary" onClick={handleEdit}>Editar</Button>
                    )}
                </Modal.Footer>
            </Modal>
            </Card>

           
        </>
    );
};

export default CardComponent;
