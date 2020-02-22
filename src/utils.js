import axios from 'axios';
import {endpoint} from "./store/constants";

export const authAxios = axios.create(
    {
    baseURL: endpoint,
    headers: {
        Authorization: `Token ${localStorage.getItem("token")}`
    }
    }
);