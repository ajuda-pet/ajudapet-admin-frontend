import axios from 'axios'
import { baseApi } from '../resources/api'

const authEndpoint = `${baseApi}/auth/authenticate`

const authenticationController = {
    isAuthenticate: async () => {
        try {
            const response = await axios.get(`${authEndpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': window.localStorage.getItem('token')
                }
            })
            return response.data
        }
        
        catch (error) {
            console.error(error)

            if (error.response.status == 403) {
                window.localStorage.removeItem('groupId')
                window.localStorage.removeItem('token')
                window.location.href = '/login'
            }

        }
    }
}

export default authenticationController