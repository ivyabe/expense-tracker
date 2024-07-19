import axios from "axios";
import { API_BASE_URL } from "env";

// export const getCategories = (args) => {
//     return axios.get(
//         `${API_BASE_URL}/categories`
//     )
// }

export const getCategoriesByTransactionType = (transactionTypeId) => {
    return axios.get(
        `${API_BASE_URL}/categories/${transactionTypeId}`
    )
}

// export const getCategoriesByTransactionType = (userId, transactionTypeId) => {
//     return axios.get(
//         `${API_BASE_URL}/categories/user=${userId}/${transactionTypeId}/`
//     )
// }

export const saveCategory = (category) => {
    if (category.id) {
        return axios.put(
            `${API_BASE_URL}/category/${category.id}`,
            category
        )
    } else {
        return axios.post(
            `${API_BASE_URL}/category`,
            category
        )
    }
}

export const getCategory = (id) => {
    return axios.get(
        `${API_BASE_URL}/category/${id}`
    )
}

export const deleteCategory = (id) => {
    return axios.delete(
        `${API_BASE_URL}/category/${id}`
    )
}
