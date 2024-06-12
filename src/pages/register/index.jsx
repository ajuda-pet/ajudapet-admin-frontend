import React, { useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

// Validadores
import { validateCPF } from '../../components/validators/cpf/index.js';
import { validatePhoneNumber } from '../../components/validators/telefone/index.js';
import { validateEmail } from '../../components/validators/email/index.js';
import { registerUser } from '../../controllers/register.js';
import { useNavigate, useLocation } from "react-router-dom";

// Controle de imagem
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../../controllers/resgisterImg.js';
import { gerarNomeImagem } from '../../components/validators/arquivo/index.js';

import { handleStep, handleText, handleEmailChange, handleCPFChange, handlePhoneChange } from './funcoesRegister/index.js';

// components
import Background from '../../components/organism/background/Background.jsx';

// Estilo

import './estilos/index.css';


function Register() {
    
    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        email: '',
        phone: '',
        cpf: '',
        password: '',
        picture: '',
    });

    const [confirmPassword, setConfirmPassword] = useState('');
    const [file, setFile] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');
    const [step, setStep] = useState(1);

    const handleStepWrapper = () => {
        handleStep(formData, step, setStep, setError);
    };

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        
        if (file) {
          const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
          if (!validImageTypes.includes(file.type)) {
            setError('Por favor, apenas imagens (JPEG, PNG, GIF).');
            return;
          }
          setFile(file)
          const imageUrl = URL.createObjectURL(file);
          setImageUrl(imageUrl);
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/jpeg, image/png, image/gif' });

    const fistSubmit = (e) => {
        e.preventDefault();
        const { cpf, email, phone, password } = formData;
        let cpfValidated = validateCPF(cpf);
        let emailValidated = validateEmail(email);
        let phoneValidated = validatePhoneNumber(phone);

        if (password === confirmPassword && cpfValidated && emailValidated && phoneValidated) {
            setError('');
            if (!file) return handleSubmit();
            let nomeImg = gerarNomeImagem();
            const storageRef = ref(storage, `images/${nomeImg}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                snapshot => {},
                error => setError(error),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(url => {
                        setFormData(prevState => ({ ...prevState, picture: url }));
                    });
                }
            );
        } else {
            if (!cpfValidated) setError('CPF inválido!');
            if (!emailValidated) setError('Email inválido!');
            if (password !== confirmPassword) setError('As senhas não são iguais!');
            if (!phoneValidated) setError('Telefone inválido!');
        }
    };

    const deleteImg = useCallback(() => {
        const { picture } = formData;
        if (!picture) return;
        try {
            const imageRef = ref(storage, picture);
            deleteObject(imageRef);
            setFormData(prevState => ({ ...prevState, picture: '' }));
        } catch (error) {
            console.error('Erro ao deletar a imagem:', error);
        }
    }, [formData]);

    
    const handleSubmit = useCallback(async () => {
        const { name, description, email, phone, cpf, password, picture } = formData;
        try {
            const userData = { name, description, email, phone, cpf, password, picture };
            const response = await registerUser(userData);
            if (response.token) {
                navigate('/');
            } else {
                setError('Erro ao registrar usuário. ' + response);
            }
        } catch (error) {
            console.error('Erro ao fazer a solicitação:', error);
            setError('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
            deleteImg();
        }
    }, [formData, deleteImg, navigate]);

    useEffect(() => {
        if (formData.picture === '') return;
        handleSubmit();
    }, [formData.picture, handleSubmit]);

    useEffect(() => {
        document.title = 'Cadastro';
        if (localStorage.getItem("authenticated")) {
            localStorage.removeItem("authenticated");
        }
        setTimeout(() => {
            setError('');
        }, 5000);
    }, [location.state?.msg]);

    return (
        <div className="body">
            <div className="container-login">

                <div className="form-container-login">

                <div className='imagem-login'></div>
                    
                    <div className="login">
                        
                        <form onSubmit={fistSubmit} method='post'>

                            <div className="logo">
                                <a href="/">
                                    <img src="./images/logo.png" alt="logo" />
                                </a>
                            </div>

                            <div className="header-login">
                                <h6>Cadastre seu Grupo</h6>
                                <p className="error">{error}</p>
                            </div>

                            <div className="main-login">
                                

                                {step === 1 && (
                                    <>
                                        
                                            <div className="input-form">
                                                <input
                                                    required
                                                    name='nome'
                                                    className="input-field"
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData(prevState => ({ ...prevState, name: e.target.value }))}
                                                    placeholder='Nome do Grupo'
                                                />
                                            </div>
                                            <div className="input-form">
                                                <input
                                                    required
                                                    name='telefone'
                                                    className="input-field"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) =>{handlePhoneChange(e, setFormData)}}
                                                    placeholder='Telefone'
                                                    maxLength={15}
                                                />
                                            </div>
                                            <div className="input-form">
                                                <input
                                                    required
                                                    name='cpf'
                                                    className="input-field"
                                                    type="text"
                                                    value={formData.cpf}
                                                    maxLength={14}
                                                    onChange={(e) =>{handleCPFChange(e, setFormData)}}
                                                    placeholder='CPF/CNPJ'
                                                />
                                            </div>
                                        
                                        <div className="footer-login">
                                            <button type='button' className="btn1" onClick={handleStepWrapper}>Próximo</button>
                                            <button type='button' className="btn-volta btn-neutro" onClick={() => window.location.href = '/login'}>Voltar</button>
                                        </div>
                                    </>
                                )}
                                {step === 2 && (
                                <>
                                <div className='main-img'>
                                    <div className="input-form-img" {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {imageUrl ? <>
                                        <img className='' src={imageUrl} alt='img' width='200' height='200' style={{borderRadius: '100px'}}/>
                                        </> : <>
                                        <p className='p-img'>Imagem que representa o grupo, clique ou arraste uma imagem</p>
                                        <p className='p-info'>OBS:imagem do grupo ajuda a ter mais credibilidade!</p></>}
                                    </div>
                                    
                                </div>
                                <div className="footer-login mt-5" >
                                    <button type='button' className="btn1 mt-3" onClick={handleStepWrapper}>Próximo</button>
                                    <button className="btn-volta btn-neutro" onClick={() => setStep(step - 1)}>Voltar</button>
                                </div>
                                </>
                                )}
                                {step === 3 && (
                                    <>
                                        
                                        <div className="input-form">
                                            <textarea
                                                name="description"
                                                id="text-description"
                                                
                                                value={formData.description}
                                                placeholder='Razão Social'
                                                onChange={(e)=>(handleText(e, setFormData))}></textarea>
                                        </div>
                                    
                                        <div className="footer-login">                        
                                            <button type='button' className="btn1" onClick={handleStepWrapper}>Próximo</button>
                                            <button className="btn-volta  btn-neutro" onClick={() => setStep(step - 1)}>Voltar</button>
                                        </div>
                                    </>
                                )}
                                {step === 4 && (
                                    <>
                                        
                                            <div className="input-form">
                                                <input
                                                    required
                                                    name='email'
                                                    className="input-field"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e)=>{handleEmailChange(e, setFormData)}}
                                                    placeholder='Email'
                                                />
                                            </div>
                                            <div className="input-form">
                                                <input
                                                    required
                                                    name='senha'
                                                    className="input-field"
                                                    type="password"
                                                    value={formData.password}
                                                    onChange={(e) => setFormData(prevState => ({ ...prevState, password: e.target.value }))}
                                                    placeholder='Senha'
                                                />
                                            </div>
                                            <div className="input-form">
                                                <input
                                                    required
                                                    name='confirmarSenha'
                                                    className="input-field"
                                                    type="password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    placeholder='Confirmar Senha'
                                                />
                                            </div>
                                        
                                        <div className="footer-login">
                                            <button type='submit' className="btn1">Registrar</button>
                                            <button className="btn-volta  btn-neutro" onClick={() => setStep(step - 1)}>Voltar</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
