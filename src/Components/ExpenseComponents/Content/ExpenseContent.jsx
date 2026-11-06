import { useState, useEffect } from "react";
import { ExpenseContext } from "./ExpenseContext";
import { normalizeCategory } from "./expenseUtils";
import { getSession } from "../../../session";
import api from "../../../api";

const toClient = (e) => ({
    id: e._id,
    amount: e.amount,
    category: e.category,
    date: e.date,
    note: e.note,
});

export function ExpenseProvider({ children }) {
    const [expenses, setExpenses] = useState([]);
    const isGuest = !!getSession()?.isGuest;

    useEffect(() => {
        if (isGuest) return;
        api.get("/expenses")
            .then((res) => setExpenses(res.data.map(toClient)))
            .catch(() => {});
    }, [isGuest]);

    const onAddExpense = async (formData) => {
        const data = {
            ...formData,
            amount: Number(formData.amount),
            category: normalizeCategory(formData.category),
        };

        if (isGuest) {
            setExpenses((current) => [...current, { ...data, id: Date.now() }]);
            return;
        }

        try {
            const res = await api.post("/expenses", data);
            setExpenses((current) => [...current, toClient(res.data)]);
        } catch (e) {
            console.log(e.message);
        }
    };

    const onDeleteExpense = async (id) => {
        if (isGuest) {
            setExpenses((current) => current.filter((e) => e.id !== id));
            return;
        }

        try {
            await api.delete(`/expenses/${id}`);
            setExpenses((current) => current.filter((e) => e.id !== id));
        } catch (e) {
            console.log(e.message);
        }
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
