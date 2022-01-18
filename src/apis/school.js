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
    return defaultInstance.get("/school", {
        data
    });
};

export const schoolApi = {
    getAll,
    getOne,
    create
};