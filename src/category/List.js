import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TRANSACTION_EXPENSE_ID } from "../const/Constants";
import { BTN_ADD, BTN_EDIT, BTN_DELETE } from "../const/Constants";
import { TRANSACTION_TYPE } from "../const/Defaults";
import { getCategories, deleteCategory } from "../service/CategoriesService";
import CommonModal from "../common/Modal"

export default List = (props) => {

    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedTransactionType, setSelecredTransactionType] = useState(TRANSACTION_EXPENSE_ID);
    const [transactionTypes, setTransactionTypes] = useState(TRANSACTION_TYPE);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [modalDetails, setModalDetails] = useState({});

    const loadCategories = () => {
        getCategories().then((payload) => {
            setCategories(payload.data);
        }).catch((payload) => {
            console.log("Error: " + payload);
        });
    }

    useEffect(() => {
        loadCategories();
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
                    deleteCategory(selectedCategory.id).then((payload) => {
                        loadCategories();
                        handleClose();
                    }).catch((payload) => {
                        console.log("Error: " + payload);
                    })
                }}
            >
            </CommonModal>
        <div>
            {categories.length <= 0 ?
            <center>
                <p><a href="/#/category/add">Add</a> new category.</p>
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
                                navigate("/category/add");
                            }}
                        >{BTN_ADD}</button>
                    </div>
                </div>
                {
                categories.map((category) => {
                    return (
                        <React.Fragment key={`category-${category.id}`}>
                            <div className="card mt-1">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <p className="card-text">
                                                {category.name}
                                            </p>
                                        </div>
                                        <div className="col text-end">
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => {
                                                    navigate(`/category/edit/${category.id}`);
                                                }}
                                            >
                                                {BTN_EDIT}
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm ms-2"
                                                onClick={() => {
                                                    console.log("Delete");
                                                    setSelectedCategory(category);
                                                    let _modalDetails = { ...modalDetails};
                                                    _modalDetails.title = "Delete Category";
                                                    _modalDetails.body = `Are you sure you want to delete ${category.name}?`;
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