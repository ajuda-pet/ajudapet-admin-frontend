import { useState } from "react"
import { Button, Form, InputGroup, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import signinController from "../../controllers/signin.controller"
import { useNavigate } from "react-router-dom"
import { ToastError, setToastError } from "../Toast/ToastError"

import styles from './FormSignin.module.css'

const FormSignin = () => {
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false)
    const signinForm = useForm()
    
    const handleGoogleLogin = () => alert('Em desenvolvimento')
    const handleRegister = () => navigate('/cadastro')

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
                setToastError(response.message)
                return
            }

            const { group, token } = response.info

            window.localStorage.setItem('groupId', group.id)
            window.localStorage.setItem('token', token)
            navigate('/')
        })
    }

    const handleVitrini = () => {
        let url = 'https://ajudapet-frontend.onrender.com/'

        if (window.location.href.includes('staging') || window.location.href.includes('localhost')) {
            url = 'https://staging-ajudapet-frontend.onrender.com/'
        }

        window.open(url, '_blank')
    }

    return (
        <>            
            <ToastError></ToastError>

            <Form noValidate className='px-4 my-5' validated={validated} onSubmit={handleSignin}>

                <center className='mt-5 mb-5'> 
                    <h5>Tecnologia a favor dos pets!</h5> 
                    <h6 className='text-muted'>
                        Você cadastra e a gente divulga o seu Grupo
                        <a style={{cursor: 'pointer', color: 'green'}}onClick={handleVitrini}><i> <u> aqui.</u></i></a>
                    </h6>
                </center>

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
                <Button className='mt-1 mb-2' style={{ minWidth: '100%' }} variant='danger' type='' onClick={handleGoogleLogin} disabled={true}>
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

export default FormSignin