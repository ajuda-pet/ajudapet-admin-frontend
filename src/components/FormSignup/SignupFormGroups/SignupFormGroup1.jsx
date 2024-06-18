import { useState } from "react"
import { Badge, Button, Form, InputGroup } from "react-bootstrap"

const SignupFormGroup1 = ({ next, previus, signupForm }) => {
    const [validated, setValidated] = useState(false)
    const [spanErrorEmailMessage, setSpanErrorEmailMessage] = useState('Email incorreto') 
    const [spanErrorEmailConfirmationMessage, setSpanErrorEmailConfirmationMessage] = useState('Email incorreto') 

    const handlePreviusStep = previus

    const handleNextStep = (event) => {
        event.preventDefault()
        const { email, emailConfirmation } = signupForm.getValues()
        
        if (!event.currentTarget.checkValidity()) {
            event.stopPropagation()
            setValidated(true)
            return
        }

        if (email != emailConfirmation) {
            setSpanErrorEmailConfirmationMessage('Emails não coincidem')
            setValidated(true)
            return
        }

        //Enviar Token 
        
        next()
    }

    const confirmationEmailValidation = (email, emailConfirmation) => {
        return email != emailConfirmation
    }


    return (
        <Form noValidate validated={validated} onSubmit={handleNextStep}>
            <Form.Group className='mb-2'>
                <InputGroup hasValidation className='mb-2'>
                    <InputGroup.Text>Email</InputGroup.Text>
                    <Form.Control type='email' placeholder='Email do Grupo' {...signupForm.register('email')} required></Form.Control>
                    <Form.Control.Feedback type="invalid">
                        { spanErrorEmailMessage }
                    </Form.Control.Feedback>
                </InputGroup>

                <InputGroup hasValidation>
                    <InputGroup.Text>Confirmação de Email</InputGroup.Text>
                    <Form.Control type='email' placeholder='Confirmação de Email' {...signupForm.register('emailConfirmation')} required isInvalid={confirmationEmailValidation(signupForm.getValues('email'), signupForm.getValues('emailConfirmation'))}></Form.Control>
                    <Form.Control.Feedback type="invalid">
                        { spanErrorEmailConfirmationMessage }
                    </Form.Control.Feedback>
                </InputGroup>

                <footer className='mt-5 d-flex justify-content-end'>
                    <Button className='mx-1' style={{ minWidth: '20%' }} variant='danger' onClick={handlePreviusStep}> Voltar </Button>
                    <Button className='mx-1' style={{ minWidth: '20%' }} variant='dark' type='submit'> Próximo </Button>
                </footer>
            </Form.Group>
        </Form>
    )
}

export default SignupFormGroup1