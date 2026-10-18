import { createContext, useState, useContext, useEffect } from "react";

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
    const [expenses, setExpenses] = useState(
        JSON.parse(localStorage.getItem("expenses") || "[]"),
    );

    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);

    const onAddExpense = (formData) => {
        const id = Date.now();
        const expensesWithId = { ...formData, id };
        setExpenses([...expenses, expensesWithId]);
    };

    const categoryTotals = expenses.reduce((acc, expense) => {
        acc[expense.category] =
            (acc[expense.category] || 0) + Number(expense.amount);
        return acc;
    }, {});

    return (
        <ExpenseContext.Provider
            value={{ expenses, setExpenses, onAddExpense, categoryTotals }}
        >
            {children}
        </ExpenseContext.Provider>
    );
}

export function useExpenses() {
    return useContext(ExpenseContext);
}
