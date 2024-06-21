import { useState } from "react"
import { Badge, Container, ProgressBar } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import SignupFormGroup1 from "./SignupFormGroups/SignupFormGroup1"
import SignupFormGroup2 from "./SignupFormGroups/SignupFormGroup2"
import SignupFormGroup3 from "./SignupFormGroups/SignupFormGroup3"
import SignupFormGroup4 from "./SignupFormGroups/SignupFormGroup4"
import SignupFormGroup5 from "./SignupFormGroups/SignupFormGroup5"
import SignupFormGroup6 from "./SignupFormGroups/SignupFormGroup6"

const FormSignup = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const signupForm = useForm()
    


    const handleNextStep = () => {
        if (step < 6) {setStep(step + 1); return }
    }

    const handlePreviusStep = () => {
        if (step > 1) { setStep(step -1); return}
        navigate('/login')
    }

    return (
        <>
            
            <center>
                <h4 className='mt-5 mb-4'> Cadastro - &nbsp;
                    {step == 1 && <Badge bg='primary'>Categoria</Badge>}
                    {step == 2 && <Badge bg='primary'>Informações do Gerais</Badge>}
                    {step == 3 && <Badge bg='primary'>Redes Socias</Badge>}
                    {step == 5 && <Badge bg='primary'>Seu Login</Badge>}
                    {step == 4 && <Badge bg='primary'>Pix</Badge>}
                    {step == 6 && <Badge bg='primary'>Aguarde</Badge>}
                </h4>
            </center>

            <ProgressBar animated now={(step - 1)/4 * 100 || 10} variant='success'></ProgressBar>

            <Container className='my-4 mt-5'>
                {step == 1 && <SignupFormGroup4 next={handleNextStep} previus={handlePreviusStep} signupForm={signupForm}></SignupFormGroup4>}
                {step == 2 && <SignupFormGroup2 next={handleNextStep} previus={handlePreviusStep} signupForm={signupForm}></SignupFormGroup2>}
                {step == 3 && <SignupFormGroup3 next={handleNextStep} previus={handlePreviusStep} signupForm={signupForm}></SignupFormGroup3>}
                {step == 4 && <SignupFormGroup6 next={handleNextStep} previus={handlePreviusStep} signupForm={signupForm}></SignupFormGroup6>}
                {step == 5 && <SignupFormGroup1 next={handleNextStep} previus={handlePreviusStep} signupForm={signupForm}></SignupFormGroup1>}
                {step == 6 && <SignupFormGroup5 next={handleNextStep} previus={handlePreviusStep} signupForm={signupForm}></SignupFormGroup5>}
           
            </Container>
        </>
    )
}

export default FormSignup