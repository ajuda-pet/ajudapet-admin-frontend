import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, CardGroup, Table, Alert, Image, Card, Modal, ModalBody, ModalTitle } from 'react-bootstrap'
import Header from '../../components/molecules/header';
import SideBarHome from '../../components/molecules/sideBarHome';
import CardComponent from '../../components/molecules/cards';
import Form from 'react-bootstrap/Form';
import './index.css';
import groupController from '../../controllers/group.controller';
import FormWhatsapp from '../../components/molecules/FormWhatsapp/FormWhatsapp';
import { useForm } from 'react-hook-form';
import Load from '../../components/molecules/load/Load';

const Home = () => {
  const methods = useForm()

  const [loading, setLoading] = useState(true)


  const [group, setGroup] = useState({})

  const [whatsapp, setWhatsapp] = useState({})
  const [instagram, setInstagram] = useState({})
  const [pix, setPix] = useState({})

  const [showWhatsappModal, setWhatsappModal] = useState(false)

  const handleShowWhatsappModal = () => setWhatsappModal(true)
  const handleCloseWhatsappModal = () => setWhatsappModal(false) 

  const handleSubmit = (payload) => {
    console.log(payload)
    //salvar

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
        <SideBarHome/>
       
      </div >

      { !loading && 
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
            <Button variant='secondary' className='adopt-btn'>Editar Grupo</Button>
          </Row>


          <Row className='mt-5 mb-5'>
            <Col>
              <Card className='p-3'>
                <Card.Title>
                  <img src='./images/whatsapp-icon.png' width='40'></img>&nbsp;&nbsp;

                  Whatsapp para Adoção
                </Card.Title>
                <Card.Body>
                  <Alert variant='danger'>Não cadastrado.</Alert>

                </Card.Body>
                <Button variant='secondary' className='adopt-btn' onClick={setWhatsappModal}> Cadastrar </Button>
              </Card>
            </Col>
            <Col>
              <Card className='p-3'>
                <Card.Title>Instagram do Grupo</Card.Title>
                <Card.Body>
                  <Alert variant='danger'>Não cadastrado.</Alert>
                </Card.Body>
                <Button variant='secondary' className='adopt-btn'> Cadastrar </Button>
              </Card>
            </Col>
            <Col>
              <Card className='p-3'>
                <Card.Title>PIX</Card.Title>
                <Card.Body>
                  <Alert variant='danger'>Não cadastrado.</Alert>

                </Card.Body>
                <Button variant='secondary' className='adopt-btn'> 
                    Cadastrar
                </Button>
              </Card>
            </Col>
          </Row>


        </Container>
      }

      { loading && <Load></Load>}


      <Modal show={showWhatsappModal} onHide={handleCloseWhatsappModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <img src='./images/whatsapp-icon.png' width='50'></img>&nbsp;&nbsp;
          <h3>Whatsapp</h3>
          </Modal.Header>
        <Modal.Body>
          <FormWhatsapp register={methods.register} setValue={methods.setValue}/>
          </Modal.Body>
        
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseWhatsappModal}>Fechar</Button>
          <Button onClick={methods.handleSubmit(handleSubmit)}>Cadastrar</Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default Home;
