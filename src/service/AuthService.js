import axios from "axios";
import {
    API_BASE_URL,
    TOKEN_BEARER,
    USER_OBJECT
} from "env";

export const login = (username, password) => {
    return axios.post(
        `${API_BASE_URL}/login`,
        {
            username: username,
            password: password
        }
    )
}

export const createSession = (args) => {
    console.log(args);
    localStorage.setItem(TOKEN_BEARER, args.token);
    localStorage.setItem(USER_OBJECT, JSON.stringify(args.user));
}

export const destroySession = () => {
    localStorage.removeItem(TOKEN_BEARER);
    localStorage.removeItem(USER_OBJECT);
}

export const getToken = () => {
    return localStorage.getItem(TOKEN_BEARER);
}

export const isLoggedIn = () => {
    return getCurrentUser() != false;
}

export const getCurrentUser = () => {
    let userString = localStorage.getItem(USER_OBJECT);

    if (userString) {
        return JSON.parse(userString);
    } else {
        return false;
    }
}