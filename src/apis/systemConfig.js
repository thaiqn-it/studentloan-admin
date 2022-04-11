import { defaultInstance } from "./index";


const getOne = () =>{
    return defaultInstance.get('/config/getOne')
}

const create = (data) => {
    return defaultInstance.post("/config", 
        data
    );
};

const update = (id,data) =>{
    return defaultInstance.put(`/config/${id}`, 
        data
    );
}

export const systemConfigApi = {
    getOne,
    create,
    update
};