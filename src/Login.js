import React, { useState } from "react";
import { login, createSession } from "./service/AuthService";
import { getInputClassName, renderInputErrors } from "./helpers/AppHelper";

export default Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleLogin = () => {
        setIsLoading(true);
        setErrors({});
        login(username, password).then((payload) => {
            createSession(payload.data);
            window.location.reload();
        }).catch((payload) => {
            console.log("Error in logging in");
            console.log(payload);
            setErrors(payload.response.data);
        }).finally(() => {
            setIsLoading(false);
        })
    }

    return (
        <div className="container">
            <div className="mt-4"/>
            <div className="card">
                <div className="card-header">
                    Login
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label>
                            Username
                        </label>
                        <input
                            value={username}
                            className={getInputClassName(errors, 'username')}
                            disabled={isLoading}
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                        />
                        {renderInputErrors(errors, 'username')}
                    </div>
                    <div className="mt-2"/>
                    <div className="form-group">
                        <label>
                            Password
                        </label>
                        <input
                            value={password}
                            type="password"
                            className={getInputClassName(errors, 'password')}
                            disabled={isLoading}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                        {renderInputErrors(errors, 'password')}
                    </div>
                    <hr/>
                    <button 
                        className="btn btn-primary w-100"
                        disabled={isLoading}
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}