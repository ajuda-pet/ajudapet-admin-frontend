import axios from 'axios'
import { baseApi } from '../resources/api'

const signupController = {
    signup: async (payload) => {
        try {
            const response = await axios.post(`${baseApi}/noauth/signup`, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            return response.data
        }

        catch(error) {
            console.error(error)
            
            if (error.response && error.response.data) {
                return error.response.data
            }
        }

    }
}

export default signupController