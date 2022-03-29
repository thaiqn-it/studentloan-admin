import { defaultInstance } from "./index";

const getAllWaiting = (data) => {
    return defaultInstance.post("/loan/waiting", 
    data
    );
};

export const loanApi = {
    getAllWaiting,
};