import "./Filter.css";

export function Filters({ filterPriority, setFilterPriority }) {
    const filterClicked = (priority) => {
        setFilterPriority(priority);
    };
    return (
        <>
            <div className="filter-row">
                <button
                    className={`filter-btn ${
                        filterPriority === "all" ? "active" : ""
                    }`}
                    data-filter="all"
                    onClick={() => filterClicked("all")}
                >
                    All
                </button>
                <button
                    className={`filter-btn ${
                        filterPriority === "high" ? "active" : ""
                    }`}
                    data-filter="high"
                    onClick={() => filterClicked("high")}
                >
                    🔴 High
                </button>
                <button
                    className={`filter-btn ${
                        filterPriority === "med" ? "active" : ""
                    }`}
                    data-filter="med"
                    onClick={() => filterClicked("med")}
                >
                    🟡 Medium
                </button>
                <button
                    className={`filter-btn ${
                        filterPriority === "low" ? "active" : ""
                    }`}
                    data-filter="low"
                    onClick={() => filterClicked("low")}
                >
                    🟢 Low
                </button>
                <button
                    className={`filter-btn ${
                        filterPriority === "done" ? "active" : ""
                    }`}
                    data-filter="done"
                    onClick={() => filterClicked("done")}
                >
                    ✅ Done
                </button>
            </div>
        </>
    );
}
