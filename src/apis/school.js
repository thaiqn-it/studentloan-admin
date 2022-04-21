import { defaultInstance } from "./index";

const getAll = () => {
    return defaultInstance.get("/school");
};

const getAllName = () => {
    return defaultInstance.get("/school/name");
};

const getOne = (id) =>{
    return defaultInstance.get(`/school/${id}`)
}

const checkDuplicate = (name) =>{
    return defaultInstance.get(`/school/checkDuplicate/${name}`)
}

const create = (data) => {
    return defaultInstance.post("/school", 
        data
    );
};

const update = (id,data) =>{
    return defaultInstance.put(`/school/${id}`, 
        data
    );
}

export const schoolApi = {
    getAll,
    getOne,
    create,
    update,
    getAllName,
    checkDuplicate
};