import { defaultInstance } from "./index";

const getAllCity = () => {
    return defaultInstance.get("https://provinces.open-api.vn/api/p/", {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
        }
    });
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