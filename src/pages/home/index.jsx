import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, CardGroup, Table, Alert, Image, Card, Modal, ModalBody, ModalTitle, Toast, InputGroup } from 'react-bootstrap'
import Header from '../../components/molecules/header';
import SideBarHome from '../../components/molecules/sideBarHome';
import CardComponent from '../../components/molecules/cards';
import Form from 'react-bootstrap/Form';
import './index.css';
import groupController from '../../controllers/group.controller';
import FormWhatsapp from '../../components/molecules/FormWhatsapp/FormWhatsapp';
import { useForm } from 'react-hook-form';
import Load from '../../components/molecules/load/Load';
import FormInstagram from '../../components/molecules/FormInstagram/FormInstagram';
import FormPix from '../../components/molecules/FormPix/FormPix';
import pixController from '../../controllers/pixController';

const Home = () => {
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
  const handleCloseWhatsappModal = () => setWhatsappModal(false) 
  const handleShowInstagramModal = () => setInstagramModal(true)
  const handleCloseInstagramModal = () => setInstagramModal(false)
  const handleClosePixModal = () => setPixModal(false)
  const handleShowPixModal = () => setPixModal(true)


  // WHATSAPP SUBMIT
  const handleWhatsappSubmit = (payload) => {
    if (Object.keys(whatsapp).length) {
      groupController.updateSocialMedia(whatsapp.id, {account: payload.account}, 'whatsapp').then(response => {
        if (response && response.success) {
          setWhatsapp(response.info.socialMedia)
        }
        setWhatsappModal(false)
      })
      return
    }

    groupController.createSocialMedia({ ...payload, plataform: 'WHATSAPP', url: '.'}).then(response => {
      if (response && response.success) {
        setWhatsapp(response.info.socialMedia)
      }
      setWhatsappModal(false)
    })
  }

  // INSTAGRAM SUBMIT
  const handleInstagramSubmit = (payload) => {
    if (Object.keys(instagram).length) {
      groupController.updateSocialMedia(instagram.id, {account: payload.account}, 'instagram').then(response => {
        if (response && response.success) {
          setInstagram(response.info.socialMedia)
        }
      })

      setInstagramModal(false)
      return
    }

    groupController.createSocialMedia({ ...payload, plataform: 'INSTAGRAM'}).then(response => {
      if (response && response.success) {
        setInstagram(response.info.socialMedia)
      }
      setInstagramModal(false)
    })
  }


  //PIX SUBMIT
  const handlePixSubmit = (payload) => {
    if (pix) {
      pixController.update({ ...payload, qrcode: 'off'}).then(response => {
        if (response && response.success) {
          setPix(response.info.pix)
        }

        setPixModal(false)
        return
      })

    }

    pixController.create({ ...payload, qrcode: 'off'}).then(response => {
      if (response && response.success) {
        setPix(response.info.pix)
      }

      setPixModal(false)
      return
    })

  }


  useEffect(() => {
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
  })


  return (
    <>
      <Header />

      <div className='container'>
        <img src="./images/green.png" id='green' alt='mancha verde' />
        <img src="./images/yellow.png" id='yellow' alt='mancha amarela' />
        <img src="./images/pink.png" id='pink' alt='mancha rosa' />
        <img src="./images/black.png" id='black' alt='mancha preta' />
        {/* Header */}

        {/* Sidebar */}
        <SideBarHome page={'/'}/>
       
      </div >

      { !loading && 

      <div className='px-3'>
          <Container className='mt-5 ml-5 container-pets p-3 mb-5'>
            <h2> Dados Gerais do Grupo </h2>
            <hr class='my-4 bg-primary' /> 

            <Alert variant='primary'> É importante deixar as informações de contato e sua chave pix atualizadas para receber doações ou adoção de pets.</Alert>

            {/* Foto do Grupo */}
            <Row lg={12} className='mt-5'>
              <center>
                <Col xs={6} md={4} className='text-center'>
                  <Image src="./images/ong-profile.jpg" width='250' roundedCircle />
                </Col>
              </center>
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
              <Button variant='secondary' className='adopt-btn'>Editar Grupo (🛠️ Dev)</Button>
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
      }

      { loading && <Load></Load>}


      {/* whatsapp modal */}
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
          <Button onClick={whatsappFormMethods.handleSubmit(handleWhatsappSubmit)}>Salvar</Button>
        </Modal.Footer>
      </Modal>

      {/* instagram modal */}
      <Modal show={showInstagramModal} onHide={handleCloseInstagramModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <img src='./images/instagram-icon.png' width='100'></img>&nbsp;&nbsp;
          <h3>Instagram</h3>
          </Modal.Header>
        <Modal.Body>
          <FormInstagram instagram={instagram} register={instagramFormMethods.register}/>
          </Modal.Body>
        
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseInstagramModal}>Fechar</Button>
          <Button onClick={instagramFormMethods.handleSubmit(handleInstagramSubmit)}>Salvar</Button>

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
          <Button onClick={pixFormMethods.handleSubmit(handlePixSubmit)}>Salvar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Home;
