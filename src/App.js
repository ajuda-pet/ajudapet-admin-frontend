

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Signin/Signin.jsx'
import Signup from './pages/Signup/Signup.jsx';
import Home from './pages/home/index.jsx'
import NotFoundPage from './pages/notFoundPage/index.jsx'
import AddPet from './pages/addPet/index.jsx'
import AddAdoptPoint from './pages/addAdoptPoint/index.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
    React.useEffect(() => {
        let jwtToken = localStorage.getItem('token')
        if (!jwtToken && !['/login', '/cadastro'].includes(window.location.pathname)) {
            window.location.href = '/login'
        }
    }, [])

    return (
        <Router>

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Signup />} />                
                <Route path="/pets" element={<AddPet />} />
                <Route path="/pontos" element={<AddAdoptPoint />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFoundPage />} />

            </Routes>
        </Router>
    );
}

export default App;