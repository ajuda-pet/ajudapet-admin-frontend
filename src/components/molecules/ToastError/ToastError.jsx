import { Toast } from "react-bootstrap"
import { useEffect, useState } from "react"

const ToastError = ({ message, show, setShow }) => {
    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 2000)
    }, [])

    return (
        <>
            <Toast bg='danger' className='position-fixed top-0 end-0 m-4 text-white' style={{ zIndex: 9999 }} show={show}>
                <Toast.Header>
                    <strong className="mr-auto">Atenção</strong>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </>
    )

}

export default ToastError