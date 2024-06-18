import { useState } from "react"
import { Badge, Container, ProgressBar } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import SignupFormGroup1 from "./SignupFormGroups/SignupFormGroup1"
import SignupFormGroup2 from "./SignupFormGroups/SignupFormGroup2"
import SignupFormGroup3 from "./SignupFormGroups/SignupFormGroup3"

const FormSignup = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState(0)
    const signupForm = useForm()
    


    const handleNextStep = () => {
        if (step < 3) {setStep(step + 1); return }
    }

    const handlePreviusStep = () => {
        if (step > 0) { setStep(step -1); return}
        navigate('/login')
    }

    return (
        <>
            
            <center>
                <h4 className='mt-5 mb-4'> Cadastro de Grupo - &nbsp;
                    {step == 0 && <Badge bg='primary'>Informações do Grupo</Badge>}
                    {step == 1 && <Badge bg='primary'>Informações do Responsável</Badge>}
                    {step == 2 && <Badge bg='primary'>Seu Login</Badge>}
                </h4>
            </center>

            <ProgressBar animated now={step / 3 * 100 || 10} variant='success'></ProgressBar>

            <Container className='my-4 mt-5'>
                {step == 0 && <SignupFormGroup2 next={handleNextStep} previus={handlePreviusStep} signupForm={signupForm}></SignupFormGroup2>}
                {step == 1 && <SignupFormGroup3 next={handleNextStep} previus={handlePreviusStep} signupForm={signupForm}></SignupFormGroup3>}
                {step == 2 && <SignupFormGroup1 next={handleNextStep} previus={handlePreviusStep} signupForm={signupForm}></SignupFormGroup1>}
            </Container>
        </>
    )
}

export default FormSignup