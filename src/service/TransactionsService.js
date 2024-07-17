import axios from "axios";
import { API_BASE_URL } from "env";

export const getTransactions = (args) => {
    return axios.get(
        `${API_BASE_URL}/transactions`
    )
}

export const getTransaction = (id) => {
    return axios.get(
        `${API_BASE_URL}/transaction/${id}`
    )
}

export const saveTransaction = (transaction) => {
    if (transaction.id) {
        return axios.put(
            `${API_BASE_URL}/transaction/${transaction.id}`,
            transaction
        )
    } else {
        return axios.post(
            `${API_BASE_URL}/transaction`,
            transaction
        )
    }
}

export const deleteTransaction = (id) => {
    return axios.delete(
        `${API_BASE_URL}/transaction/${id}`
    )
}
