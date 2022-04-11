import { defaultInstance } from "./index";

const getListTutorByStudentId = (id) => {
    return defaultInstance.get(`/tutor/studentId/${id}`)
}

const update = (id, data) => {
    return defaultInstance.put(`/tutor/${id}`, data)
}

const getTutorByPK = (id) => {
    return defaultInstance.get(`/tutor/${id}`)
}

export const tutorApi = {
    getListTutorByStudentId,
    getTutorByPK,
    update
};