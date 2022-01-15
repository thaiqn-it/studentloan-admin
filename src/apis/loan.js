import { defaultInstance } from "./index";

const getAll = (data) => {
    return defaultInstance.get("/loan", {
        data
    });
};

export const loanApi = {
    getAll,
};