import { useState } from "react"
import { Card, Row, InputGroup, Form } from "react-bootstrap"

const FormInstagram = ({ instagram, register }) => {
    const instagramAccount = instagram ? instagram.account : ''
    const instagramUrl = instagram ? instagram.url : ''


    return (
        <>
            <Card className='form-container'>
                <Card.Title>
                    Coloque seu instagram para divulgação do Grupo
                </Card.Title>
                <Card.Body>
                    <Row>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                            <Form.Control
                                placeholder=''
                                aria-label="Instagram do Grupo"
                                aria-describedby="basic-addon1"
                                value={instagramAccount}
                                {...register('account')}
                                
                            />
                        </InputGroup>
                    </Row>
                    <Row>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">URL</InputGroup.Text>
                            <Form.Control
                                placeholder='URL do Instagram'
                                aria-label="Instagram do Grupo"
                                aria-describedby="basic-addon1"
                                value={instagramUrl}
                                {...register('url')}
                                
                            />
                        </InputGroup>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}


export default FormInstagram