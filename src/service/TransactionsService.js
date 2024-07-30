import axios from "axios";
import { API_BASE_URL } from "env";
import { buildAuthorizedHeaders } from "../helpers/AppHelper";

// export const getTransactions = (args) => {
//     return axios.get(
//         `${API_BASE_URL}/transactions`
//     )
// }

export const getTransactionsByTransactionType = (transactionTypeId) => {
    return axios.get(
        `${API_BASE_URL}/transactions/${transactionTypeId}`,
        { headers: buildAuthorizedHeaders() }
    )
}

export const getTransaction = (id) => {
    return axios.get(
        `${API_BASE_URL}/transaction/${id}`,
        { headers: buildAuthorizedHeaders() }
    )
}

export const saveTransaction = (transaction) => {
    if (transaction.id) {
        return axios.put(
            `${API_BASE_URL}/transaction/${transaction.id}`,
            transaction,
            { headers: buildAuthorizedHeaders() }
        )
    } else {
        return axios.post(
            `${API_BASE_URL}/transaction`,
            transaction,
            { headers: buildAuthorizedHeaders() }
        )
    }
}

export const deleteTransaction = (id) => {
    return axios.delete(
        `${API_BASE_URL}/transaction/${id}`,
        { headers: buildAuthorizedHeaders() }
    )
}
