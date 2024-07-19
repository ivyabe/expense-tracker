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
            <div className="mt-5"/>
            <div className="card-group">
                <div className="card border-0">
                    <center>
                        <img className="expenses-icon"
                        src="./assets/img/expenses-icon.png">
                        </img>
                    </center>
                </div>
                <div className="card border-0">
                    <div className="form-group mt-5">
                        <input
                            value={username}
                            className={getInputClassName(errors, 'username')}
                            disabled={isLoading}
                            placeholder="Username"
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                        />
                        {renderInputErrors(errors, 'username')}
                    </div>
                    <div className="form-group mt-2">
                         <input
                             value={password}
                             type="password"
                             className={getInputClassName(errors, 'password')}
                             disabled={isLoading}
                             placeholder="Password"
                             onChange={(event) => {
                                 setPassword(event.target.value);
                             }}
                         />
                         {renderInputErrors(errors, 'password')}
                    </div>
                    <hr/>
                    <button 
                         className="btn btn-primary w-100 mb-3"
                         disabled={isLoading}
                         onClick={handleLogin}
                     >
                         Login
                     </button>
                     <a className="text-end" href="#">
                        Sign-up?
                     </a>
                </div>
            </div>
        </div>
    )
}