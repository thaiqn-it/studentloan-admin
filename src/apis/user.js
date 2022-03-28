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

const update = (data) =>{
    return defaultInstance.put("/user/", 
        data
    );
}

export const userApi = {
    getAll,
    getOne,
    update,
};