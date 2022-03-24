import { defaultInstance } from "./index";

const getListTutorByStudentId = (id) =>{
    return defaultInstance.get(`/tutor/studentId/${id}`)
}

const getTutorByPK = (id) =>{
    return defaultInstance.get(`/tutor/${id}`)
}

export const tutorApi = {
    getListTutorByStudentId,
    getTutorByPK
};