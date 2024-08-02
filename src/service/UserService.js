import axios from "axios";
import { API_BASE_URL } from "env";
import { buildAuthorizedHeaders } from "../helpers/AppHelper";

export const addUser = (user) => {
    return axios.post(
        `${API_BASE_URL}/user`,
        user,
        { headers: buildAuthorizedHeaders() }
    )
}
