import { useExpenses } from "../../Content/ExpenseContext";
import {
    formatCategory,
    formatDate,
    formatMoney,
    normalizeCategory,
} from "../../Content/expenseUtils";
import "./ExpenseItem.css";

export function ExpenseItem({ expense }) {
    const { onDeleteExpense } = useExpenses();

    const category = formatCategory(normalizeCategory(expense.category));
    const details = [expense.note, formatDate(expense.date)]
        .filter(Boolean)
        .join(" · ");

    return (
        <li className="exp-row">
            <div className="exp-row-main">
                <span className="exp-amount">
                    {formatMoney(expense.amount)}
                </span>
                {details && <span className="exp-details">{details}</span>}
            </div>

            <span className="exp-pill">{category}</span>

            <button
                className="exp-del"
                onClick={() => onDeleteExpense(expense.id)}
                aria-label="Delete expense"
                title="Delete"
            >
                ✕
            </button>
        </li>
    );
}
