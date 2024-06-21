import { useState } from "react"
import { Button, Form, InputGroup } from "react-bootstrap"
import groupController from "../../../controllers/group.controller"
import { ToastError, setToastError } from "../../Toast/ToastError"
const SignupFormGroup1 = ({ next, previus, signupForm }) => {
    const [validated, setValidated] = useState(false)
    const [spanErrorEmailMessage, setSpanErrorEmailMessage] = useState('Email incorreto') 
    const [spanErrorEmailConfirmationMessage, setSpanErrorEmailConfirmationMessage] = useState('Email incorreto')

    const [spanErrorPasswordMessage, setSpanErrorPasswordMessage] = useState('Senha é obrigatória!')
    const [spanErrorPasswordConfirmationMessage, setSpanErrorPasswordConfirmationMessage] = useState('Confirmação de senha é obrigatória!')

    const handlePreviusStep = previus

    const handleNextStep = (event) => {
        event.preventDefault()
        
        const { email, emailConfirmation } = signupForm.getValues()
        const { password, passwordConfirmation } = signupForm.getValues()
        
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

        if (password != passwordConfirmation) {
            setSpanErrorPasswordConfirmationMessage('Senhas não coincidem')
            setValidated(true)
            return
        }

        setValidated(true)

        groupController.getGroupByEmail(email).then(response => {
            if (!response.success) {
                setToastError(response.message)
                return
            }

            if (response.info.group) {
                setToastError('Esse email já tem Grupo cadastrado.')
                return
            }
            next()
        })
    }

    const confirmationEmailValidation = (email, emailConfirmation) => {
        return email != emailConfirmation
    }

    const confirmationPasswordValidation = (password, passwordConfirmation) => {
        return password != passwordConfirmation
    }

    return (
        <>
            <ToastError></ToastError>
            <Form noValidate validated={validated} onSubmit={handleNextStep}>
                <Form.Group className='mb-2'>
                    <Form.Text>
                        <h5>✉️ Informações de Email</h5>
                    </Form.Text>

                    <InputGroup className='mb-3'>
                        <InputGroup.Text>Email</InputGroup.Text>
                        <Form.Control type='email' placeholder='Email do Grupo' {...signupForm.register('email')} required></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            { spanErrorEmailMessage }
                        </Form.Control.Feedback>
                    </InputGroup>

                    <InputGroup className='mb-5'>
                        <InputGroup.Text>Confirmação de Email</InputGroup.Text>
                        <Form.Control type='email' placeholder='Confirmação de Email' {...signupForm.register('emailConfirmation')} required isInvalid={confirmationEmailValidation(signupForm.getValues('email'), signupForm.getValues('emailConfirmation'))}></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            { spanErrorEmailConfirmationMessage }
                        </Form.Control.Feedback>
                    </InputGroup>


                    <Form.Text>
                        <h5>🔑 Informações de senha</h5>
                    </Form.Text>

                    <InputGroup className='mb-3'>
                        <InputGroup.Text>Senha</InputGroup.Text>
                        <Form.Control type='password' placeholder='Informe sua senha' {...signupForm.register('password')} required></Form.Control>
                        <Form.Control.Feedback type='invalid'>{spanErrorPasswordMessage }</Form.Control.Feedback>
                    </InputGroup>

                    <InputGroup className='mb-2'>
                        <InputGroup.Text>Confirmação de Senha</InputGroup.Text>
                        <Form.Control type='password' placeholder='Confirme sua senha' {...signupForm.register('passwordConfirmation')} required isInvalid={confirmationPasswordValidation(signupForm.getValues('password', signupForm.getValues('passwordConfirmation')))}></Form.Control>
                        <Form.Control.Feedback type='invalid'>{ spanErrorPasswordConfirmationMessage }</Form.Control.Feedback>
                    </InputGroup> 


                    <footer className='mt-5 d-flex justify-content-end'>
                        <Button className='mx-1' style={{ minWidth: '20%' }} variant='secondary' onClick={handlePreviusStep}>Voltar</Button>
                        <Button className='mx-1' style={{ minWidth: '20%' }} variant='dark' type='submit'> Próximo </Button>
                    </footer>
                </Form.Group>
            </Form>
        </>
    )
}

export default SignupFormGroup1