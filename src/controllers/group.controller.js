import axios from "axios"
import { baseApi } from "../resources/api"

const noAuthEndpoint = `${baseApi}/noauth/groups`
const authGroupsEndpoint = `${baseApi}/auth/groups`

const groupController = {
    getGroupByEmail: async (email) => {
        try {
            const response = await axios.get(`${noAuthEndpoint}?email=${email}`)
            return response.data
        }

        catch (error) {
            console.error(error)
            if (error.response && error.response.data) {
                return error.response.data
            }
        }
    },

    getGroupByName: async (name) => {
        try {
            const response = await axios.get(`${noAuthEndpoint}?name=${name}`)
            return response.data
        }

        catch (error) {
            console.error(error)
            if (error.response && error.response.data) {
                return error.response.data
            }
        }
    },

    getGroupByCpfCnpj: async (cpfCnpj) => {
        try {
            const response = await axios.get(`${noAuthEndpoint}?cpfCnpj=${cpfCnpj}`)
            return response.data
        }

        catch (error) {
            console.error(error)
            if (error.response && error.response.data) {
                return error.response.data
            }
        }
    },

    getById: async (groupId) => {
        try { 
            const response = await axios.get(`${noAuthEndpoint}/${groupId}`)
            return response.data
        }

        catch (error) {
            console.error(error)
            if (error.response.status == 404) {
                window.location.href = '/login'
            }
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
    },

    createSocialMedia: async (socialMedia) => {
        try {
            const response = await axios.post(`${authGroupsEndpoint}/social-media`, socialMedia, {
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

    updateSocialMedia: async (socialMediaId, account, plataform) => {
        try {
            const response = await axios.put(`${authGroupsEndpoint}/social-media/${plataform}`, account, {
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

    update: async (groupId, groupData) => {
        try {
          console.log(groupData)
          const response = await axios.put(`${authGroupsEndpoint}`, groupData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': window.localStorage.getItem('token')
            }
          });
          return response.data;
        } catch (error) {
          console.error(error);
        }
      }
}

export default groupController