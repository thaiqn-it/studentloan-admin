import { defaultInstance } from "./index";

const create = (data) => {
    return defaultInstance.post("/loanHistory", 
    data
    );
};

const update = (id,data) => {
    return defaultInstance.put(`/loanHistory/${id}`,data);
};

export const loanHistoryApi = {
    create,
    update
};