import { Modal } from 'react-bootstrap'
import './load.css'

const Load = () => {
    return (
        <>
            <Modal className='load' centered show={true}>
                <Modal.Body>
                    <center>
                        <img src='./images/loading.gif' width='400'></img>
                    </center>
                </Modal.Body>
                <Modal.Title className='text-center mb-4'>Carregando...</Modal.Title>

            </Modal>
        </>        
    )

}

export default Load