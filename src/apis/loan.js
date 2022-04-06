import { defaultInstance } from "./index";

const getAllWaiting = (data) => {
    return defaultInstance.post("/loan/waiting", 
    data
    );
};

const getOne = (id) => {
    return defaultInstance.get(`/loan/waiting/${id}`);
};

const countLoan = (type) => {
    return defaultInstance.get(`/loan/countLoan/${type}`);
};

export const loanApi = {
    getAllWaiting,
    getOne,
    countLoan
};