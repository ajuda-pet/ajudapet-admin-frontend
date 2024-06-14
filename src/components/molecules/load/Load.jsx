import { Modal } from 'react-bootstrap'
import './load.css'

const Load = () => {
    return (
        <>
            <div className='container'>
            <img src="./images/green.png" id='green' alt='mancha verde' />
            <img src="./images/yellow.png" id='yellow' alt='mancha amarela' />
            <img src="./images/pink.png" id='pink' alt='mancha rosa' />
            <img src="./images/black.png" id='black' alt='mancha preta' />
            </div >

            <Modal className='load' centered show={true}>
                <Modal.Body>
                    <img src='./images/loading-cat.gif' width='400'></img>
                </Modal.Body>
                <Modal.Title className='text-center mb-4'>Carregando...</Modal.Title>

            </Modal>


        </>        
    )

}

export default Load