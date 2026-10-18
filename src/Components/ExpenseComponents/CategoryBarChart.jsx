// CategoryBarChart.jsx
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useExpenses } from "./ExpenseContent";

export function CategoryBarChart() {
    const { categoryTotals } = useExpenses();
    const COLORS = ["#748ffc", "#ff6b6b", "#ffa94d", "#51cf66", "#c084fc"];

    const chartData = Object.entries(categoryTotals).map(
        ([category, total], index) => ({
            category,
            total,
            fill: COLORS[index % COLORS.length],
        }),
    );

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}
