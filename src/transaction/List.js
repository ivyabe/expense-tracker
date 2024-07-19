import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TRANSACTION_EXPENSE_ID } from "../const/Constants";
import { BTN_ADD, BTN_EDIT, BTN_DELETE } from "../const/Constants";
import { TRANSACTION_TYPE } from "../const/Defaults";
import { deleteCategory } from "../service/CategoriesService";
import CommonModal from "../common/Modal"
import { getTransactions } from "../service/TransactionsService";

export default List = (props) => {

    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedTransactionType, setSelecredTransactionType] = useState(TRANSACTION_EXPENSE_ID);
    const [transactionTypes, setTransactionTypes] = useState(TRANSACTION_TYPE);
    const [selectedTransaction, setSelectedTransaction] = useState([]);
    const [modalDetails, setModalDetails] = useState({});

    const loadTransactions = () => {
        getTransactions().then((payload) => {
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
                    deleteCategory(selectedTransaction.id).then((payload) => {
                        loadTransactions();
                        handleClose();
                    }).catch((payload) => {
                        console.log("Error: " + payload);
                    })
                }}
            >
            </CommonModal>
        <div>
            {transactions.length <= 0 ?
            <center>
                <p><a href="/#/category/add">Add</a> new transaction.</p>
            </center> : 
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
                                            console.log("Radio: " + event.target.value);
                                            let _selectedTransactionType = { ...selectedTransactionType};
                                            _selectedTransactionType = event.target.value;
                                            setSelecredTransactionType(_selectedTransactionType);
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
                                navigate("/transaction/add");
                            }}
                        >{BTN_ADD}</button>
                    </div>
                </div>
                {
                transactions.map((transaction) => {
                    return (
                        <React.Fragment key={`transaction-${transaction.id}`}>
                            <div className="card mt-1">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <p className="card-text">
                                                {transaction.note}
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
                                                    console.log("Delete");
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
            }
        </div>
        </React.Fragment>
    )
}