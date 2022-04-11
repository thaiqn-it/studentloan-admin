import { defaultInstance } from "./index";

const getAllByLoanId = (id) => {
    return defaultInstance.get(`/loanSchedule/loan/${id}`);
};

export const loanScheduleApi = {
    getAllByLoanId
};