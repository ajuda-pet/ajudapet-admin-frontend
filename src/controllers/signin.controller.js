import axios from 'axios'
import { baseApi } from '../resources/api'

const signinController = {
    signin: async (payload) => {
        try {
            const response = await axios.post(`${baseApi}/noauth/signin`, payload, {
                headers: { 
                    'Content-Type': 'application/json' 
                }
            })

            return response.data
        }

        catch (error) {
            if (error.response && error.response.data) {
                return error.response.data
            }
        }
    }
}

export default signinController