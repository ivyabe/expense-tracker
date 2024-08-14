import React from "react";
import { Link } from "react-router-dom";

export default Navigation = () => {
    return (
        <React.Fragment>
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