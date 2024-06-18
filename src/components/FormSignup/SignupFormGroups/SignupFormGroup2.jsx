import { useEffect, useState } from "react"
import { Alert, Badge, Button, Form, FormGroup, FormText, Image, InputGroup } from "react-bootstrap"

const SignupFormGroup2 = ({ next, previus, signupForm }) => {
    const handlePreviusStep = previus

    const [pictureUrl, setPictureUrl] = useState('')
    const [validated, setValidated] = useState(false)

    const handlePictureUrl = async (event) => {
        const file = event.target.files[0]

        if (!file) return

        const url = URL.createObjectURL(file)

        setPictureUrl(url)
        signupForm.setValue('picture', url)

        console.log(signupForm)
    }

    const handleNextStep = (event) => {
        event.preventDefault()

        if (!event.currentTarget.checkValidity()) {
            event.stopPropagation()
            setValidated(true)
            return
        }
        next()
    }

    useEffect(() => {

        console.log(signupForm.getValues('picture'))
        setPictureUrl(signupForm.getValues('picture') || '')
    }, [])


    return (
        <>
            <Form onSubmit={handleNextStep} noValidate validated={validated}>
                <FormGroup className='mt-2'>

                    {
                        pictureUrl && 
                        <>
                            <center className='my-3'>
                                <Image src={pictureUrl} className='group-image' width={250} roundedCircle></Image>
                            </center>
                        </>
                    }

                    <Form.Text><h6>🏞️ Selecione a imagem do seu Grupo</h6></Form.Text>
                    <InputGroup>
                        <Form.Control type='file' onChange={handlePictureUrl} accept='image/*' required></Form.Control>
                        <Form.Control.Feedback type='invalid'> Imagem do Grupo é obrigatória </Form.Control.Feedback>
                    </InputGroup>
                </FormGroup>

                <FormGroup className='mt-3'>
                    <InputGroup>
                        <InputGroup.Text>Nome</InputGroup.Text>
                        <Form.Control type='text' placeholder='Nome do Grupo' {...signupForm.register('name')} required></Form.Control>
                        <Form.Control.Feedback type='invalid'> Grupo é obrigado a ter nome </Form.Control.Feedback>
                    </InputGroup>
                </FormGroup>
 
                <FormGroup className='mt-2'>
                    <InputGroup>
                        <InputGroup.Text>Descrição</InputGroup.Text>
                        <Form.Control as='textarea' placeholder='Descreve o propósito do seu Grupo' {...signupForm.register('description')}></Form.Control>
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

export default SignupFormGroup2