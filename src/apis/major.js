import { defaultInstance } from "./index";

const getAll = (id) => {
    return defaultInstance.get(`/major/${id}`);
};

const getAllBySchool = (id) => {
    return defaultInstance.get(`/major/school/${id}`);
};

const getNameParent = (id) => {
    return defaultInstance.get(`/major/name/${id}`);
};

const create = (data) => {
    return defaultInstance.post("/major", 
        data
    );
};

const update = (data) =>{
    return defaultInstance.put("/major/updateMajors", 
        data
    );
}

export const majorApi = {
    getAll,
    create,
    update,
    getAllBySchool,
    getNameParent,
};