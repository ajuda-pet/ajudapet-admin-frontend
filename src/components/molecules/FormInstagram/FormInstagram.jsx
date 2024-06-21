import { useEffect, useState } from "react"
import { Card, Row, InputGroup, Form } from "react-bootstrap"

const FormInstagram = ({ instagram, register, set }) => {
    useEffect(() => {
        instagram ? set('account', instagram.account) : set('account', '')
    }, [])



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
                                {...register('account')}
                                
                            />
                        </InputGroup>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}


export default FormInstagram