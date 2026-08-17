import "./BottomRow.css";

export function BottomRow() {
    return (
        <>
            <div class="bottom-row">
                <span class="task-count" id="taskCount"></span>
                <button class="clear-btn" id="clearBtn">
                    🗑 Clear completed
                </button>
            </div>
        </>
    );
}
