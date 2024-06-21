import { useEffect, useState } from "react"
import { Toast, ToastBody, ToastContainer, ToastHeader } from "react-bootstrap"

let setToastSuccess

const ToastSuccess = ({ show }) => {
    const [showToastSuccess, setShow] = useState(show || false)
    const [messageToastSuccess, setMessage] = useState()

    useEffect(() => {
        setToastSuccess = (message) => {
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
                <Toast show={showToastSuccess} bg='danger' onClose={toggleShow}>
                    <ToastHeader>Mensagem de erro!</ToastHeader>
                    <ToastBody>{messageToastSuccess}</ToastBody>
                </Toast>
            </ToastContainer>
        </>
    )
}

export { ToastSuccess, setToastSuccess }