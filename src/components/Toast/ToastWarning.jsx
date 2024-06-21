import { useEffect, useState } from "react"
import { Toast, ToastBody, ToastContainer, ToastHeader } from "react-bootstrap"

let setToastWarning

const ToastWarning = ({ show }) => {
    const [showToastWarning, setShow] = useState(show || false)
    const [messageToastWarning, setMessage] = useState()

    useEffect(() => {
        setToastWarning = (message) => {
            setMessage(message)
            setShow(true)

            setTimeout(() => {
                setShow(false)
            }, 5000)
        }
    }, [])

    const toggleShow = () => setShow(false)


    return (
        <>
            <ToastContainer position='top-end' className='m-1'>
                <Toast show={showToastWarning} bg='warning' onClose={toggleShow}>
                    <ToastHeader><h5>Atenção! 😿</h5></ToastHeader>
                    <ToastBody><span>{messageToastWarning || 'Ocorreu um erro no servidor.'}</span></ToastBody>
                </Toast>
            </ToastContainer>
        </>
    )
}

export { ToastWarning, setToastWarning }