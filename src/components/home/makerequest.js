import axios from "axios";

const makeReaquest = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
});

export default makeReaquest;
