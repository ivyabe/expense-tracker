import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default Form = (props) => {

    let { id } = useParams();

    return (
        <div>
            <h4>
                { id ? "Edit" : "Add"} Category
            </h4>
        </div>
    )
}