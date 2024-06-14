import axios from 'axios'
import { baseApi } from '../resources/api.js'

const noAuthEndpoint = `${baseApi}/noauth/pets`
const authEndpoint = `${baseApi}/auth/pets`

const petController = {
    getByGroupId: async() => {
        try {
            const groupId = localStorage.getItem('groupId')
            const response = await axios.get(`${noAuthEndpoint}/groups/${groupId}`)

            if (!response.data.success) {
                return response.data.message
            }

            return response.data.info.pets
        }

        catch (error) {
            console.error(error)
        }
    },


    get: async (params) => {
        try {
            let queryParams = `&groupId=${window.localStorage.getItem('groupId')}`

            if (params && params.addressCity) queryParams += `&addressCity=${params.addressCity}`
            if (params && params.age) queryParams += `&age=${params.age}`
            if (params && params.size) queryParams += `&size=${params.size}`
            if (params && params.species) queryParams += `&species=${params.species}`

            const response = await axios.get(`${noAuthEndpoint}?${queryParams}`)

            if (!response.data.success) {
                return response.data.message
            }

            return response.data.info.pets
        }

        catch (error) {
            console.error(error)
        }
    },

    getById: async (petId) => {
        try {
            const response = await axios.get(`${noAuthEndpoint}/${petId}`)
            
            if (!response.data.succes) {
                return response.data.message
            }

            return response.data    
        }

        catch (error) {
            console.error(error)
        }
    },

    create: async(payload) => {
        try {
            const response = await axios.post(authEndpoint, payload, {
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

    update: async(petId, payload) => {
        try {
            const response = await axios.put(`${authEndpoint}/${petId}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': window.localStorage.getItem('token')
                }
            })

            if (!response.data.success) {
                return response.data.message
            }
        }

        catch (error) {
            console.error(error)
        }
    },

    remove: async (petId) => {
        try {
            const response = await axios.delete(`${authEndpoint}/${petId}`, {
                headers: {
                    'Authorization': window.localStorage.getItem('token'),
                },
            });

            if (!response.data.success) {
                return response.data.message;
            }
        } catch (error) {
            console.error(error);
        }
    },
}

export default petController