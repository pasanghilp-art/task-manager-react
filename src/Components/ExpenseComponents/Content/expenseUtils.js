export const DEFAULT_CATEGORY = "uncategorized";
export const CATEGORY_SUGGESTIONS = [
    "food",
    "transport",
    "rent",
    "bills",
    "shopping",
    "health",
    "entertainment",
];

export const CHART_COLORS = [
    "#5468ff",
    "#7d8cff",
    "#a5b0ff",
    "#1a2238",
    "#6b7391",
    "#c9cee2",
];

export function normalizeCategory(category) {
    return (category || "").trim().toLowerCase() || DEFAULT_CATEGORY;
}

export function formatCategory(category) {
    return category.charAt(0).toUpperCase() + category.slice(1);
}

export function formatMoney(value) {
    return Number(value || 0).toLocaleString("en-US");
}


export function todayLocal() {
    return new Date().toLocaleDateString("en-CA");
}

export function formatDate(date) {
    if (!date) return "";
    const d = new Date(`${date}T00:00:00`);
    if (Number.isNaN(d.getTime())) return "";
    const sameYear = d.getFullYear() === new Date().getFullYear();
    return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        ...(sameYear ? {} : { year: "numeric" }),
    });
}

export function getCategoryData(categoryTotals) {
    return Object.entries(categoryTotals)
        .map(([key, total]) => ({ key, name: formatCategory(key), total }))
        .sort((a, b) => b.total - a.total)
        .map((item, i) => ({ ...item, fill: CHART_COLORS[i % CHART_COLORS.length] }));
}