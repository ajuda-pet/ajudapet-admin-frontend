import { Modal } from "react-bootstrap"
import './load.css'

const Load = ({ condition }) => {
    return (
        <Modal className='load' centered show={true}>
            <Modal.Body> 
                <img src='./images/loading-cat.gif' width='400'></img> 
            </Modal.Body>
            <Modal.Title className='text-center mb-4'>Carregando...</Modal.Title>

        </Modal>
    )
}

export default Load