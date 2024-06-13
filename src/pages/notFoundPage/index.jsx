import React from 'react'
import { Modal, ModalBody } from 'react-bootstrap'
function NotFoundPage() {
    return (
        <>
            <Modal show={true} size='lg' centered aria-labelledby='contained-modal-title-vcenter'>
                <ModalBody className='mb-4'>
                    <center>
                        <img src='./images/404.jpg' width='600'></img>
                        <h3>Ops! Página não encontrada.</h3>
                    </center>
                </ModalBody>
            </Modal>

        </>
    )
}

export default NotFoundPage;