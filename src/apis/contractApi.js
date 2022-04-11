import { defaultInstance } from "./index";

const findByInvestmentId = (id) =>{
    return defaultInstance.get(`/contract/investment/${id}`)
}
export const contractApi = {
    findByInvestmentId,
};