import { useState } from "react";
import { useExpenses } from "../Content/ExpenseContext";
import {
    CATEGORY_SUGGESTIONS,
    formatCategory,
    todayLocal,
} from "../Content/expenseUtils";
import "./ExpenseForm.css";

const emptyForm = () => ({
    amount: "",
    category: "",
    date: todayLocal(),
    note: "",
});

export function ExpenseForm() {
    const { onAddExpense, categoryTotals } = useExpenses();
    const [formData, setFormData] = useState(emptyForm);

    const saveFormData = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!(Number(formData.amount) > 0)) return;
        onAddExpense(formData);
        setFormData(emptyForm());
    };

    const suggestions = [
        ...new Set([...Object.keys(categoryTotals), ...CATEGORY_SUGGESTIONS]),
    ];

    return (
        <form className="exp-card exp-form" onSubmit={handleSubmit}>
            <h2 className="exp-card-title">Add expense</h2>

            <div className="exp-form-grid">
                <div className="exp-field">
                    <label htmlFor="exp-amount">Amount</label>
                    <input
                        id="exp-amount"
                        name="amount"
                        type="number"
                        min="0.01"
                        step="any"
                        placeholder="0"
                        value={formData.amount}
                        onChange={saveFormData}
                        required
                    />
                </div>

                <div className="exp-field">
                    <label htmlFor="exp-category">Category</label>
                    <input
                        id="exp-category"
                        name="category"
                        list="exp-category-options"
                        placeholder="e.g. Food"
                        autoComplete="off"
                        value={formData.category}
                        onChange={saveFormData}
                    />
                    <datalist id="exp-category-options">
                        {suggestions.map((c) => (
                            <option key={c} value={formatCategory(c)} />
                        ))}
                    </datalist>
                </div>

                <div className="exp-field">
                    <label htmlFor="exp-date">Date</label>
                    <input
                        id="exp-date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={saveFormData}
                    />
                </div>

                <div className="exp-field">
                    <label htmlFor="exp-note">Note</label>
                    <input
                        id="exp-note"
                        name="note"
                        placeholder="Optional"
                        maxLength="80"
                        autoComplete="off"
                        value={formData.note}
                        onChange={saveFormData}
                    />
                </div>
            </div>

            <button type="submit" className="exp-save">
                Save expense
            </button>
        </form>
    );
}
