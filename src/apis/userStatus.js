import { defaultInstance } from "./index";

const create = (data) => {
    return defaultInstance.post("/userStatus", 
        data
    );
};

const getOne = (id) =>{
    return defaultInstance.get(`/userStatus/${id}`)
}

const update = (id,data) =>{
    return defaultInstance.put(`/userStatus/${id}`, 
        data
    );
}

export const userStatusApi = {
    create,
    update,
    getOne
};