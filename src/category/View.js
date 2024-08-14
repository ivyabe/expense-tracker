import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DEFAULT_CATEGORY } from "../const/Defaults";
import { getCategory } from "../service/CategoriesService";
import { getTransactionsByCategoryId } from "../service/TransactionsService";
import { BTN_BACK } from "../const/Constants";
import { formatDate, displayText } from "../helpers/AppHelper";

export default View = () => {

    let { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState(DEFAULT_CATEGORY);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        getCategory(id).then((payload) => {
            setCategory(payload.data);
        }).catch((payload) => {
            console.log("Error: " + payload);
        })

        getTransactionsByCategoryId(id).then((payload) => {
            setTransactions(payload.data);
        }).catch((payload) => {
            console.log("Error: " + payload);
        })
    }, [id]);

    return (
        <React.Fragment>
            <h5>
                {category.name}
            </h5>
            <hr/>
            {
                transactions.length <= 0 ?
                <center>
                    <p>No transaction registered for this category.</p>
                </center>
                :
                transactions.map((transaction) => {
                    return (
                        <React.Fragment key={`transaction-${transaction.id}`}>
                        <div className="card mt-1">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <p className="card-text">
                                            {formatDate(transaction.expenseDate)}
                                        </p>
                                    </div>
                                    <div className="col">
                                        <p className="card-text">
                                            {displayText(transaction, category.name)}
                                        </p>
                                    </div>
                                    <div className="col">
                                            <p className="card-text">
                                                {transaction.amount}
                                            </p>
                                        </div>
                                </div>
                            </div>
                        </div>
                        </React.Fragment>
                    )
                })
            }
            <hr/>
            <div className="form-group text-end mt-4">
                <button
                    className="btn btn-warning btn-margin"
                    onClick={() => {
                        navigate("/categories");
                    }}
                >
                    { BTN_BACK }
                </button>
            </div>
        </React.Fragment>
    )
}