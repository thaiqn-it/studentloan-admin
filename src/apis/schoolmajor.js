import { defaultInstance } from "./index";

const getAll = (data) => {
    return defaultInstance.get("/schoolmajor", {
        data
    });
};

const create = (data) => {
    return defaultInstance.post("/schoolmajor", 
        data
    );
};

export const schoolMajorApi = {
    getAll,
    create,
};