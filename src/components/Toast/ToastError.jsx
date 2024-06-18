import { useEffect, useState } from "react"
import { Toast, ToastBody, ToastContainer, ToastHeader } from "react-bootstrap"

let setToastError

const ToastError = ({ show }) => {
    const [showToastError, setShow] = useState(show || false)
    const [messageToastError, setMessage] = useState()

    useEffect(() => {
        setToastError = (message) => {
            setMessage(message)
            setShow(true)

            setTimeout(() => {
                setShow(false)
            }, 3000)
        }
    }, [])
    
    const toggleShow = () => setShow(false)


    return (
        <>
        <ToastContainer position='top-end' className='m-1'>
                <Toast show={showToastError} bg='danger' onClose={toggleShow}>
                <ToastHeader>Mensagem de erro!</ToastHeader>
                <ToastBody>{messageToastError}</ToastBody>
            </Toast>
        </ToastContainer>
        </>
    )

}

export { ToastError, setToastError  }