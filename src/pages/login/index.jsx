import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Validadores
import { validateEmail } from '../../components/validators/email';
import { loginUser } from '../../controllers/login';

// Estilos
import './index.css';
import Load from '../../components/molecules/load/Load';

function Login() {
  localStorage.removeItem("authenticated");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const location = useLocation();

  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Função para lidar com o envio do formulario
  const handleSubmit = async (e) => {
    setLoading(true)

    e.preventDefault();
    setError('');
    setMsg('');
    validateEmail(email);
    if (validateEmail && password.length > 0) {
      const userData = { email, password };
      const token = await loginUser(userData);

      if (token) {
        setLoading(false)

        localStorage.setItem('valid', true);
        navigate('/')
      } else {
        setError('Erro ao autenticar usuário. Verifique suas credenciais.');
      }
    }
    else {
      setError('Email inválido!');
    }

    setLoading(false)
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
    <div className="container-login" >
      
      <div className="form-container-login">

        <div className='imagem-login'></div>

        {!loading &&
        <div className="login">
          <form  onSubmit={handleSubmit} method='post'>

            
              <div className="logo">
                <a href="/">
                    <img src="./images/logo.png" alt="logo" />
                </a>
              </div>

              <div className="header-login" >
                <h6>Sing in your account</h6>
              
                {error ? <p className="error">{error}</p> : <></>}
                {msg? <p className="error">{msg}</p>: <></>}
              </div>

              <div className="main-login">
                <div className="input-form">
                  <input
                    required
                    name='email'
                    className="input-field"
                    type="email"
                    value={email}
                    placeholder='Email'
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
              
                <div className='footer-login'>
                <button type='submit' className="btn1">Login</button>
                
                  <button onClick={() => navigate('/register')} className="btn-neutro"> Não possui uma conta? Registre-se </button>
                </div>
              
            </form>
          </div>

        }

        {loading && <Load></Load>}
      </div>
    </div>
</div>
  );
}

export default Login;
