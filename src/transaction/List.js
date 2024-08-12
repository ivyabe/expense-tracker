import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TRANSACTION_EXPENSE_ID } from "../const/Constants";
import { BTN_ADD, BTN_EDIT, BTN_DELETE } from "../const/Constants";
import { TRANSACTION_TYPE } from "../const/Defaults";
import { getCategory } from "../service/CategoriesService";
import CommonModal from "../common/Modal"
import { softDeleteTransaction, getTransactionsByTransactionType } from "../service/TransactionsService";
import { displayText, formatDate } from "../helpers/AppHelper";

export default List = (props) => {

    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedTransactionType, setSelectedTransactionType] = useState(TRANSACTION_EXPENSE_ID);
    const [transactionTypes, setTransactionTypes] = useState(TRANSACTION_TYPE);
    const [selectedTransaction, setSelectedTransaction] = useState([]);
    const [modalDetails, setModalDetails] = useState({});

    const loadTransactions = () => {
        getTransactionsByTransactionType(selectedTransactionType).then((payload) => {
            setTransactions(payload.data);
        }).catch((payload) => {
            console.log("Error: " + payload);
        });
    }

    useEffect(() => {
        loadTransactions();
    }, [selectedTransactionType]);

    const handleClose = () => {
        setIsOpenModal(false);
    }

    return (
        <React.Fragment>
            <CommonModal
                show={isOpenModal}
                content={modalDetails}
                handleClose={handleClose}
                onConfirm={() => {
                    softDeleteTransaction(selectedTransaction.id).then((payload) => {
                        loadTransactions();
                        handleClose();
                    }).catch((payload) => {
                        console.log("Error: " + payload);
                    })
                }}
                back=""
            >
            </CommonModal>
            <div>
                <div className="row">
                    <div className="col">
                        {transactionTypes.map((type) => {
                            return (
                                <div key={`type-${type.id}`}>
                                    <input 
                                        type="radio"
                                        value={type.id} 
                                        name="transaction_type"
                                        checked={selectedTransactionType == type.id ? true : false}
                                        onChange={(event) => {
                                            let _selectedTransactionType = { ...selectedTransactionType};
                                            _selectedTransactionType = event.target.value;
                                            setSelectedTransactionType(_selectedTransactionType);
                                        }}
                                    />
                                    <label className="radio-margin"> {type.name} </label><br></br>
                                </div>
                            )
                        })}
                    </div>
                    <div className="col text-end">
                        <button
                            className="btn btn-primary btn-sm mb-2"
                            onClick={() => {
                                navigate(`/transaction/add/type/${selectedTransactionType}`);
                            }}
                        >{BTN_ADD}</button>
                    </div>
                </div>
                <hr/>
                {
                transactions.length <= 0 ?
                <center>
                    <p><a href={`/#/transaction/add/type/${selectedTransactionType}`}>Add</a> new transaction.</p>
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
                                                {displayText(transaction)}
                                            </p>
                                        </div>
                                        <div className="col">
                                            <p className="card-text">
                                                {transaction.amount}
                                            </p>
                                        </div>
                                        <div className="col text-end">
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => {
                                                    navigate(`/transaction/edit/${transaction.id}`);
                                                }}
                                            >
                                                {BTN_EDIT}
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm ms-2"
                                                onClick={() => {
                                                    setSelectedTransaction(transaction);
                                                    let _modalDetails = { ...modalDetails};
                                                    _modalDetails.title = "Delete Transaction";
                                                    _modalDetails.body = "Are you sure you want to delete the selected transaction?";
                                                    setModalDetails(_modalDetails);
                                                    setIsOpenModal(true);
                                                }}
                                            >
                                                {BTN_DELETE}
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
        </React.Fragment>
    )
}