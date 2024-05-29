import { useState } from "react"
import { Card, Row, InputGroup, Form } from "react-bootstrap"

const FormPix = ({ pix, register }) => {
    const key = pix ? pix.key : ''
    const type = pix ? pix.type : ''


    return (
        <>
            <Card className='form-container'>
                <Card.Title>
                    Cadastre seu pix para receber doações
                </Card.Title>
                <Card.Body>
                    <Row className='my-3'>
                        <h4>Tipo de chave</h4>
                        <Form.Select aria-label="Default select example" defaultValue={type} {...register('type')}>
                            <option></option>
                            <option value="CPF">CPF</option>
                            <option value="CNPJ">CNPJ</option>
                            <option value="EMAIL">Email</option>
                            <option value="PHONE">Telefone</option>
                        </Form.Select>
                    </Row>

                    <Row>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Chave</InputGroup.Text>
                            <Form.Control
                                defaultValue={key}
                                placeholder='Coloque aqui sua chave'
                                aria-label="Instagram do Grupo"
                                aria-describedby="basic-addon1"
                                {...register('key')}

                            />
                        </InputGroup>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )

}


export default FormPix