import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useNavigate } from "react-router-dom";
import Sidebar from '../../components/molecules/sidebar';

import 'leaflet/dist/leaflet.css';
import './index.css';

function Map() {
    const navigate = useNavigate();
    const [validated, setValidated] = React.useState(false);
    useEffect(() => {
        document.title = 'Mapa';
        let jwtToken = localStorage.getItem("authenticated");
        if (!jwtToken) {
            // let msg = 'Usuário não autenticado. Faça login para acessar a página.';


        } else {
            if (!validated) {
                // validateJwt(jwtToken);
                setValidated(true);
            }
        }
    }, [navigate, validated]);

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div className="Home">
            <MapContainer center={[-32.0372, -52.0986]} zoom={13} style={{ height: '100vh', width: '100%' }}
                worldCopyJump={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Sidebar />
            </MapContainer>
        </div>
    );
}

export default Map;
