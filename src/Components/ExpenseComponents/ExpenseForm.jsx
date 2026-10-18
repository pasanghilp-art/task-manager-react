import { useState } from "react";
import "./ExpenseForm.css";
import { useExpenses } from "./ExpenseContent";

export function ExpenseForm() {
    const { onAddExpense } = useExpenses();
    const [formData, setFormData] = useState({
        amount: "",
        category: "",
        date: "",
        note: "",
    });

    const SaveFormData = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddExpense(formData);
        setFormData({
            amount: "",
            category: "",
            date: "",
            note: "",
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        value={formData.amount}
                        onChange={SaveFormData}
                        name="amount"
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <input
                        value={formData.category}
                        onChange={SaveFormData}
                        name="category"
                    />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={SaveFormData}
                        name="date"
                    />
                </div>
                <div className="form-group">
                    <label>Note</label>
                    <input
                        value={formData.note}
                        onChange={SaveFormData}
                        name="note"
                    />
                </div>
                <button type="submit" className="save-btn">
                    Save
                </button>
            </form>
        </>
    );
}
