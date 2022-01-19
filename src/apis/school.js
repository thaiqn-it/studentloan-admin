import { defaultInstance } from "./index";

const getAll = () => {
    return defaultInstance.get("/school");
};

const getOne = (id) =>{
    //C1
    // return defaultInstance.get("/school"+id)
    //C2
    return defaultInstance.get(`/school/${id}`)
}

const create = (data) => {
    return defaultInstance.post("/school", {
        data
    });
};

const update = (id,data) =>{
    return defaultInstance.put(`/school/${id}`, {
        data
    });
}

export const schoolApi = {
    getAll,
    getOne,
    create,
    update,
};