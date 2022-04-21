import { defaultInstance } from "./index";

const getAllBySchool = (id) => {
    return defaultInstance.get(`/schoolmajor/school/${id}`);
};

const create = (data) => {
    return defaultInstance.post("/schoolmajor", 
        data
    );
};

const update = (id,data) =>{
    return defaultInstance.put(`/schoolmajor/${id}`, 
        data
    );
}

const findOne = (majorId,schoolId)=>{
    return defaultInstance.get(`/schoolmajor/${majorId}/${schoolId}`);
}

export const schoolMajorApi = {
    create,
    update,
    getAllBySchool,
    findOne
};