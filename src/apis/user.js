import { defaultInstance } from "./index";

const getAll = () => {
    return defaultInstance.get("/user");
};

const getOne = (id) =>{
    //C1
    // return defaultInstance.get("/user"+id)
    //C2
    return defaultInstance.get(`/user/${id}`)
}

const update = (id,data) =>{
    return defaultInstance.put(`/user/${id}`, 
        data
    );
}

export const userApi = {
    getAll,
    getOne,
    update,
};