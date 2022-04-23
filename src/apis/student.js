import { defaultInstance } from "./index";

const getStudentByUserId = (id) =>{
    return defaultInstance.get(`/student/findByUserId/${id}`)
}

const generatePDF = (data) =>{
    return defaultInstance.get("/student/pdf",{
        params:{
            ...data,
        }
    });
}

const count = (data) =>{
    return defaultInstance.post('/student/count',data)
}

const update = (id,data) =>{
    return defaultInstance.put(`/student/${id}`, 
        data
    );
}

export const studentApi = {
    getStudentByUserId,
    update,
    count,
};