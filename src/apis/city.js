import { defaultInstance } from "./index";

const getAllCity = () => {
    return defaultInstance.get("https://provinces.open-api.vn/api/p/");
};

const getAllDistrict = (code) => {
    return defaultInstance.get(`https://provinces.open-api.vn/api/p/${code}?depth=2`);
};

const getAllDistrictInit = (city) => {
    return defaultInstance.get(`https://provinces.open-api.vn/api/p/search/?q=${city}`);
};

export const cityApi = {
    getAllCity,
    getAllDistrict,
    getAllDistrictInit,
};