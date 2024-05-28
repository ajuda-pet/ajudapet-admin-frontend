import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import './form.css'
import { Card, InputGroup, Row, Col, Form, Alert } from 'react-bootstrap';

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

const PointForm = ({ step, register }) => {
    return (
        <>
            { step == 1 && 
                <>
                    <Alert className='my-4'>Lembre-se de cadastrar um nome legal para o ponto de adoção.</Alert>
                    <Step1 register={register}></Step1> 
                </> 
            }

            { step == 2 && 
                <>
                    <Step2 register={register}></Step2>
                </>
            }
        </>
    )
};

export default PointForm;
