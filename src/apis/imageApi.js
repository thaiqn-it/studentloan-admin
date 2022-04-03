import { defaultInstance } from '.'
const uploadImage = (formData) => {
    return defaultInstance.post('/image/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

const uploadMultipleImage = (formData) => {
    return defaultInstance.post('/image/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

const uploadImageWithProg = (formData, options) => {
    return defaultInstance.post('/image/upload', formData, options)
}

export const imageApi = { uploadImage, uploadImageWithProg,uploadMultipleImage }
