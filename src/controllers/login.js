import axios from 'axios';
import { baseApi } from '../resources/api';

export const loginUser = async (userData) => {


    try {

        const response = await axios.post(`${baseApi}/noauth/signin`, userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.data.success === true) {
            localStorage.setItem('token', response.data.info.token);
            localStorage.setItem('groupId', response.data.info.group.id);

            return response.data.info;
        } else {
            return false;
        }
        // Por que info e não data.token? Verificar!!
    } catch (error) {
        console.error(error)
    }
}