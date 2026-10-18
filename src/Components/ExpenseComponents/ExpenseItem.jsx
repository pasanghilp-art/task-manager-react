import "./ExpenseItem.css";

export function ExpenseItem({ expense, expenses, setExpenses }) {
    const DeleteBtn = (id) => {
        const Delete = expenses.filter((expenseItem) => expenseItem.id !== id);
        setExpenses(Delete);
    };

    return (
        <div className="expense-item">
            <div className="expense-item-details">
                <span className="expense-item-amount">{expense.amount}</span>
                <span className="expense-item-date">{expense.date}</span>
                <span className="expense-item-note">{expense.note}</span>
            </div>
            <div className="expense-item-actions">
                <span className="expense-item-category">
                    {expense.category}
                </span>
                <button
                    className="delete-btn"
                    onClick={() => DeleteBtn(expense.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
