import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEFAULT_USER } from "./const/Defaults";
import { getInputClassName, renderInputErrors } from "./helpers/AppHelper";
import Header from "./Header";
import { BTN_CANCEL, BTN_REGISTER } from "./const/Constants";
import { addUser } from "./service/UserService";
import CommonModal from "./common/Modal";

export default Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(DEFAULT_USER);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalDetails, setModalDetails] = useState({});

    return (
        <React.Fragment>
            <Header/>
            <CommonModal
                show={isOpenModal}
                content={modalDetails}
                handleClose=""
                onConfirm=""
                back={() => {
                    setUser(DEFAULT_USER);
                    navigate("/");
                }}
            >
            </CommonModal>
            <div className="container">
                <div className="mt-4"/>
                <h3> Sign-in: </h3>

                <form>
                    <div className="form-group row mt-4">
                    <label className="col-sm-2 col-form-label">First Name: </label>
                        <div className="col-sm-10">
                            <input
                                value={user.firstName}
                                disabled={isLoading}
                                className={getInputClassName(errors, 'firstName')}
                                onChange={(event) => {
                                    let _user = {...user}
                                    _user.firstName = event.target.value;
                                    setUser(_user);
                                }}
                            />
                            {renderInputErrors(errors, 'firstName')}
                        </div>
                    </div>
                    <div className="form-group row mt-4">
                    <label className="col-sm-2 col-form-label">Last Name: </label>
                        <div className="col-sm-10">
                            <input
                                value={user.lastName}
                                disabled={isLoading}
                                className={getInputClassName(errors, 'lastName')}
                                onChange={(event) => {
                                    let _user = {...user}
                                    _user.lastName = event.target.value;
                                    setUser(_user);
                                }}
                            />
                            {renderInputErrors(errors, 'lastName')}
                        </div>
                    </div>
                    <div className="form-group row mt-4">
                        <label className="col-sm-2 col-form-label">Email: </label>
                        <div className="col-sm-10">
                            <input
                                type="email"
                                value={user.email}
                                disabled={isLoading}
                                className={getInputClassName(errors, 'email')}
                                onChange={(event) => {
                                    let _user = {...user}
                                    _user.email = event.target.value;
                                    setUser(_user);
                                }}
                            />
                            {renderInputErrors(errors, 'email')}
                        </div>
                    </div>
                    <div className="form-group row mt-4">
                        <label className="col-sm-2 col-form-label">Username: </label>
                        <div className="col-sm-10">
                            <input
                                value={user.username}
                                disabled={isLoading}
                                className={getInputClassName(errors, 'username')}
                                onChange={(event) => {
                                    let _user = {...user}
                                    _user.username = event.target.value;
                                    setUser(_user);
                                }}
                            />
                            {renderInputErrors(errors, 'username')}
                        </div>
                    </div>
                    <div className="form-group row mt-4">
                        <label className="col-sm-2 col-form-label">Password: </label>
                        <div className="col-sm-10">
                            <input
                                type="password"
                                value={user.password}
                                disabled={isLoading}
                                className={getInputClassName(errors, 'password')}
                                onChange={(event) => {
                                    let _user = {...user}
                                    _user.password = event.target.value;
                                    setUser(_user);
                                }}
                            />
                            {renderInputErrors(errors, 'password')}
                        </div>
                    </div>
                    <div className="form-group row mt-4">
                        <label className="col-sm-2 col-form-label">Confirm Password: </label>
                        <div className="col-sm-10">
                            <input
                                type="password"
                                value={user.confirmPw}
                                disabled={isLoading}
                                className={getInputClassName(errors, 'confirmPw')}
                                onChange={(event) => {
                                    let _user = {...user}
                                    _user.confirmPw = event.target.value;
                                    setUser(_user);
                                }}
                            />
                            {renderInputErrors(errors, 'confirmPw')}
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
                            addUser({...user}).then((payload) => {
                                let _modalDetails = { ...modalDetails};
                                _modalDetails.title = "Sign-in Success";
                                _modalDetails.body = "Success! You are now registered.";
                                setModalDetails(_modalDetails);
                                setIsOpenModal(true);
                            }).catch((payload) => {
                                console.log("Error: " + payload);
                                setErrors(payload.response.data);
                            }).finally(() => {
                                setIsLoading(false);
                            })
                        }}
                    >
                        { BTN_REGISTER }
                    </button>
                    <button 
                        disabled={isLoading}
                        className="btn btn-warning btn-margin"
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        { BTN_CANCEL }
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}