import { useState, useEffect } from "react";
import { ExpenseContext } from "./ExpenseContext";
import { normalizeCategory } from "./expenseUtils";

export function ExpenseProvider({ children }) {
    const [expenses, setExpenses] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("expenses")) || [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);

    const onAddExpense = (formData) => {
        const expense = {
            ...formData,
            amount: Number(formData.amount),
            category: normalizeCategory(formData.category),
            id: Date.now(),
        };
        setExpenses((current) => [...current, expense]);
    };

    const onDeleteExpense = (id) => {
        setExpenses((current) => current.filter((e) => e.id !== id));
    };

    const total = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

    const categoryTotals = expenses.reduce((acc, e) => {
        const key = normalizeCategory(e.category);
        acc[key] = (acc[key] || 0) + (Number(e.amount) || 0);
        return acc;
    }, {});

    return (
        <ExpenseContext.Provider
            value={{
                expenses,
                setExpenses,
                onAddExpense,
                onDeleteExpense,
                total,
                categoryTotals,
            }}
        >
            {children}
        </ExpenseContext.Provider>
    );
}
