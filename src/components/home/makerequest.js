import axios from "axios";
import { BASE_API } from "../../vars";

const makeReaquest = axios.create({
    baseURL: `${BASE_API}`,
    withCredentials: true,
});

export default makeReaquest;
