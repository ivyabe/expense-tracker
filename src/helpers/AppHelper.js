import React from "react";
import {getToken} from "../service/AuthService";

export const hasFormError = (errors, key) => {
    return errors[key] && errors[key].length > 0;
}

export const getInputClassName = (errors, key) => {
    return `form-control ${hasFormError(errors, key) ? 'is-invalid' : ''}`;
}
  
export const renderInputErrors = (errors, key) => {
    if (hasFormError(errors, key)) {
      return (
        <div className="invalid-feedback">
          {errors[key].join(',')}
        </div>
      );
    } else {
      return (
        <div/>
      );
    }
  }

export const buildAuthorizedHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  }
}
  
  