import axios from 'axios';
import { baseApi } from '../resources/api';
import {loginUser} from './login';
export const registerUser = async (userData) => {    

    try {

       const response = await axios.post(`${baseApi}/noauth/signup`, userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (response) => {
            return response;
        }).catch((error) => {
            const msg = error.response;
            return msg;
        }
    );
    const invalidStatusCodes = [400, 401, 403, 404, 405, 406, 409, 422, 500, 501, 502, 503, 504];
    if(!invalidStatusCodes.includes(response.status)){
        return await loginUser(userData);
    }else{
        return response.data.message;
    }
      
    } catch (error) {

        throw new Error('Erro ao registrar usuário.');
    }
}