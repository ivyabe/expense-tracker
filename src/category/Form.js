import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DEFAULT_CATEGORY, TRANSACTION_TYPE } from '../const/Defaults';
import { saveCategory, getCategory } from '../service/CategoriesService';
import { getInputClassName, renderInputErrors } from "../helpers/AppHelper";
import { BTN_SAVE, BTN_CANCEL } from "../const/Constants";

export default Form = (props) => {

    let { typeId, id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState(DEFAULT_CATEGORY);
    const [transactionTypes, setTransactionTypes] = useState(TRANSACTION_TYPE);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (typeId) {
            let _category = {...category};
            _category.transactionTypeId = typeId;
            setCategory(_category);
        }
    }, [typeId]);

    useEffect(() => {
        if (id) {
            getCategory(id).then((payload) => {
                setCategory(payload.data);
            }).catch((payload) => {
                console.log("Error: " + payload);
            })
        }
    }, [id]);

    return (
        <div>
            <h3>
                { id ? "Edit" : "Add"} Category
            </h3>

            <form>
                <div className="form-group row mt-4">
                    <label className="col-sm-2 col-form-label">Transaction Type: </label>
                    <div className="col-sm-10">
                        <select
                            className="form-control"
                            disabled={isLoading}
                            value={category.transactionTypeId}
                            onChange={(event) => {
                                let _category = {...category};
                                _category.transactionTypeId = event.target.value;
                                setCategory(_category);
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
                    <label className="col-sm-2 col-form-label">Category Name: </label>
                    <div className="col-sm-10">
                        <input
                            value={category.name}
                            disabled={isLoading}
                            className={getInputClassName(errors, 'name')}
                            onChange={(event) => {
                                let _category = {...category}
                                _category.name = event.target.value;
                                setCategory(_category);
                            }}
                        />
                        {renderInputErrors(errors, 'name')}
                    </div>
                </div>
                <div className="form-group row mt-4">
                    <label className="col-sm-2 col-form-label">Notes: </label>
                    <div className="col-sm-10">
                        <input
                            value={category.notes}
                            disabled={isLoading}
                            className="form-control"
                            onChange={(event) => {
                                let _category = {...category}
                                _category.notes = event.target.value;
                                setCategory(_category);
                            }}
                        />
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
                        saveCategory({...category}).then((payload) => {
                            setCategory(DEFAULT_CATEGORY);
                            navigate("/categories");
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
                        navigate("/categories");
                    }}
                >
                    { BTN_CANCEL }
                </button>
            </div>
        </div>
    )
}