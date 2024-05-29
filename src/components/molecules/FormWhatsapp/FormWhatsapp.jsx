import React, { useState } from 'react';
import { Card, Form, InputGroup, Row } from 'react-bootstrap';
import { formatPhoneNumber, validatePhoneNumber } from '../../validators/telefone';

const FormWhatsapp = ({whatsapp, register, setValue}) => {
    const [phoneNumber, setPhoneNumber] = useState(whatsapp ? whatsapp.account : '');

    const handlePhoneNumberChange = (event) => {
        let value = event.target.value;
        value = value.replace(/\D/g, '');
        let maskedValue = '';
        if (value.length <= 12) {
            if (value.length > 2) {
                maskedValue += `(${value.slice(0, 2)})`;
            } else if (value.length <= 2) {
                maskedValue += `(${value}`;
            }

            if (value.length > 2 && value.length <= 7) {
                maskedValue += ` ${value.slice(2, 7)}`;
            } else if (value.length > 2 && value.length > 7) {
                maskedValue += ` ${value.slice(2, 6)}-${value.slice(6, 11)}`;
            }

            setPhoneNumber(maskedValue);
        }
    };

    const handlePhoneNumberBlur = () => {
        const formattedValue = formatPhoneNumber(phoneNumber)
        setValue('account', formattedValue)
        setPhoneNumber(formattedValue)
    };

    return (
        <>
            <Card className='form-container'>
                <Card.Title>
                    Coloque seu contato para doações
                </Card.Title>
                <Card.Body>
                    <Row>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Whatsapp</InputGroup.Text>
                            <Form.Control
                                placeholder=''
                                aria-label="número de contato"
                                aria-describedby="basic-addon1"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                onBlur={handlePhoneNumberBlur}
                            />
                        </InputGroup>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};

export default FormWhatsapp;