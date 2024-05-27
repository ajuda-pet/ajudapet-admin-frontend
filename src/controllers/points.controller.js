import axios from 'axios'
import { baseApi } from '../resources/api.js'

const noAuthEndpoint = `${baseApi}/noauth/adoption-points`
const authEndpoint = `${baseApi}/auth/adoption-points`

const pointsController = {
    get: async () => {
        try {
            const response = await axios.get(noAuthEndpoint)

            if (!response.data.success) {
                return response.data.message
            }

            return response.data
        }

        catch (error) {
            console.error(error)
        }
    },
    getByGroup: async (groupId) => {
        try {
            const response = await axios.get(`${noAuthEndpoint}/groups/${groupId}`)

            if (!response || !response.data.success) {
                return response.data.message
            }

            return response.data
        }

        catch (error) {
            console.error(error)
        }
    },

    getById: async (pointId) => {
        try {
            const response = await axios.get(`${noAuthEndpoint}/${pointId}`)

            if (!response.data.success) {
                return response.data.message
            }

            return response.data
        }

        catch (error) {
            console.error(error)
        }
    },

    create: async (payload) => {
        try {
            const response = await axios.post(`${authEndpoint}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': window.localStorage.getItem('token')
                }
            })

            if (!response.data.success) {
                return response.data.message
            }

            return response.data
        }

        catch (error) {
            console.error(error)
        }
    },

    upated: async (pointId, payload) => {
        try {
            const response = await axios.put(`${authEndpoint}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorixation': window.localStorage.getItem('token')
                }
            })

            if (!response.data.success) {
                return response.data.message
            }
        }

        catch (error) {
            console.error(error)
        }
    }
}

export default pointsController