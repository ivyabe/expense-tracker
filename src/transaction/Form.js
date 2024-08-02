import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DEFAULT_TRANSACTION, TRANSACTION_TYPE } from '../const/Defaults';
import { saveTransaction, getTransaction } from '../service/TransactionsService';
import { getCategoriesByTransactionType } from "../service/CategoriesService";
import { getInputClassName, renderInputErrors } from "../helpers/AppHelper";
import { BTN_SAVE, BTN_CANCEL } from "../const/Constants";

export default Form = (props) => {

    let { typeId, id } = useParams();
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState(DEFAULT_TRANSACTION);
    const [transactionTypes, setTransactionTypes] = useState(TRANSACTION_TYPE);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const loadCategories = (i) => {
        getCategoriesByTransactionType(i).then((payload) => {
            setCategories(payload.data);
        }).catch((payload) => {
            console.log("Error: " + payload);
        });
    }

    // Add
    useEffect(() => {
        if (typeId) {
            let _transaction = {...transaction};
            _transaction.transactionTypeId = typeId;
            setTransaction(_transaction);
            loadCategories(typeId);
        }
    }, [typeId]);

    // Edit
    useEffect(() => {
        if (id) {
            getTransaction(id).then((payload) => {
                setTransaction(payload.data);
                loadCategories(payload.data.transactionTypeId);
            }).catch((payload) => {
                console.log("Error: " + payload);
            })
        }
    }, [id]);

    return (
        <div>
            <h3>
                { id ? "Edit" : "Add"} Transaction
            </h3>

            <form>
                <div className="form-group row mt-4">
                    <label className="col-sm-2 col-form-label">Transaction Type: </label>
                    <div className="col-sm-10">
                        <select
                            className="form-control"
                            disabled
                            value={transaction.transactionTypeId}
                            onChange={(event) => {
                                let _transaction = {...transaction};
                                _transaction.transactionTypeId = event.target.value;
                                setTransaction(_transaction);
                            }}
                        >
                            {/* <option value="" disabled> --- Select Transaction Type --- </option> */}
                            {transactionTypes.map((type) => {
                                return (
                                    <option value={type.id} key={`type-${type.id}`}>
                                        {type.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="form-group row mt-4">
                    <label className="col-sm-2 col-form-label">Category: </label>
                    <div className="col-sm-10">
                        <select
                            className="form-control"
                            disabled={isLoading}
                            value={transaction.categoryId}
                            onChange={(event) => {
                                let _transaction = {...transaction};
                                _transaction.categoryId = event.target.value;
                                setTransaction(_transaction);
                            }}
                        >
                            <option value="" disabled> --- Select Category --- </option>
                            {categories.map((category) => {
                                return (
                                    <option value={category.id} key={`category-${category.id}`}>
                                        {category.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="form-group row mt-4">
                    <label className="col-sm-2 col-form-label">Date: </label>
                    <div className="col-sm-10">
                        <input
                            type="date"
                            value={transaction.expenseDate?.substr(0,10)}
                            disabled={isLoading}
                            className={getInputClassName(errors, 'expenseDate')}
                            onChange={(event) => {
                                let _transaction = {...transaction}
                                _transaction.expenseDate = event.target.value;
                                setTransaction(_transaction);
                            }}
                        />
                        {renderInputErrors(errors, 'expenseDate')}
                    </div>
                </div>
                <div className="form-group row mt-4">
                    <label className="col-sm-2 col-form-label">Amount: </label>
                    <div className="col-sm-10">
                        <input
                            value={transaction.amount}
                            disabled={isLoading}
                            className={getInputClassName(errors, 'amount')}
                            onChange={(event) => {
                                let _transaction = {...transaction}
                                _transaction.amount = event.target.value;
                                setTransaction(_transaction);
                            }}
                        />
                        {renderInputErrors(errors, 'amount')}
                    </div>
                </div>
                <div className="form-group row mt-4">
                    <label className="col-sm-2 col-form-label">Notes: </label>
                    <div className="col-sm-10">
                        <input
                            value={transaction.note}
                            disabled={isLoading}
                            className="form-control"
                            onChange={(event) => {
                                let _transaction = {...transaction}
                                _transaction.note = event.target.value;
                                setTransaction(_transaction);
                            }}
                        />
                    </div>
                </div>
                <div className="form-group row mt-4">
                    <label className="col-sm-2 col-form-label">Attach File: </label>
                    <div className="col-sm-10">
                        <input className="form-control" type="file" id="formFile" />
                    </div>
                </div>
            </form>
            <div className="form-group text-end mt-4">
                <button 
                    disabled={isLoading}
                    className="btn btn-primary btn-margin"
                    onClick={() => {
                        console.log("Save Clicked");
                        setIsLoading(true);
                        setErrors({});
                        saveTransaction({...transaction}).then((payload) => {
                            setTransaction(DEFAULT_TRANSACTION);
                            navigate("/transactions");
                        }).catch((payload) => {
                            console.log("Error: " + payload);
                            setErrors(payload.response.data);
                        }).finally(() => {
                            setIsLoading(false);
                        })
                    }}
                >
                    { BTN_SAVE }
                </button>
                <button 
                    disabled={isLoading}
                    className="btn btn-warning btn-margin"
                    onClick={() => {
                        navigate("/transactions");
                    }}
                >
                    { BTN_CANCEL }
                </button>
            </div>
        </div>
    )
}