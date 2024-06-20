import { useState } from "react"
import { Button, Form, FormGroup, InputGroup } from "react-bootstrap"
import InputGroupText from "react-bootstrap/esm/InputGroupText"

const SignupFormGroup4 = ({ next, previus, signupForm}) => {
    const [validated, setValidated] = useState(false)
    const [groupCategory, setGroupCategory] = useState('')

    const handleGroupCategory = (event) => {
        setGroupCategory(event.currentTarget.value)
    }

    const handleCpf = (event) => {
        let input = event.target
        input.value = cpfMask(input.value)
    }
    
    const cpfMask = (value) => {
        if (!value) return ""
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})/, '$1-$2');
        return value
    }

    const handleCnpj = (event) => {
        let input = event.target
        input.value = cnpjMask(input.value)
    }

    const cnpjMask = (value) => {
        if (!value) return ""
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{2})(\d)/, '$1.$2')
        value = value.replace(/(\d{3})(\d)/, '$1.$2')
        value = value.replace(/(\d{3})(\d)/, '$1/$2')
        value = value.replace(/(\d{4})(\d{1,2})/, '$1-$2')
        return value
    }
    
    
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

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleNextStep}>
                <FormGroup className='mt-2'>
                    <Form.Select aria-label="Default select example" className='mb-3' {...signupForm.register('category')} onChange={handleGroupCategory}>
                        <option value=''>Selecione a categoria do seu Grupo</option>
                        <option value="ONG">ONG (Entidade privada, sem fins lucrativos)</option>
                        <option value="GROUP">Grupo (Movimento de Assistência a Pets)</option>
                    </Form.Select>

                    {groupCategory == 'GROUP'  && <InputGroup {...signupForm.register('cpf')}>
                        <InputGroupText>CPF</InputGroupText>
                        <Form.Control type='tel' placeholder='CPF do responsável' onKeyUp={handleCpf} maxLength={14} {...signupForm.register('cpf')} pattern='\d{3}\.\d{3}\.\d{3}-\d{2}' required></Form.Control>
                        <Form.Control.Feedback type='invalid'>CPF não está no formato errado.</Form.Control.Feedback>
                    </InputGroup>}

                    {groupCategory == 'ONG' && <InputGroup {...signupForm.register('cpnj')}>
                        <InputGroupText>CNPJ</InputGroupText>
                        <Form.Control type='tel' placeholder='CNPJ da ONG' onKeyUp={handleCnpj} maxLength={18} {...signupForm.register('cnpj')} pattern='\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}' required></Form.Control>
                        <Form.Control.Feedback type='invalid'>CNPJ está no formato errado.</Form.Control.Feedback>
                    </InputGroup>}
                    
                </FormGroup>


                <footer className='mt-5 d-flex justify-content-end'>
                    <Button className='mx-1' style={{ minWidth: '20%' }} variant='secondary' onClick={handlePreviusStep}> Voltar </Button>
                    <Button className='mx-1' style={{ minWidth: '20%' }} variant='dark' type='submit'> Próximo </Button>
                </footer>
            </Form>
        </>
    )
}

export default SignupFormGroup4