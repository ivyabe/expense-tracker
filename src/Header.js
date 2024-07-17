import React from "react";
import Navigation from "./Navigation";
import { getCurrentUser, destroySession } from "./service/AuthService";

export default Header = () => {

    const currentUser = getCurrentUser();

    return (
        <React.Fragment>
            <header className="header">
                <h1>Header</h1>

                <div className="text-end">
                    Logged-in user: {currentUser.username}

                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                            destroySession();
                            window.location.reload();
                        }}
                    >
                        Logout
                    </button>
                </div>
            </header>
            <div className="mt-2"/>
            <Navigation/>
        </React.Fragment>
    )
}