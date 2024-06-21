import { useEffect, useState } from "react"
import signupController from "../../../controllers/signup.controller"
import { ToastError, setToastError } from '../../Toast/ToastError' 
import { useNavigate } from "react-router-dom"
import lib from "../../../lib/lib"

const SignupFormGroup5 = ({ next, previus, signupForm }) => {
    const navigate = useNavigate()

    useEffect(() => {
        const payload = {
            name: signupForm.getValues('name'),
            password: signupForm.getValues('password'),
            email: signupForm.getValues('email'),
            cpfCnpj: signupForm.getValues('cpfCnpj'),
            description: signupForm.getValues('description'),
            picture: signupForm.getValues('picture'),
            pixType: signupForm.getValues('pixType'),
            pixKey: signupForm.getValues('pixKey'),
            instagram: signupForm.getValues('instagram'),
            phone: signupForm.getValues('phone'),
            category: signupForm.getValues('category')
        } 

        lib.firebaseUploadImage(payload.picture).then(url => {
            payload.picture = url
            signupController.signup(payload).then((response) => {

                if (!response.success) {
                    setToastError()

                    lib.firebaseDeleteImage(url)
                    setTimeout(() => {
                        if (window.location.pathname == '/cadastro') {
                            navigate('/login')
                        }
                    }, 4000)
    
                    return
                }
    
                const { token, groupId } = response.info
                window.localStorage.setItem('groupId', groupId)
                window.localStorage.setItem('token', token)
                navigate('/')
                return
            })
        })
    }, [])

    return (
        <>
            <ToastError></ToastError>

            <center>
                <img src='images/loading.gif' width='400'></img>
                <h4>Aguarde, estamos carregando seus dados...</h4>
            </center>
        </>
    )
}

export default SignupFormGroup5