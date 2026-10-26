import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

export const trackProduct = async (url) => {
    const response = await axios.post(`${API_URL}/track`, { url });
    return response.data;
};
