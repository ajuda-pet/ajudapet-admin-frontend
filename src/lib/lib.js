import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from '../controllers/resgisterImg.js'
import { gerarNomeImagem } from '../components/validators/arquivo/index.js'
import { cnpj, cpf } from 'cpf-cnpj-validator'
const lib = {
    firebaseUploadImage: async (file) => {
        const imgName = gerarNomeImagem()
        const storageRef = ref(storage, `images/groups/${imgName}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        return new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                snapshot => { },
                error => reject(error),
                async () => {
                    try {
                        const url = await getDownloadURL(uploadTask.snapshot.ref)
                        console.log('>>>>>>', url)
                        resolve(url)
                    } catch (error) {
                        reject(error)
                    }
                }
            )
        })
    },

    firebaseDeleteImage: async (imgUrl) => {
        const storageRef = ref(storage, imgUrl)
        try {
            await deleteObject(storageRef)
            console.log('Image deleted successfully')
        } catch (error) {
            console.error('Error deleting image:', error)
            throw error
        }
    },

    cnpjIsValid: (param) => {
        param.replace(/\D/g, '')
        return cnpj.isValid(param)
    },

    cpfIsValid: (param) => {
        param.replace(/\D/g, '')

        console.log(param)
        return cpf.isValid(param)

    }
}

export default lib