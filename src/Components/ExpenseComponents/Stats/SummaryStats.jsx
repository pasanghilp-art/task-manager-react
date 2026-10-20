import { useExpenses } from "../Content/ExpenseContext";
import { formatMoney, getCategoryData } from "../Content/expenseUtils";
import "./SummaryStats.css";

export function SummaryStats() {
    const { expenses, total, categoryTotals } = useExpenses();
    const categories = getCategoryData(categoryTotals);
    const top = categories[0];

    const stats = [
        { label: "Total spent", value: formatMoney(total), accent: true },
        { label: "Entries", value: expenses.length },
        { label: "Categories", value: categories.length },
        { label: "Top category", value: top ? top.name : "—" },
    ];

    return (
        <div className="exp-stats">
            {stats.map((s) => (
                <div key={s.label} className="exp-stat">
                    <span
                        className={`exp-stat-num${s.accent ? " is-accent" : ""}`}
                        title={String(s.value)}
                    >
                        {s.value}
                    </span>
                    <span className="exp-stat-label">{s.label}</span>
                </div>
            ))}
        </div>
    );
}
