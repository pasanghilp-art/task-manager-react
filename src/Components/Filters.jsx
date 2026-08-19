import "./Filter.css";

export function Filters() {
    return (
        <>
            <div className="filter-row">
                <button className="filter-btn active" data-filter="all">
                    All
                </button>
                <button className="filter-btn" data-filter="high">
                    🔴 High
                </button>
                <button className="filter-btn" data-filter="med">
                    🟡 Medium
                </button>
                <button className="filter-btn" data-filter="low">
                    🟢 Low
                </button>
                <button className="filter-btn" data-filter="done">
                    ✅ Done
                </button>
            </div>
        </>
    );
}
