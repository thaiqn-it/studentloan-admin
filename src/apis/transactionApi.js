import { defaultInstance } from "./index";

const count = (data) => {
    return defaultInstance.post("/transaction/count/",
        data
    );
}

export const transactionApi = {
    count
};