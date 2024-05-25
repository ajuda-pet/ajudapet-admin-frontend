import axios from "axios"
import { baseApi } from "../resources/api"

const noAuthEndpoint = `${baseApi}/noauth/groups`
const authGroupsEndpoint = `${baseApi}/auth/groups`

const groupController = {
    getById: async (groupId) => {
        try { 
            const response = await axios.get(`${noAuthEndpoint}/${groupId}`)

            /* if (!response.data.success) {
                return response.data.message
            } */

            return response.data.info.pets
        }

        catch (error) {
            console.error(error)
        }
    },


    getAdoptionPoints: async () => {
        try {
            const response = await axios.get(`${authGroupsEndpoint}/adoption-points`, {
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

export default groupController