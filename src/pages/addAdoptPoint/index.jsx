
import React, { useEffect, useState } from 'react';
import './index.css';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Container, Modal, Toast } from 'react-bootstrap';
import Header from '../../components/molecules/header';
import SideBarHome from '../../components/molecules/sideBarHome';
import PointForm from '../../components/molecules/pointForm';
import PointTable from '../../components/molecules/pointTable/PointTable';
import pointsController from '../../controllers/points.controller';
import groupController from '../../controllers/group.controller';
import Load from '../../components/molecules/load/Load';


const AddAdoptPoint = () => {
    const ToastSuccess = (({ show, message }) => {
        return (
            <Toast bg='success' className='position-fixed top-0 end-0 m-4 text-white' style={{ zIndex: 9999 }} show={showToastSuccess} onClose={() => setShowToast(false)}>
                <Toast.Header>
                    <strong className="mr-auto">😸 Sucesso </strong>
                </Toast.Header>
                <Toast.Body>{ message }</Toast.Body>
            </Toast>
        )
    })


    const ToastError = ({ show }) => {
            return (
                <Toast bg='danger' className='position-fixed top-0 end-0 m-4 text-white' style={{ zIndex: 9999 }} show={showToast} onClose={() => setShowToast(false)}>
                    <Toast.Header>
                        <strong className="mr-auto">😿 Atenção</strong>
                    </Toast.Header>
                    <Toast.Body>Preencha todos os campos antes de avançar.</Toast.Body>
                </Toast>
            )
    }


    const [loading, setLoading] = useState(true)
    const methods = useForm()

    const [showToastSuccess, setShowToastSuccess] = useState(false)
    const [showToast, setShowToast] = useState(false);
    const [step, setStep] = useState(1)
    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true)
    const handleNextStep = () => { 
        
        if (step == 1) {
            const payload =  methods.getValues()
            
            if (!payload.name || !payload.description) {
                setShowToast(true);
                return        
            }
        }

        setStep(step + 1)
    }

    const handleBackStep = () => setStep(step - 1)

    const handleClose = () => {
        setShow(false)
        setStep(1)
    }

    const handleSubmit = (payload) => {
        payload.addressCountry = 'BR'

        const { 
            postalCode, 
            addressState, 
            addressCity,
            addressNeighborhood,
            addressStreet, 
            addressNumber
         } = payload

        if (
            !postalCode ||
            !addressState ||
            !addressCity ||
            !addressNeighborhood ||
            !addressStreet ||
            !addressNumber
        ) {
            setShowToast(true)
            return;
        }


        pointsController.create(payload).then(response => {
            setLoading(true)

            if (response && response.success) {
                const point = response.info.adoptionPoint
                const date = new Date(point.createdAt)

                point.createdAt = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
                points.push(point)

                setShowToastSuccess(false)
                handleClose()
            }
            
            
            setLoading(false)
        })
    }

    useEffect(() => {
        let timer;
        if (showToast) {
            timer = setTimeout(() => {
                setShowToast(false)
                setShowToastSuccess(false)
            }, 2000)
        }

        return () => clearTimeout(timer);
    }, [showToast]);


    const [points, setPoint] = useState([])

    useEffect(() => {
        groupController.getAdoptionPoints().then(response => {
            if (response && response.success) {
                const points = response.info.adoptionPoints

                points.forEach(point => {
                    const date = new Date(point.createdAt)
                    point.createdAt = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
                    setLoading(false)

                })

                setPoint(response.info.adoptionPoints)
                setLoading(false)
            }
        })
    }, [])

    
    return (

        <>
            { !loading && <> 
                <Header />
                <img src="./images/green.png" id='green' alt='mancha verde' />
                <img src="./images/yellow.png" id='yellow' alt='mancha amarela' />
                <img src="./images/pink.png" id='pink' alt='mancha rosa' />
                <img src="./images/black.png" id='black' alt='mancha preta' />
            {/*  |<div className='pointForm'>
                    <PointForm />
                </div> */}
                {/* Sidebar */}
                <SideBarHome page={'/addAdoptPoint'}/>

                {/* Container dos pets */}

                
                
                
                    <Container className='mt-5 ml-5 container-pets p-3 mb-5'>
                        <h2> Pontos de Adoção </h2>
                        <hr class='my-4 bg-primary' />

                        <Button className='d-flex align-items-center justify-content-center text-center px-5 w-100 my-4 adopt-btn' onClick={handleShow}>
                            <span className="material-symbols-outlined" >
                                cottage
                            </span> &nbsp;&nbsp;
                            <span>Cadastrar Ponto de Adoção</span>
                        </Button>


                        {/* Tabela de pontos de adoção */}
                        <PointTable points={points}/>

                    </Container>
                </>
            }

            { loading &&
                <Load condition={loading}></Load>

            }

            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>🐾 Cadastro de Ponto de Adoção</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {step == 1 &&
                        <Container className='PointForm mb-5'>
                            <PointForm step={1} register={methods.register} />
                        </Container>
                    }

                    {
                        step == 2 &&
                        <Container className='PointForm mb-5'>
                            <PointForm step={2} register={methods.register} />
                        </Container>
                    }

                </Modal.Body>
                <Modal.Footer>

                    {step < 2 && <>
                        <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                        <Button variant="primary" onClick={handleNextStep}>Próximo</Button>

                    </>
                    }

                    {step == 2 && <>
                        <Button variant="secondary" onClick={handleBackStep}>Voltar</Button>
                        <Button onClick={methods.handleSubmit(handleSubmit)}>Cadastrar</Button>
                    </>
                    }
                </Modal.Footer>
            </Modal>

            <ToastError message={'Preencha todos os campos'}></ToastError>
            <ToastSuccess message={'Ponto de adoção cadastrado com sucesso.'}></ToastSuccess>
        </>

        

    )
}

export default AddAdoptPoint;