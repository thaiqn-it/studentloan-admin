import { defaultInstance } from "./index";

const findAllByLoanId = (id) =>{
    return defaultInstance.get(`/investment/loanId/${id}`)
}
export const investmentApi = {
    findAllByLoanId,
};