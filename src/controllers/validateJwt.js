import axios from 'axios';
import { baseApi } from '../resources/api';

export const validateJwt = async (jwtToken) => {   
    try {
        const response= axios.post(`/${baseApi}/validateJwt`, jwtToken, {
                headers: {
                    'Content-Type': 'application/json', 
                }
            }).then((response) => {     
                return response.data;
            }
        );
       
        } 
        catch (error) {
        console.error('Erro ao executar a função:', error);
    }
}
