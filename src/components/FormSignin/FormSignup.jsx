import { useState } from "react"
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import signinController from "../../controllers/signin.controller"
import { useNavigate } from "react-router-dom"

import styles from './FormSinup.module.css'

const FormSignup = () => {

    const navigate = useNavigate()
    const [validated, setValidated] = useState(false)
    const signinForm = useForm()

    const handleGoogleLogin = () => alert('Em desenvolvimento')

    const handleRegister = () => navigate('/register')

    const handleSignin = (event) => {
        event.preventDefault()
        const payload = signinForm.getValues()

        if (!event.currentTarget.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            setValidated(true)
            return
        }
        
        signinController.signin(payload).then(response => {
            if (!response.success) {
                alert(response.message)
            }

            const { group, token } = response.info

            window.localStorage.setItem('groupId', group.id)
            window.localStorage.setItem('token', token)
            navigate('/')
        })
    }

    return (
        <>
            <Form noValidate className='px-4 my-5' validated={validated} onSubmit={handleSignin}>

                <center> <h5 className='mt-5 mb-4'>Tecnologia a favor dos pets!</h5> </center>

                <Form.Group className='mb-2'>
                    <InputGroup hasValidation id='input-email'>
                        <Form.Control type='email' placeholder='Email' {...signinForm.register('email')} required></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Email incorreto.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group>
                    <InputGroup hasValidation id='input-password'>
                        <Form.Control type='password' placeholder='Senha' {...signinForm.register('password')} required></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Senha incorreta.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>


                <Button className={`mt-2`} style={{ minWidth: '100%' }} variant='dark' type='submit'> Login </Button>
                <Button className='mt-1 mb-2' style={{ minWidth: '100%' }} variant='danger' type='' onClick={handleGoogleLogin} >
                    <img src='./images/google-icon.png' width='20'></img> &nbsp;
                    <label>Google</label>
                </Button>

                <Row className={`mb-3 px-4 ${styles.alignEnd}`}>
                    <a className={`${styles.registerLink}`} onClick={handleRegister}>
                        <u><i>Não tem cadastro? Registre-se.</i></u>
                    </a>
                </Row>


            </Form>
        </>
    )
}

export default FormSignup