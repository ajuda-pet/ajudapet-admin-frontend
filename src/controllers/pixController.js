import axios from 'axios'
import { baseApi } from '../resources/api'

const authEndpoint = `${baseApi}/auth/groups/pix`

const pixController = {
    create: async (pix) => {
        try {
            const response = await axios.post(`${authEndpoint}`, pix, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': window.localStorage.getItem('token')
                }
            })

            return response.data
        }

        catch (error) {
            console.error(error)
        }
    },

    update: async (pix) => {
        try {
            const response = await axios.put(`${authEndpoint}`, pix, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': window.localStorage.getItem('token')
                }
            })

            return response.data
        }

        catch (error) {
            console.error(error)
        }
    }
}


export default pixController