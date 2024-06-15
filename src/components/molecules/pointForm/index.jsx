import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import './form.css'
import { Card, InputGroup, Row, Col, Form, Alert } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

import L from 'leaflet';

const Step1 = ({ register }) => {
    return (
        <Card className='form-container'>
            <Card.Title>🏠 Informações gerais do Ponto de Adoção</Card.Title>
            <Card.Body>
                <Row>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Nome</InputGroup.Text>
                        <Form.Control
                            placeholder='Ex: Apoio de Animais de Rio Grande'
                            aria-label="Name"
                            aria-describedby="basic-addon1"
                            {...register('name')}
                        />
                    </InputGroup>
                </Row>

                <Row>
                    <InputGroup>
                        <InputGroup.Text>Descrição</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="With textarea" placeholder='Descreve o seu ponto de adoção' {...register('description')} />
                    </InputGroup>
                </Row>
            </Card.Body>
        </Card>
    )
}

const Step2 = ({ register }) => {
    const [groupId, setGroupId] = useState(null);

    useEffect(() => {
        if (groupId === null) {
            setGroupId(localStorage.getItem('groupId'));
        }
    }, []);

    return (
        <Card className='form-container'>
            <Card.Title>📍 Endereço</Card.Title>
            <Card.Body>
                <Row>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">CEP</InputGroup.Text>
                        <Form.Control
                            placeholder="Ex: 06194-070"
                            aria-label="Código Postal"
                            aria-describedby="basic-addon1"
                            {...register('postalCode')}
                        />
                    </InputGroup>
                </Row>

                <Row className='mb-3'>
                    <Col>
                        <h5 className='mt-3'>Selecione o seu Estado</h5>
                        <InputGroup className='mb-3'>
                            <Form.Select aria-label="Default select example" {...register('addressState')}>
                                <option value="AC">AC</option>
                                <option value="AL">AL</option>
                                <option value="AP">AP</option>
                                <option value="AM">AM</option>
                                <option value="BA">BA</option>
                                <option value="CE">CE</option>
                                <option value="DF">DF</option>
                                <option value="ES">ES</option>
                                <option value="GO">GO</option>
                                <option value="MA">MA</option>
                                <option value="MT">MT</option>
                                <option value="MS">MS</option>
                                <option value="MG">MG</option>
                                <option value="PR">PR</option>
                                <option value="PB">PB</option>
                                <option value="PA">PA</option>
                                <option value="PE">PE</option>
                                <option value="PI">PI</option>
                                <option value="RJ">RJ</option>
                                <option value="RN">RN</option>
                                <option value="RS" style={{ backgroundColor: '#a0d1ff44' }}>RS</option>
                                <option value="RO">RO</option>
                                <option value="RR">RR</option>
                                <option value="SC">SC</option>
                                <option value="SE">SE</option>
                                <option value="SP">SP</option>
                                <option value="TO">TO</option>
                            </Form.Select>
                        </InputGroup>
                    </Col>
                </Row>

                <Row className='mb-3'>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Cidade</InputGroup.Text>
                            <Form.Control
                                placeholder="Rio Grande"
                                aria-label="Código Postal"
                                aria-describedby="basic-addon1"
                                {...register('addressCity')}
                            />
                        </InputGroup>

                    </Col>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Bairro</InputGroup.Text>
                            <Form.Control
                                placeholder="Cassino"
                                aria-label="Logradouro"
                                aria-describedby="basic-addon1"
                                {...register('addressNeighborhood')}
                            />
                        </InputGroup>

                    </Col>
                </Row>

                <Row className='mb-3'>
                    <Col lg={8}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Logradouro</InputGroup.Text>
                            <Form.Control
                                placeholder="Rua Cachoeira do Sul"
                                aria-label="Código Postal"
                                aria-describedby="basic-addon1"
                                {...register('addressStreet')}
                            />
                        </InputGroup>

                    </Col>

                    <Col lg={4}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Número</InputGroup.Text>
                            <Form.Control
                                aria-label="Código Postal"
                                aria-describedby="basic-addon1"
                                type='number'
                                {...register('addressNumber')}
                            />
                        </InputGroup>

                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}



const Step3 = ({ register, setValue }) => {
    // Use a imagem do ícone padrão do Leaflet
    const iconUrl = 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png';

    // Defina o tamanho do ícone
    const iconSize = [25, 41];

    // Crie um ícone personalizado com a imagem do ícone padrão do Leaflet
    const defaultIcon = L.icon({
        iconUrl,
        iconSize,
    });

    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                setLat(e.latlng.lat);
                setLng(e.latlng.lng);

            },
        });

        return null;
    };
    useEffect(() => {
        setValue('lat', lat);
        setValue('lon', lng);
    }, [lat, lng, setValue]);
    return (
        <Card className='form-container'>
            <Card.Title>🗺️ Localização</Card.Title>
            <Card.Body>
                <Row>
                    <Col>
                        <Alert className='my-4'>Clique no mapa para selecionar a localização do ponto de adoção.</Alert>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <MapContainer center={[-32.044254048708105, -52.122076770802614]} zoom={3} style={{ height: '50vh', width: '95%' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            />
                            <MapClickHandler />
                            {lat && lng && (
                                <Marker position={[lat, lng]} icon={defaultIcon} />
                            )}
                        </MapContainer>
                    </Col>
                </Row>
                <Row>
                    <Col>

                        <Form.Control
                            aria-label="lat"
                            aria-describedby="basic-addon1"
                            type='number'
                            style={{ display: 'none' }}
                            value={lat || ''}
                            {...register('lat')}
                            readOnly
                        />
                        <Form.Control
                            aria-label="lon"
                            aria-describedby="basic-addon1"
                            type='number'
                            style={{ display: 'none' }}
                            value={lng || ''}
                            {...register('lon')}
                            readOnly
                        />

                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};
const PointForm = ({ step, register, setValue }) => {
    return (
        <>
            {step == 1 &&
                <>
                    <Alert className='my-4'>Lembre-se de cadastrar um nome legal para o ponto de adoção.</Alert>
                    <Step1 register={register}></Step1>
                </>
            }

            {step == 2 &&
                <>
                    <Step2 register={register}></Step2>
                </>
            }
            {step == 3 && (
                <Step3 register={register} setValue={setValue} />
            )

            }
        </>
    )
};

export default PointForm;
