import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default Navigation = () => {

    const [currentMonth, setCurrentMonth] = useState("");
    const [currentYear, setCurrentYear] = useState("");

    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
        const d = new Date();
        setCurrentMonth(month[d.getMonth()]);
        setCurrentYear(d.getFullYear());
    }, [])

    return (
        <React.Fragment>
            <center>
                <div className="row mt-3">
                    <div className="col">
                        <a> ⬅ </a>
                    </div>
                    <div className="col">
                        <a>
                            <h5> { currentMonth } { currentYear } </h5>
                        </a>
                    </div>
                    <div className="col">
                        <a> ➡ </a>
                    </div>
                </div>
            </center>
            <nav>
                <ul className="nav justify-content-center mb-2" role="tablist">
                    <li className="nav-item">
                        <Link to="/" className="nav-link active">
                            Dashboard
                        </Link>
                    </li>
                    <li className="nav-item" >
                        <Link to="/transactions" className="nav-link">
                            Transactions
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/categories" className="nav-link">
                            Categories
                        </Link>
                    </li>
                </ul>
            </nav>
            <hr/>
        </React.Fragment>
    )
}