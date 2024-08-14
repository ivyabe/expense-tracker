import React, { useState, useEffect } from "react";

export default DateNav = () => {

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
        </React.Fragment>
    )
}