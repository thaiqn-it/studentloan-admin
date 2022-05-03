import { defaultInstance } from "./index";

const getAllByUserId = () => {
    return defaultInstance.get("/notification");
};

const getTop5TodayByUserId = (data) => {
    return defaultInstance.post("/notification/getTop",data);
};

const pushNotifToUser = (data) =>{
    return defaultInstance.post(`/notification/user/`,data);
}

const create = (data) => {
    return defaultInstance.post("/notification", 
        data
    );
};

const update = (id,data) =>{
    return defaultInstance.put(`/notification/${id}`, 
        data
    );
}

const getOneById = (id) => {
    return defaultInstance.get(`/notification/${id}`);
};

export const notificationApi = {
    getAllByUserId,
    getTop5TodayByUserId,
    create,
    update,
    getOneById,
    pushNotifToUser
};