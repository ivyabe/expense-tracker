import React from "react";
import { Routes, Route } from "react-router-dom";
import { isLoggedIn } from "./service/AuthService";
import Login from "./Login";
import Header from "./Header";
import Dashboard from "./Dashboard";
import TransactionsList from "./transaction/List";
import TransactionForm from "./transaction/Form";
import CategoriesList from "./category/List";
import CategoryForm from "./category/Form";

export default App = (props) => {
    return (
        <React.Fragment>
            {
                isLoggedIn() ?
                <React.Fragment>
                    <Header/>
                    <div className="mt-4"/>
                    <div className="container">
                    <Routes>
                        <Route
                            path="/"
                            element={<Dashboard/>}
                        />
                        <Route
                            path="/transactions"
                            element={<TransactionsList/>}
                        />
                        <Route
                            path="/transaction/add/type/:typeId"
                            element={<TransactionForm/>}
                        />
                        <Route
                            path="/transaction/edit/:id"
                            element={<TransactionForm/>}
                        />
                        <Route
                            path="/categories"
                            element={<CategoriesList/>}
                        />
                        <Route
                            path="/category/add/type/:typeId"
                            element={<CategoryForm/>}
                        />
                        <Route
                            path="/category/edit/:id"
                            element={<CategoryForm/>}
                        />
                    </Routes>
                    </div>
                </React.Fragment>
                :
                <div>
                    <Login/>
                </div>
            }
        </React.Fragment>
    );
}