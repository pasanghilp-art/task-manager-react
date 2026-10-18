import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { useExpenses } from "./ExpenseContent";

export function CategoryPieChart() {
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
            <PieChart>
                <Pie
                    data={chartData}
                    dataKey="total"
                    nameKey="category"
                    outerRadius={100}
                    label
                />
                <Tooltip />
                <Legend />
            </PieChart>

            <BarChart width={400} height={300} data={chartData}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}
