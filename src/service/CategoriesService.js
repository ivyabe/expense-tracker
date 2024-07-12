import axios from "axios";
import { API_BASE_URL } from "env";

export const getCategories = (args) => {
    return axios.get(
        `${API_BASE_URL}/categories`
    )
}

export const getCategoriesByType = (id) => {
    return axios.get(
        `${API_BASE_URL}/categories?typeId=${id}`
    )
}