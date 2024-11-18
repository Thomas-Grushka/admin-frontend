import axios from "axios";

export const authInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

export const loginRequest = async body => {
    const {data} = await authInstance.post("/auth/login", body);
    return data;
};

export const logoutRequest = () => authInstance.post("/auth/logout");