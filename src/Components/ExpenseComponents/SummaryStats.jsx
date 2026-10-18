import { useExpenses } from "./ExpenseContent";

export function SummaryStats() {
    const { expenses, categoryTotals } = useExpenses();
    const total = expenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0,
    );

    return (
        <div className="summary-stats">
            <span className="summary-total">Total: {total}</span>

            <div className="category-breakdown">
                {Object.entries(categoryTotals).map(([category, total]) => (
                    <p key={category}>
                        {category}: {total}
                    </p>
                ))}
            </div>
        </div>
    );
}
