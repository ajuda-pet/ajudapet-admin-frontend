import { useState } from "react"
import { Button, Form, FormGroup, InputGroup } from "react-bootstrap"
import InputGroupText from "react-bootstrap/esm/InputGroupText"

const SignupFormGroup3 = ({ next, previus, signupForm}) => {
    const [validated, setValidated] = useState(false)

    const handlePreviusStep = previus
    const handleNextStep = (event) => {
        event.preventDefault()

        if (!event.currentTarget.checkValidity()) {
            event.stopPropagation()
            setValidated(true)
            return
        }

        setValidated(false)
        next()
    }

    const handlePhone = (event) => {
        let input = event.target
        input.value = phoneMask(input.value)
    }

    const phoneMask = (value) => {
        if (!value) return ""
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{2})(\d)/, "($1) $2")
        value = value.replace(/(\d)(\d{4})$/, "$1-$2")
        return value
    }


    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleNextStep}>
                    <FormGroup className='mt-2'>
                        <InputGroup>
                            <InputGroupText>Telefone</InputGroupText>
                            <Form.Control type='tel' placeholder='Número contato do Grupo' onKeyUp={handlePhone} maxLength={15} {...signupForm.register('phone')} pattern='\(\d{2}\) \d{5}-\d{4}' required></Form.Control>
                            <Form.Control.Feedback type='invalid'>Número de contato do Grupo está no formato errado.</Form.Control.Feedback>
                        </InputGroup>
                    </FormGroup>

                    <FormGroup className='mt-2'>
                        <InputGroup>
                            <InputGroupText>Instagram</InputGroupText>
                            <Form.Control type='text' placeholder='Informe o instagram do seu Grupo/ONG' {...signupForm.register('instagram')} required></Form.Control>
                            <Form.Control.Feedback type='invalid'>Instagram não informado.</Form.Control.Feedback>
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

export default SignupFormGroup3