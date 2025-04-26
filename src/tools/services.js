import axios from "axios";

const configDefault = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
    },
}

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const services = {
    get: (url, config = {}) => {
        return axiosInstance.get(url, { ...configDefault, ...config });
    },
    post: (url, data, config = {}) => {
        return axiosInstance.post(url, data, { ...configDefault, ...config });
    },
    put: (url, data, config = {}) => {
        return axiosInstance.put(url, data, { ...configDefault, ...config });
    },
    delete: (url, config = {}) => {
        return axiosInstance.delete(url, { ...configDefault, ...config });
    },
};

export default services;