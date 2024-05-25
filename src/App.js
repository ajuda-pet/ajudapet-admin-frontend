

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Troque 'Switch' por 'Routes'
import Login from './pages/login/index.jsx';
import Register from './pages/register/index.jsx';
import Map from './pages/map/index.jsx';
import Home from './pages/home/index.jsx';
import RegistrarOng from './pages/registrarOng/index.jsx';
import RegistrarVoluntario from './pages/registrarVoluntario/index.jsx';
import GerenciarEstoque from './pages/gerenciarEstoque/index.jsx';
import NotFoundPage from './pages/notFoundPage/index.jsx';
import AddPet from './pages/addPet/index.jsx';
import AddAdoptPoint from './pages/addAdoptPoint/index.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    React.useEffect(() => {

        let jwtToken = localStorage.getItem('token')
        if (!jwtToken && !['/login', '/register'].includes(window.location.pathname)) {
            window.location.href = '/login'
        }
    }, []);

    return (
        <Router>

            <Routes>
                <Route path="/registrarVoluntario" element={<RegistrarVoluntario />} />
                <Route path="/gerenciarEstoque" element={<GerenciarEstoque />} />
                <Route path="/registrarOng" element={<RegistrarOng />} />
                <Route path="/register" element={<Register />} />
                <Route path="/addPet" element={<AddPet />} />
                <Route path="/login" element={<Login />} />
                <Route path="/map" element={<Map />} />
                <Route path="/addAdoptPoint" element={<AddAdoptPoint />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFoundPage />} />

            </Routes>
        </Router>
    );
}

export default App;