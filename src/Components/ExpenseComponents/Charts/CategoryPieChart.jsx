import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import { useExpenses } from "../Content/ExpenseContext";
import { ChartTooltip } from "./ChartTooltip";
import { formatMoney, getCategoryData } from "../Content/expenseUtils";
import "./Charts.css";

export function CategoryPieChart() {
    const { total, categoryTotals } = useExpenses();
    const data = getCategoryData(categoryTotals);

    return (
        <section className="exp-card">
            <h2 className="exp-card-title">Spending by category</h2>

            {data.length === 0 ? (
                <p className="exp-empty">
                    Add an expense to see the breakdown.
                </p>
            ) : (
                <>
                    <div className="donut">
                        <ResponsiveContainer width="100%" height={220}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    dataKey="total"
                                    nameKey="name"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={2}
                                    stroke="none"
                                />
                                <Tooltip
                                    content={<ChartTooltip />}
                                    wrapperStyle={{ outline: "none" }}
                                />
                            </PieChart>
                        </ResponsiveContainer>

                        <div className="donut-center">
                            <span className="donut-total">
                                {formatMoney(total)}
                            </span>
                            <span className="donut-label">Total</span>
                        </div>
                    </div>

                    <ul className="legend">
                        {data.map((item) => (
                            <li key={item.key} className="legend-row">
                                <span
                                    className="legend-dot"
                                    style={{ background: item.fill }}
                                />
                                <span className="legend-name">{item.name}</span>
                                <span className="legend-value">
                                    {formatMoney(item.total)}
                                </span>
                                <span className="legend-pct">
                                    {Math.round((item.total / total) * 100)}%
                                </span>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </section>
    );
}
