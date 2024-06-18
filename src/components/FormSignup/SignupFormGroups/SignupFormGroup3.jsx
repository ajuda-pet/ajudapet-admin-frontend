import { useState } from "react"
import { Badge, Button, Form, FormGroup, InputGroup } from "react-bootstrap"
import InputGroupText from "react-bootstrap/esm/InputGroupText"
import { handleCPFChange } from "../../../pages/register/funcoesRegister"

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

        next()
    }

    const handlePhone = (event) => {
        let input = event.target
        input.value = phoneMask(input.value)
    }

     const handleCpf = (event) => {
         let input = event.target
         input.value = cpfMask(input.value)
     }

    const phoneMask = (value) => {
        if (!value) return ""
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{2})(\d)/, "($1) $2")
        value = value.replace(/(\d)(\d{4})$/, "$1-$2")
        return value
    }

    const cpfMask = (value) => {
        if (!value) return ""
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})/, '$1-$2');
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
                        <InputGroupText>CPF</InputGroupText>
                        <Form.Control type='tel' placeholder='CPF do responsável' onKeyUp={handleCpf} maxLength={14} {...signupForm.register('cpf')} pattern='\d{3}\.\d{3}\.\d{3}-\d{2}' required></Form.Control>
                        <Form.Control.Feedback type='invalid'>CPF não está no formato errado.</Form.Control.Feedback>
                    </InputGroup>
                </FormGroup>


            

            <footer className='mt-5 d-flex justify-content-end'>
                <Button className='mx-1' style={{ minWidth: '20%' }} variant='danger' onClick={handlePreviusStep}> Voltar </Button>
                <Button className='mx-1' style={{ minWidth: '20%' }} variant='dark' type='submit'> Próximo </Button>
            </footer>

        </Form>
        </>
    )
}

export default SignupFormGroup3