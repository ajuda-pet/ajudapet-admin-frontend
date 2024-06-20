import { useEffect } from "react"
import signupController from "../../controllers/signup.controller"
import { ToastError, setToastError } from '../../components/Toast/ToastError' 
import { useNavigate } from "react-router-dom"
import lib from "../../lib/lib"

const SignupFormGroup5 = ({ next, previus, signupForm }) => {
    const navigate = useNavigate()

    useEffect(() => {
        const payload = signupForm.getValues()

        lib.firebaseUploadImage(payload.picture).then(url => {
            signupController.signup(payload).then((response) => {
                if (!response.success) {
                    setToastError()

                    lib.firebaseDeleteImage(url)
                    setTimeout(() => {
                        navigate('/login')
                    }, 4000)
    
                    return
                }
    
                const { token, groupId } = response.info
                
                window.localStorage.setItem('groupId', groupId)
                window.localStorage.setItem('token', token)
                navigate('/')
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