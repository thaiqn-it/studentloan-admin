import { defaultInstance } from '.'

const uploadImageWithProg = (formData, options) => {
    return defaultInstance.post('/image/upload', formData, options)
}

const downloadFileURL = (url) => {
    return defaultInstance.get(url, { responseType: 'blob' })
}

export const imageApi = {uploadImageWithProg,downloadFileURL }
