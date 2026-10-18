import { ExpenseItem } from "./ExpenseItem";
import { useExpenses } from "./ExpenseContent";

export function ExpenseList() {
    const { expenses, setExpenses } = useExpenses();
    if (expenses.length === 0) {
        return <p>No expenses yet!</p>;
    }
    return (
        <div className="expense-list">
            {expenses.map((expense) => (
                <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    expenses={expenses}
                    setExpenses={setExpenses}
                />
            ))}
        </div>
    );
}
