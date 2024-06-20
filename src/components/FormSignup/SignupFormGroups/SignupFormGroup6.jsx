import { Button, Form, FormGroup, InputGroup } from "react-bootstrap"
import { ToastError, setToastError } from "../../Toast/ToastError"
import { useState } from "react"
import InputGroupText from "react-bootstrap/esm/InputGroupText"

const SignupFormGroup6 = ({ next, previus, signupForm }) => {
    const [validated, setValidated] = useState(false)

    const handlePreviusStep = previus

    const handleNextStep = (event) => {
        event.preventDefault()

        if (!event.currentTarget.checkValidity()) {
            event.stopPropagation()
            setValidated(true)
            return
        }

        next()
    }


    return (
        <>
            <ToastError></ToastError>

            <Form noValidate validated={validated} onSubmit={handleNextStep}>
                <FormGroup className='mt-2'>
                    <Form.Select aria-label="Default select example" className='mb-3' {...signupForm.register('pixType')} required>
                        <option value=''>Selecione o tipo da chave do seu Pix</option>
                        <option value="EMAIL">Email</option>
                        <option value="PHONE">Telefone</option>
                        <option value="CPF">CPF</option>
                        <option value="CNPJ">CNPJ</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>Tipo de chave pix está no formato errado.</Form.Control.Feedback>
                </FormGroup>

                <FormGroup>
                    <InputGroup>
                        <InputGroupText>Chave Pix</InputGroupText>
                        <Form.Control type='text' placeholder='Informe sua chave pix para receber doações' {...signupForm.register('pixKey')} required></Form.Control>
                        <Form.Control.Feedback type='invalid'>Chave pix está no formato errado.</Form.Control.Feedback>
                    </InputGroup>
                </FormGroup>

                <footer className='mt-5 d-flex justify-content-end'>
                    <Button className='mx-1' style={{ minWidth: '20%' }} variant='secondary' onClick={handlePreviusStep}> Voltar </Button>
                    <Button className='mx-1' style={{ minWidth: '20%' }} variant='dark' type='submit'> Próximo </Button>
                </footer>
            </Form>
        </>
    )
}

export default SignupFormGroup6