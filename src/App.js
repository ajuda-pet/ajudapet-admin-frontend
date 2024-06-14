

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Troque 'Switch' por 'Routes'
import Login from './pages/login/index.jsx';
import Register from './pages/register/index.jsx';
import Home from './pages/home/index.jsx';
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
                <Route path="/register" element={<Register />} />
                <Route path="/pets" element={<AddPet />} />
                <Route path="/login" element={<Login />} />
                <Route path="/pontos" element={<AddAdoptPoint />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFoundPage />} />

            </Routes>
        </Router>
    );
}

export default App;