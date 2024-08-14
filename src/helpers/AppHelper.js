import React from "react";
import {getToken} from "../service/AuthService";
import { getCategory } from "../service/CategoriesService";

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

export const compute = (transactions) => {
  let total = 0;
  transactions.forEach(t => {
      total += parseInt(t.amount);
  });
  return total;
}

export const formatDate = (date) => {
  return date.split("T")[0];
}

export const displayText = (data, name) => {
  let text = data.note;
  if (text == null || text == "") {
    text = name ? name : data.category.name
  }
  return text;
}
  