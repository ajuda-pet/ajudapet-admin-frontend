import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { Container, Row, Col, Button, Alert, Image, Card, Modal } from 'react-bootstrap'
import Header from '../../components/molecules/header'
import SideBarHome from '../../components/molecules/sideBarHome'
import './index.css'
import groupController from '../../controllers/group.controller'
import FormWhatsapp from '../../components/molecules/FormWhatsapp/FormWhatsapp'
import Load from '../../components/molecules/load/Load'
import FormInstagram from '../../components/molecules/FormInstagram/FormInstagram'
import FormPix from '../../components/molecules/FormPix/FormPix'
import pixController from '../../controllers/pixController'
import ToastInputError from '../../components/molecules/ToastInputError/ToastInputError'
import ToastSuccess from '../../components/molecules/ToastSuccess/ToastSuccess'
import authenticationController from '../../controllers/authentication.controller'

const Home = () => {
  const [showToastInputError, setShowToastInputError] = useState(false)
  const [showToastSuccess, setShowToastSuccess] = useState(false)

  const [submitWhatsappDisabled, setSubmitWhatsappDisabled] = useState(false)
  const [submitInstagramDisabled, setSubmitInstagramDisabled] = useState(false)
  const [submitPixDisabled, setSubmitPixDisabled] = useState(false)

  const handleToastError = () => {
    setShowToastInputError(true)
    setTimeout(() => {
      setShowToastInputError(false)
    }, 2000)
  }

  const handleToastSuccess = () => {
    setShowToastSuccess(true)
    setTimeout(() => {
      setShowToastSuccess(false)
    }, 2000)
  }


  const whatsappFormMethods = useForm()
  const instagramFormMethods = useForm()
  const pixFormMethods = useForm()

  const [loading, setLoading] = useState(true)

  const [group, setGroup] = useState({})

  const [whatsapp, setWhatsapp] = useState()
  const [instagram, setInstagram] = useState()
  const [pix, setPix] = useState()

  const [showWhatsappModal, setWhatsappModal] = useState(false)
  const [showInstagramModal, setInstagramModal] = useState(false)
  const [showPixModal, setPixModal] = useState(false)

  const handleShowWhatsappModal  = () => setWhatsappModal(true)
  const handleCloseWhatsappModal = () => {setWhatsappModal(false); setSubmitWhatsappDisabled(false)}
  const handleShowInstagramModal = () => setInstagramModal(true)
  const handleCloseInstagramModal = () => {setInstagramModal(false); setSubmitInstagramDisabled(false)}
  const handleClosePixModal = () => {setPixModal(false); setSubmitPixDisabled(false)}
  const handleShowPixModal = () => setPixModal(true)


  // WHATSAPP SUBMIT
  const handleWhatsappSubmit = (payload) => {
    setSubmitWhatsappDisabled(true)

    if (!payload.account) {
      setSubmitWhatsappDisabled(false)
      handleToastError()
      return
    }

    if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(payload.account)) {
      setSubmitWhatsappDisabled(false)
      handleToastError()
      return
    }

    if (whatsapp && Object.keys(whatsapp).length) {
      groupController.updateSocialMedia(whatsapp.id, {account: payload.account}, 'whatsapp').then(response => {
        if (response && response.success) {
          setWhatsapp(response.info.socialMedia)
        }
        handleToastSuccess()
        handleCloseWhatsappModal()
      })
      return
    }

    groupController.createSocialMedia({ ...payload, plataform: 'WHATSAPP', url: '.'}).then(response => {
      if (response && response.success) {
        setWhatsapp(response.info.newSocialMedia)
      }
      
      handleToastSuccess()
      handleCloseWhatsappModal()
    })

    setSubmitWhatsappDisabled(false)

  }

  // INSTAGRAM SUBMIT
  const handleInstagramSubmit = (payload) => {
    setSubmitInstagramDisabled(true)
    
    if (!payload.account) {
      handleToastError()
      setSubmitInstagramDisabled(false)
      return
    }

    if (instagram) {
      groupController.updateSocialMedia(instagram.id, {
        ...payload, 
        url: `https://instagram.com/${payload.account}`}, 
        'instagram'
      ).then(response => {

        if (response && response.success) {
          setInstagram(response.info.socialMedia)
        }
      })

      handleToastSuccess()
      handleCloseInstagramModal()
      return
    }

    groupController.createSocialMedia({ ...payload, plataform: 'INSTAGRAM', url: `https://instagram.com/${payload.account}`}).then(response => {
      if (response && response.success) {
        setInstagram(response.info.newSocialMedia)
      }

      handleToastSuccess()
      handleCloseInstagramModal()
    })
  }


  //PIX SUBMIT
  const handlePixSubmit = (payload) => {
    setSubmitPixDisabled(true)

    if (!payload.key || !payload.type) {
      setSubmitPixDisabled(false)
      handleToastError()
      return
    }

    if (pix) {
      pixController.update({ ...payload, qrcode: 'off'}).then(response => {
        if (response && response.success) {
          setPix(response.info.pix)
          handleToastSuccess()
          handleClosePixModal()
        }
      })

      return
    }

    pixController.create({ ...payload, qrcode: 'off'}).then(response => {
      if (response && response.success) {
        setPix(response.info.pix)
      }

      handleToastSuccess()
      handleClosePixModal()
      return
    })
  }


  useEffect(() => {
    authenticationController.isAuthenticate()


    const groupId = localStorage.getItem('groupId')
    groupController.getById(groupId).then(response => {

      if (response && response.succes) {
        const group = response.info.group

        // Set Whatsapp
        group.socialMedia.forEach(socialMedia => {
          if (socialMedia.plataform == 'WHATSAPP') {
            setWhatsapp(socialMedia)
          }

          if (socialMedia.plataform == 'INSTAGRAM') {
            setInstagram(socialMedia)
          }
        })

        setLoading(false)
        setGroup(group)
        setPix(group.pix)
      }
    })
  }, [])


  return (
    <>

      {!loading && <div>
        <Header />

        <div className='container'>
          {/* Header */}

          {/* Sidebar */}
          <SideBarHome page={'/'}/>
        
        </div >


        <div className='px-3'>
            <Container className='mt-5 ml-5 container-pets p-3 mb-5'>
              <h2> Dados Gerais do Grupo </h2>
              <hr className='my-4 bg-primary' /> 

              <Alert variant='primary'> É importante deixar as informações de contato e sua chave pix atualizadas para receber doações ou adoção de pets.</Alert>

              {/* Foto do Grupo */}
              <Row lg={12} className='mt-5 justify-content-center'>
                  <Col className='text-center'>
                <Image src={group.picture || "./images/ong-profile.jpg"} width='250' roundedCircle />
                  </Col>
              </Row>


              
              <Row className='mt-3'>
                <center>
                  <Col>
                    <h3>{group.name}</h3>
                    <span>{group.description}</span>&nbsp;&nbsp;
                  </Col>
                </center>
              </Row>

              <Row className='mx-5 my-3'>
                <Button variant='secondary' className='adopt-btn' disabled={true}>Editar Grupo (🛠️)</Button>
              </Row>


              <Row className='mt-5 mb-5'>
                <Col xs={12} lg={4} className='my-3'>
                  <Card className='p-3'>
                    <Card.Title>
                      <img src='./images/whatsapp-icon.png' width='40'></img>&nbsp;&nbsp;
                      Whatsapp
                    </Card.Title>
                    <Card.Body>
                      {!whatsapp && <Alert variant='danger'>Não cadastrado.</Alert>}
                      {whatsapp && 
                      
                      <Alert variant='success'>
                          <span> 
                            <strong>Whatsaap:</strong>&nbsp;&nbsp;
                            {whatsapp.account}
                          </span>
                      </Alert>
                      }
                    </Card.Body>

                    <Button variant='secondary' className='adopt-btn' onClick={handleShowWhatsappModal}> Editar </Button>
                  
                  </Card>
                </Col>
                <Col xs={12} lg={4} className='my-3'>
                  <Card className='p-3'>
                    <Card.Title>
                      <img src='./images/instagram-icon.png' width='80'></img>&nbsp;
                      Instagram
                      </Card.Title>
                    <Card.Body>
                      {!instagram && <Alert variant='danger'>Não cadastrado.</Alert>}
                      {instagram && <Alert variant='danger'><strong>@</strong><a target="_blank" href={instagram.url} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <u>{instagram.account}</u>
                        </a>
                        </Alert> }
                    </Card.Body>

                    <Button variant='secondary' className='adopt-btn' onClick={handleShowInstagramModal}> Editar </Button>
                    
                  </Card>
                </Col>
                <Col className='my-3' >
                  <Card className='p-3'>
                    <Card.Title>
                      <img src='./images/pix-icon.png' width='40'></img>&nbsp;&nbsp;             
                      PIX
                      </Card.Title>
                    <Card.Body>
                      {!pix && <Alert variant='danger'>Não cadastrado.</Alert>}
                      {pix && <Alert variant='info'><strong>{pix.type}: </strong>{pix.key}</Alert> }
                      
                    </Card.Body>

                    <Button variant='secondary' className='adopt-btn' onClick={handleShowPixModal}> Editar</Button>
                  </Card>
                </Col>
              </Row>
            </Container>

        </div>
      </div>

    
      }

      { loading && <Load></Load>}


      {/* whatsapp modal */}
      <ToastInputError show={showToastInputError}/>
      <ToastSuccess show={showToastSuccess}/>

      <Modal show={showWhatsappModal} onHide={handleCloseWhatsappModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <img src='./images/whatsapp-icon.png' width='50'></img>&nbsp;&nbsp;
          <h3>Whatsapp</h3>
          </Modal.Header>
        <Modal.Body>
          <FormWhatsapp whatsapp={whatsapp} register={whatsappFormMethods.register} setValue={whatsappFormMethods.setValue}/>
          </Modal.Body>
        
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseWhatsappModal}>Fechar</Button>
          <Button onClick={whatsappFormMethods.handleSubmit(handleWhatsappSubmit)} disabled={submitWhatsappDisabled}>Salvar</Button>
        </Modal.Footer>
      </Modal>

      {/* instagram modal */}
      <Modal show={showInstagramModal} onHide={handleCloseInstagramModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <img src='./images/instagram-icon.png' width='100'></img>&nbsp;&nbsp;
          <h3>Instagram</h3>
          </Modal.Header>
        <Modal.Body>
          <FormInstagram instagram={instagram} register={instagramFormMethods.register} set={instagramFormMethods.setValue}/>
          </Modal.Body>
        
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseInstagramModal}>Fechar</Button>
          <Button onClick={instagramFormMethods.handleSubmit(handleInstagramSubmit)} disabled={submitInstagramDisabled}>Salvar</Button>

        </Modal.Footer>
      </Modal>


      {/* Pix Modal */}
      <Modal show={showPixModal} onHide={handleClosePixModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <img src='./images/pix-icon.png' width='40'></img>&nbsp;&nbsp;
          <h3>Pix</h3>
          </Modal.Header>
        <Modal.Body>
            <FormPix pix={pix} register={pixFormMethods.register}></FormPix>
          </Modal.Body>
        
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClosePixModal}>Fechar</Button>
          <Button onClick={pixFormMethods.handleSubmit(handlePixSubmit)} disabled={submitPixDisabled}>Salvar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Home;
