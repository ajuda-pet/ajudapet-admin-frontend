// bibliotecas
import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Button, Alert, Image, Card, Modal, InputGroup } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';

// firebase
import { gerarNomeImagem } from '../../components/validators/arquivo';
import { useDropzone } from 'react-dropzone';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../../controllers/resgisterImg';

// Components
import Header from '../../components/molecules/header';
import SideBarHome from '../../components/molecules/sideBarHome';
import Load from '../../components/molecules/load/Load';
import FormInstagram from '../../components/molecules/FormInstagram/FormInstagram';
import FormPix from '../../components/molecules/FormPix/FormPix';
import FormWhatsapp from '../../components/molecules/FormWhatsapp/FormWhatsapp';
import ToastInputError from '../../components/molecules/ToastInputError/ToastInputError';
import ToastSuccess from '../../components/molecules/ToastSuccess/ToastSuccess';

// controler
import groupController from '../../controllers/group.controller';
import pixController from '../../controllers/pixController';
import authenticationController from '../../controllers/authentication.controller';

// estilo
import './index.css';


const Home = () => {
  const [showToastInputError, setShowToastInputError] = useState(false)
  const [showToastSuccess, setShowToastSuccess] = useState(false)
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const [submitWhatsappDisabled, setSubmitWhatsappDisabled] = useState(false)
  const [submitInstagramDisabled, setSubmitInstagramDisabled] = useState(false)
  const [submitPixDisabled, setSubmitPixDisabled] = useState(false)
  const [submitDisabled, setSubmitDisabled] = useState(false);


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
  

  // Forms
  const whatsappFormMethods = useForm()
  const instagramFormMethods = useForm()
  const pixFormMethods = useForm()
  const groupFormMethods = useForm();

  const [loading, setLoading] = useState(true)
  const [group, setGroup] = useState({})

  const [whatsapp, setWhatsapp] = useState()
  const [instagram, setInstagram] = useState()
  const [pix, setPix] = useState()

  const [showWhatsappModal, setWhatsappModal] = useState(false)
  const [showInstagramModal, setInstagramModal] = useState(false)
  const [showPixModal, setPixModal] = useState(false)
  const [showGroupModal, setGroupModal] = useState(false);

  // Controle de modais
  const handleShowWhatsappModal  = () => setWhatsappModal(true)
  const handleCloseWhatsappModal = () => {setWhatsappModal(false); setSubmitWhatsappDisabled(false)}
  const handleShowInstagramModal = () => setInstagramModal(true)
  const handleCloseInstagramModal = () => {setInstagramModal(false); setSubmitInstagramDisabled(false)}
  const handleClosePixModal = () => {setPixModal(false); setSubmitPixDisabled(false)}
  const handleShowPixModal = () => setPixModal(true)
  const handleShowGroupModal = () => setGroupModal(true)
  const handleCloseGroupModal = () => {setGroupModal(false); setSubmitDisabled(false); groupFormMethods.reset() };


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

    groupController.createSocialMedia({ ...payload, plataform: 'WHATSAPP'}).then(response => {
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
      groupController.updateSocialMedia(instagram.id, {...payload, }, 'instagram').then(response => {

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

  // Group submit

  const handleGroupSubmit = (payload) => {
    setSubmitDisabled(true);

    Object.keys(payload).forEach(key => {
      if (payload[key] === '' || payload[key] === group[key]) {
        delete payload[key];
      }
    });
      
    if(payload.length) {
      handleCloseGroupModal()
    }
    groupController.update(group.id, payload).then(response => {
      if (response && response.success) {
        // Apagar imagem antiga em caso de sucesso
        if(file) deleteImg(group.picture);
        setGroup(response.info.group);
        handleToastSuccess();
        handleCloseGroupModal();
      } else {
        // Apagar imagem nova em caso de erro no banco
        deleteImg(payload.url)
        handleToastError();
      }
      setSubmitDisabled(false);
    });
  };
  

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

          if (socialMedia.plataform === 'INSTAGRAM') {
            setInstagram(socialMedia)
          }
        })

        setTimeout(() => {
          setLoading(false)
        }, 1000)
        setGroup(group)
        setPix(group.pix)
      }
    })
  }, [])
  // Img
  
  // Salvar imagem local
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validImageTypes.includes(file.type)) {
        return;
      }
      setFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/jpeg, image/png, image/gif' });

  const fistSubmitprofile = (e) => {
    const payload = groupFormMethods.getValues();

    // Se nao houver alteração de imagem
    if (!file) {
      handleGroupSubmit(payload);
      return;
    }

    let nomeImg = gerarNomeImagem();
    const storageRef = ref(storage, `images/${nomeImg}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => console.error(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          payload.picture = url;
          handleGroupSubmit(payload);
          // deleteImg(group.picture)
        });
      }
    );
  };

  const deleteImg = useCallback(() => {
    const { picture } = group;
    if (!picture) return;
    try {
      const imageRef = ref(storage, picture);
      deleteObject(imageRef);
    } catch (error) {
      console.error('Erro ao deletar a imagem:', error);
    }
  }, [group]);


// const handleSubmit = useCallback(async () => { !! TROCAR PELA FUNÇÃO DO MODAL


  return (
    <>
      <div className="body">
      {!loading && <div>
        <Header />

        <div className='container'>
          {/* Header */}

          {/* Sidebar */}
          <SideBarHome page={'/'}/>
        
        </div >


        <div className='px-3'>
            <Container className='mt-4 ml-5 container-pets p-3 mb-2'>
              <h3> 
               <img src='./images/group-icon.png' width='50'></img> &nbsp;
                Dados do Grupo 
              </h3>
              <hr className='my-4 bg-primary' /> 

            <Alert> 
              <center>
                  Para receber ser divulgado em nossa plataforma <strong>preencha todos dados do grupo!</strong>
              </center>
            </Alert>

              {/* Foto do Grupo */}
              <Row lg={12} className='mt-5 justify-content-center'>
                  <Col className='text-center'>
                <Image src={group.picture || "./images/ong-profile.jpg"} width='300' className='group-image'/>
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

              {/* Editar Grupo */}
              <Row className='mx-5 my-3'>
                <Button variant='secondary' className='adopt-btn'  onClick={handleShowGroupModal}>Editar</Button>
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
    </div>

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

      {/* Group Edit Modal */}
      <Modal show={showGroupModal} onHide={handleCloseGroupModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <img src='./images/group-icon.png' width='50'></img> &nbsp;
          <h3>Editar Grupo</h3>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="groupImage" className="mb-3">
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />

              {file ?
                <Image src={imageUrl} roundedCircle width="200" height="200" alt="Imagem do grupo" className='group-image'/> :
                <Image src={group.picture} roundedCircle width="200" height="200" alt="Imagem do grupo" className='group-image' />
              }

            </div>
          </Form.Group>

          <Form>
            <Form.Group controlId="groupName">
                <InputGroup>
                  <InputGroup.Text>Grupo</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder={group.name}
                    {...groupFormMethods.register('name')}
                  />
                </InputGroup>
            </Form.Group>

            <Form.Group controlId="groupDescription" className="mt-3">
              <InputGroup>
                <InputGroup.Text>Descrição</InputGroup.Text>
                <Form.Control
                  as="textarea"
                  rows={4}
                  style={{ resize: 'none', height: '130px'}}
                  defaultValue={group.description}
                  {...groupFormMethods.register('description')}
                />
              </InputGroup>
            </Form.Group>

              
           
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseGroupModal}>Fechar</Button>
          <Button onClick={groupFormMethods.handleSubmit(fistSubmitprofile)} disabled={submitDisabled}>Salvar</Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default Home;
