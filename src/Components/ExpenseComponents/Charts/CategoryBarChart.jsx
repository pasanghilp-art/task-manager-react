import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useExpenses } from "../Content/ExpenseContext";
import { ChartTooltip } from "./ChartTooltip";
import { formatMoney, getCategoryData } from "../Content/expenseUtils";
import "./Charts.css";

export function CategoryBarChart() {
    const { categoryTotals } = useExpenses();
    const data = getCategoryData(categoryTotals);

    return (
        <section className="exp-card">
            <h2 className="exp-card-title">Category totals</h2>

            {data.length === 0 ? (
                <p className="exp-empty">Nothing to compare yet.</p>
            ) : (
                <ResponsiveContainer width="100%" height={240}>
                    <BarChart
                        data={data}
                        margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
                    >
                        <CartesianGrid vertical={false} stroke="#e6e9f4" />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: "#6b7391", fontSize: 12 }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: "#a3a9c2", fontSize: 12 }}
                            tickFormatter={formatMoney}
                        />
                        <Tooltip
                            cursor={{ fill: "rgba(84, 104, 255, 0.06)" }}
                            content={<ChartTooltip />}
                            wrapperStyle={{ outline: "none" }}
                        />
                        <Bar
                            dataKey="total"
                            radius={[8, 8, 0, 0]}
                            maxBarSize={48}
                        />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </section>
    );
}
