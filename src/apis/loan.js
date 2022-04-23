import { defaultInstance } from "./index";

const getAllWaiting = (data) => {
    return defaultInstance.post("/loan/waiting", 
    data
    );
};

const getOne = (id) => {
    return defaultInstance.get(`/loan/waiting/${id}`);
};

const generateZip = (id) => {
    return defaultInstance.get(`/loan/pdf/${id}`);
};

const countLoan = (type) => {
    return defaultInstance.get(`/loan/countLoan/${type}`);
};

const countLoanBaseTime = (data) => {
    return defaultInstance.post("/loan/countLoan",data);
};

export const loanApi = {
    getAllWaiting,
    getOne,
    countLoan,
    countLoanBaseTime,
    generateZip
};