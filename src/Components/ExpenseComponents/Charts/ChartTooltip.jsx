import { formatMoney } from "../Content/expenseUtils";

export function ChartTooltip({ active, payload }) {
    if (!active || !payload?.length) return null;
    const item = payload[0].payload;

    return (
        <div className="chart-tip">
            <span className="chart-tip-dot" style={{ background: item.fill }} />
            <span>{item.name}</span>
            <strong>{formatMoney(item.total)}</strong>
        </div>
    );
}
