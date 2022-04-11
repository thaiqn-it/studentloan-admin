import { defaultInstance } from "./index";

const count = (data) => {
    return defaultInstance.post("/transaction/count/",
        data
    );
}

const getAll = (data) => {
    return defaultInstance.get("/transaction/",{
        params:{
            ...data
        }
    });
}

export const transactionApi = {
    count,
    getAll,
};