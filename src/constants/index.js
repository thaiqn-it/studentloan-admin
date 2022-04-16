const API_SUCCSES = 200;
const API_BAD_REQUEST = 400;
const API_URL = "https://studentloanfpt.ddns.net/api"
//  || "http://localhost:3124/api";

const PRIMARY_COLOR_WHITE = "#ffffff";
const PRIMARY_COLOR_BLACK = "#000000";
const PRIMARY_COLOR = "#00BFA6";
const SECONDARY_COLOR = "#FFA15D";
const JWT_TOKEN = "JWT_TOKEN";
const USER_ID = "USER_ID";

export const getJWToken = () => {
  return localStorage.getItem(JWT_TOKEN);
};

export {
  API_SUCCSES,
  API_BAD_REQUEST,
  API_URL,
  PRIMARY_COLOR_WHITE,
  PRIMARY_COLOR_BLACK,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  JWT_TOKEN,
  USER_ID,
};
