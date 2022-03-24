import { defaultInstance } from "./index";

const getInvestorByUserId = (id) =>{
    return defaultInstance.get(`/investor/userId/${id}`)
}

const create = (data) => {
    return defaultInstance.post("/investor", 
        data
    );
};

const update = (id,data) =>{
    return defaultInstance.put(`/investor/${id}`, 
        data
    );
}

export const investorApi = {
    getInvestorByUserId,
    create,
    update
};