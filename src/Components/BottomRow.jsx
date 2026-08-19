import "./BottomRow.css";

export function BottomRow() {
    return (
        <>
            <div className="bottom-row">
                <span className="task-count" id="taskCount"></span>
                <button className="clear-btn" id="clearBtn">
                    🗑 Clear completed
                </button>
            </div>
        </>
    );
}
