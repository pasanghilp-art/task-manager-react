import { useExpenses } from "../Content/ExpenseContext";
import { ExpenseItem } from "./items/ExpenseItem";

export function ExpenseList() {
    const { expenses } = useExpenses();

    // newest first
    const sorted = [...expenses].sort(
        (a, b) => (b.date || "").localeCompare(a.date || "") || b.id - a.id,
    );

    return (
        <section className="exp-card">
            <h2 className="exp-card-title">Recent expenses</h2>

            {sorted.length === 0 ? (
                <p className="exp-empty">
                    No expenses yet. Add your first one above.
                </p>
            ) : (
                <ul className="exp-rows">
                    {sorted.map((expense) => (
                        <ExpenseItem key={expense.id} expense={expense} />
                    ))}
                </ul>
            )}
        </section>
    );
}
