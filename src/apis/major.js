import { defaultInstance } from "./index";

const getAll = () => {
    return defaultInstance.get('/major/');
};

const checkDuplicate = (name) => {
    return defaultInstance.get(`/major/checkDuplicate/${name}`);
};

const getOne = (id) => {
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

const update = (id,data) =>{
    return defaultInstance.put("/major/updateMajors/" + id, 
        data
    );
}

export const majorApi = {
    getAll,
    create,
    update,
    getAllBySchool,
    getNameParent,
    checkDuplicate,
    getOne
};