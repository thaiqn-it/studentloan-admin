import { defaultInstance } from "./index";

const getAllWaiting = (data) => {
    return defaultInstance.post("/loan/waiting", 
    data
    );
};

const getOne = (id) => {
    return defaultInstance.get(`/loan/waiting/${id}`);
};

export const loanApi = {
    getAllWaiting,
    getOne
};