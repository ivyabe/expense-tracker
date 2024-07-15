import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TRANSACTION_EXPENSE_ID } from "../const/Constants";
import { getCategoriesByType } from "../service/CategoriesService";

export default List = (props) => {

    const navigate = useNavigate();
    const [transactionType, setTransactionType] = useState(TRANSACTION_EXPENSE_ID);
    const [categories, setCategories] = useState([]);

    let { id } = useParams();

    useEffect(() => {
        getCategoriesByType(transactionType).then((payload) => {
            setCategories(payload.data);
        }).catch((payload) => {
            console.log("Error: " + payload);
        });
    }, [transactionType]);

    return (
        <div>
            {
                categories.map((category) => {
                    return (
                        <React.Fragment key={`category-${category.id}`}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <p class="card-text">
                                                {category.name}
                                            </p>
                                        </div>
                                        <div className="col text-end">
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => {
                                                    console.log(category.id)
                                                    navigate(`/categories/${category.id}`);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger ms-2"
                                                onClick={() => {
                                                    // navigate(`/courses/${course.id}`);
                                                    console.log("Delete")
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                })
            }
        </div>
    )
}