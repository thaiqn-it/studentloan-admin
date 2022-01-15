import axios from "axios";
import { API_URL } from "../constants";

const defaultInstance = axios.create({
  baseURL: API_URL,
});

export { defaultInstance };
