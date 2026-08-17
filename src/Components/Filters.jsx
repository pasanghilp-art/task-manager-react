import "./Filter.css";

export function Filters() {
    return (
        <>
            <div class="filter-row">
                <button class="filter-btn active" data-filter="all">
                    All
                </button>
                <button class="filter-btn" data-filter="high">
                    🔴 High
                </button>
                <button class="filter-btn" data-filter="med">
                    🟡 Medium
                </button>
                <button class="filter-btn" data-filter="low">
                    🟢 Low
                </button>
                <button class="filter-btn" data-filter="done">
                    ✅ Done
                </button>
            </div>
        </>
    );
}
