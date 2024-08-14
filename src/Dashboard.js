import React, { useState, useEffect } from "react";
import { getTransactionsByTransactionType } from "./service/TransactionsService";
import { compute } from "./helpers/AppHelper";

export default Dashboard = () => {
    const [incomeTransactions, setIncomeTransactions] = useState([]);
    const [expenseTransactions, setExpenseTransactions] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);

    useEffect(() => {
        getAllIncomeTransaction();
        getAllExpenseTransaction();
    }, []);

    useEffect(() => {
        setTotalIncome(compute(incomeTransactions));
    }, [incomeTransactions])

    useEffect(() => {
        setTotalExpense(compute(expenseTransactions));
    }, [expenseTransactions])

    const getAllExpenseTransaction = () => {
        getTransactionsByTransactionType(1).then((payload) => {
            setExpenseTransactions(payload.data);
        }).catch((payload) => {
            console.log("Error: " + payload);
        });
    }

    const getAllIncomeTransaction = () => {
        getTransactionsByTransactionType(2).then((payload) => {
            setIncomeTransactions(payload.data);
        }).catch((payload) => {
            console.log("Error: " + payload);
        });
    }

    // const compute = (transactions) => {
    //     let total = 0;
    //     transactions.forEach(t => {
    //         total += parseInt(t.amount);
    //     });
    //     return total;
    // }

    const computeBalance = () => {
        return totalIncome - totalExpense;
    }

    return (
        <React.Fragment>
            <div className="card mt-1">
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <p className="card-text">
                                Income
                            </p>
                        </div>
                        <div className="col">
                            <p className="card-text">
                                ₱ {totalIncome}
                            </p>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col">
                            <p className="card-text">
                                Expense
                            </p>
                        </div>
                        <div className="col">
                            <p className="card-text">
                                ₱ {totalExpense}
                            </p>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col">
                            <p className="card-text">
                                Balance
                            </p>
                        </div>
                        <div className="col">
                            <p className="card-text">
                                ₱ {computeBalance()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}