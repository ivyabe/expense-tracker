import React from "react";
import Navigation from "./Navigation";

export default Header = () => {
    return (
        <React.Fragment>
            <header className="header">
                <h1>Header</h1>
            </header>
            <div className="mt-2"/>
            <Navigation/>
        </React.Fragment>
    )
}