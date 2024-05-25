import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Validadores
import { validateEmail } from '../../components/validators/email';
import { loginUser } from '../../controllers/login';

// componentes
import Background from '../../components/organism/background/Background';

// Estilos
import './index.css';

function Login() {
  localStorage.removeItem("authenticated");
  const navigate = useNavigate();
  const location = useLocation();

  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Função para lidar com o envio do formulario
  const handleSubmit = async (e) => {

    e.preventDefault();
    setError('');
    setMsg('');
    validateEmail(email);
    if (validateEmail && password.length > 0) {
      const userData = { email, password };
      const token = await loginUser(userData);

      if (token) {
        localStorage.setItem('valid', true);

        navigate('/')
      } else {
        setError('Erro ao autenticar usuário. Verifique suas credenciais.');
      }
    }
    else {
      setError('Email inválido!');
    }
  }

  useEffect(() => {
    document.title = 'Login';

    if (location.state?.msg) {
      setMsg(location.state?.msg);
    }

    setTimeout(() => {
      setMsg('');
      setError('');
    }, 5000);

  }, [location.state?.msg]);



  return (

    <div className="body">
    <Background/>

    <div className="container-lr container-l" >
      <div className="logo">
          <a href="/">
              <img src="./images/logo.png" alt="logo" />
          </a>
      </div>
      <form onSubmit={handleSubmit} method='post'>
        
        <div className="form-inputs form-l">
          <div className="header-lr" >
            <h1>Login</h1>
            
           {error ? <p className="error">{error}</p> : <></>}
           {msg? <p className="error">{msg}</p>: <></>}
          </div>
          <div className="main-rl">
            <div className="input-form">
              <input
                required
                name='email'
                className="input-field"
                type="email"
                value={email}
                placeholder='email'
                onChange={(e) => setEmail(e.target.value)}

              />
            </div>
          
            <div className="input-form">
              <input
                required
                placeholder='Senha'
                name='password'
                className="input-field"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}

              />
            </div>
          </div>
          
          <div className='footer-l mt-4'>
            <button type='submit' className="btn1">Entrar</button>

            <div className='linha-ou mt-4 mb-1'>
              <div className='linha'></div>
              <p className='ou'><span>ou</span></p>
            </div>
            
              <button onClick={() => navigate('/register')} className="btn-clean"> Registrar </button>
            </div>
        </div>

      </form>
      
    </div>
</div>
  );
}

export default Login;
