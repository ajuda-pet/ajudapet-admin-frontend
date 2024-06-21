import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import pointsController from '../../../controllers/points.controller.js';
import petController from '../../../controllers/pet.controller.js';
import './form.css'; // Importação do arquivo CSS
import { Alert, Card, Col, Form, InputGroup, Row, Container } from 'react-bootstrap';
import groupController from '../../../controllers/group.controller.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../controllers/resgisterImg.js'
const Step1 = ({ points, register }) => {
    return (
        <>
            <Card className='form-container'>
                <Card.Body>
                    <Row className='mb-3'>
                        <Col>
                            <h5 className='mt-3'>📍 Selecione Ponto de Adoção</h5>
                            <InputGroup className='mb-3'>
                                <Form.Select aria-label="Default select example" {...register('adoptionPointId')}>
                                    <option></option>
                                    {points.map((point) => {
                                        return <option key={point.id} value={point.id}>{point.name}</option>
                                    })}
                                </Form.Select>
                            </InputGroup>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

        </>
    )
}

const Step2 = ({ register, onPictureUploaded }) => {

    const [picture, setPicture] = useState('');
    const [pictureURL, setPictureURL] = useState('');

    const handlePicture = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        register('picture', {value: file})
        setPicture(URL.createObjectURL(file))

    }

    return (
        <>
            <Card className='form-container'>
                <Card.Body>
                    <Row className='mb-3'>
                        <Col>
                            <h5>Animal</h5>
                            <InputGroup className='mb-3'>
                                <Form.Select aria-label="Default select example" {...register('species')}>
                                    <option></option>
                                    <option value="DOG">Cachorro</option>
                                    <option value="CAT">Gato</option>
                                </Form.Select>
                            </InputGroup>
                        </Col>

                        <Col>
                            <h5>Gênero</h5>
                            <InputGroup className='mb-3'>
                                <Form.Select aria-label="Default select example" {...register('gender')}>
                                    <option></option>
                                    <option value="MALE">Macho</option>
                                    <option value="FEMALE">Femea</option>
                                </Form.Select>
                            </InputGroup>
                        </Col>

                        <Col>
                            <h5>Tamanho</h5>
                            <InputGroup className='mb-3'>
                                <Form.Select aria-label="Default select example" {...register('size')}>
                                    <option></option>
                                    <option value="SMALL">Pequeno</option>
                                    <option value="MEDIUM">Médio</option>
                                    <option value="LARGE">Grande</option>
                                </Form.Select>
                            </InputGroup>
                        </Col>
                        <Col>
                            <h5>Idade</h5>
                            <InputGroup className='mb-3'>
                                <Form.Select aria-label="Default select example" {...register('age')}>
                                    <option></option>
                                    <option value="BABY">Filhote</option>
                                    <option value="ADULT">Adulto</option>
                                    <option value="OLD">Idoso</option>
                                </Form.Select>
                            </InputGroup>
                        </Col>
                    </Row>

                    <Row className='mb-1'>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Foto</Form.Label>
                            <Form.Control type="file" accept='image/*' onChange={handlePicture} />
                        </Form.Group>
                    </Row>

                    {picture && <Row className='mb-5'>
                        <img src={picture} alt='preview' height='300'></img>
                    </Row>}

                    <Row>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Nome</InputGroup.Text>
                            <Form.Control
                                placeholder="Escreva o nome do seu pet"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                {...register('name')}
                            />
                        </InputGroup>
                    </Row>

                    <Row>
                        <InputGroup>
                            <InputGroup.Text>Descrição</InputGroup.Text>
                            <Form.Control as="textarea" aria-label="With textarea" placeholder='Escreva uma descrição fofa para seu pet' {...register('description')} />
                        </InputGroup>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};

const PetForm = ({ step, register }) => {
    const [points, setPoints] = useState([]);
    const [pictureURL, setPictureURL] = useState('');
    const handlePictureUploaded = (url) => {
        setPictureURL(url);
    };

    useEffect(() => {
        if (pictureURL) {
            register('picture', { value: pictureURL });
        }
    }, [pictureURL, register])


    useEffect(() => {
        groupController.getAdoptionPoints().then(response => {
            if (response.success) {
                setPoints(response.info.adoptionPoints)
            }
        })
    }, [])


    return (
        <FormProvider>
            <Container>

                {step == 1 && <Alert>Para cadastrar um pet, o seu grupo precisar ter necessariamente um <strong>Ponto de adoção</strong>.</Alert>}
                {step == 2 && <Alert variant='warning'>Não esqueça de caprichar na <strong>foto e descrição</strong> do seu pet.</Alert>}

                <Form className='p-2'>
                    {step == 1 && <Step1 points={points} register={register}> </Step1>}
                    {step == 2 && <Step2 register={register} onPictureUploaded={handlePictureUploaded}></Step2>}
                </Form>
            </Container>
        </FormProvider>
    )
}

export default PetForm
