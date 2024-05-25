import React, { useEffect, useState } from 'react';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [validated, setValidated] = useState(false);


    useEffect(() => {
        let valid = localStorage.getItem('valid');
        if (valid) {
            setValidated(true);
        }
    }
        , [validated]);

    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const ongPage = (link) => {
        if (link === 'cadastrarVoluntario') navigate('/registrarVoluntario');
        if (link === 'gerenciarEstoque') navigate('/gerenciarEstoque');
        if (link === 'cadastrarOng') navigate('/registrarOng');
    }
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>


            {isOpen ? (
                <>
                    <h1>Bem vindo!</h1>

                    <FontAwesomeIcon
                        icon={faTimes}
                        size="2x"
                        onClick={toggleSidebar}
                        style={{ right: '30', top: '20', cursor: 'pointer', position: 'absolute', color: 'rgb(180, 90, 79)' }}
                    />
                    {validated && (
                        <ul>
                            <li><button onClick={() => ongPage('cadastrarVoluntario')}>Cadastrar voluntários</button></li>
                            <li><button onClick={() => ongPage('gerenciarEstoque')}>Gerenciar estoque</button></li>
                            <li><button onClick={() => ongPage('cadastrarOng')}>Cadastrar ONG's</button></li>
                        </ul>
                    )}
                    <button
                        onClick={() => navigate('/login')}

                        style={{
                            padding: '10px 128px',
                            backgroundColor: '#30465c',
                            color: '#fff',
                            marginTop: '20em',
                            bottom: '10px',
                            border: 'none',
                            borderRadius: '1px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            boxShadow: '0px 2px 4px rgba(12, 107, 250, 0.3)',
                            transition: 'background-color 0.3s ease-in-out',
                        }}
                    >
                        Login
                    </button>
                </>
            ) : (

                <FontAwesomeIcon
                    icon={faAngleDown}
                    size="3x"
                    onClick={toggleSidebar}
                    style={{ marginLeft: '-30px', marginTop: '9em', cursor: 'pointer', position: 'absolute', color: 'rgb(2, 173, 31)', rotate: '90deg' }}
                />

            )}

        </div>
    );
};

export default Sidebar;
