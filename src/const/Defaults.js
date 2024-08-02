export const DEFAULT_ERROR = {
    code: "",
    message: ""
}

export const DEFAULT_USER = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPw: ""
}

export const TRANSACTION_TYPE = [{
    id: 1,
    name: "Expense"
},{
    id: 2,
    name: "Income"
}]

export const DEFAULT_TRANSACTION_TYPE = {
    id: 1,
    name: "Expense"
}

export const DEFAULT_CATEGORY = {
    transactionTypeId: "",
    userId: "",
    name: "",
    notes: ""
}

export const DEFAULT_TRANSACTION = {
    userId: "",
    transactionTypeId: "",
    categoryId: "",
    expenseDate: "",
    amount: "",
    note: "",
    file: "",
    isDeleted: ""
}

export const DEFAULT_MODAL = {
    title: "",
    body: ""
}
