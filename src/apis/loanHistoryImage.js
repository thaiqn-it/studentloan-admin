import { defaultInstance } from "./index";

const create = (data) => {
    return defaultInstance.post("/loanHistoryImage", 
    data
    );
};

const update = (id,data) => {
    return defaultInstance.put(`/loanHistoryImage/${id}`,data);
};

export const loanHistoryImageApi = {
    create,
    update
};