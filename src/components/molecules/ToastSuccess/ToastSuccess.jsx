import { Toast } from "react-bootstrap"

const ToastSuccess = ({ show }) => {
    return (
        <>
            <Toast bg='success' className='position-fixed top-0 end-0 m-4 text-white' style={{ zIndex: 9999 }} show={show}>
                <Toast.Header>
                    <strong className="mr-auto">Atenção</strong>
                </Toast.Header>
                <Toast.Body>Salvo com sucesso!</Toast.Body>
            </Toast>
        </>
    )
}

export default ToastSuccess