import React from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import DateNav from "./DateNav";
import { getCurrentUser, destroySession, isLoggedIn } from "./service/AuthService";

export default Header = () => {
    const navigate = useNavigate();
    const currentUser = getCurrentUser();

    return (
        <React.Fragment>
            <header className="header">
                <h1>Expense Tracker</h1>
                {
                    isLoggedIn() ? 
                    <React.Fragment>
                        <div className="text-end">
                        Logged-in user: {currentUser.username}

                        <button
                            className="btn btn-danger btn-sm btn-logout"
                            onClick={() => {
                                destroySession();
                                navigate("/");
                                window.location.reload();
                            }}
                        >
                            Logout
                        </button>
                        </div>
                    </React.Fragment>
                    :
                    ""
                }
                
            </header>
            <div className="mt-2"/>
            {
                isLoggedIn() ? 
                <React.Fragment>
                    {/* <DateNav/> */}
                    <Navigation/>
                </React.Fragment>
                : ""
            }
        </React.Fragment>
    )
}