import "./BottomRow.css";

export function BottomRow({ task, setTask }) {
    const updated = task.filter((taskInput) => !taskInput.done);
    const deleteCompleted = () => {
        setTask(updated);
    };
    return (
        <>
            <div className="bottom-row">
                <span className="task-count" id="taskCount">
                    {updated.length === 0
                        ? "All Done!"
                        : `${updated.length} task remaining`}
                </span>
                <button
                    className="clear-btn"
                    id="clearBtn"
                    onClick={deleteCompleted}
                >
                    🗑 Clear completed
                </button>
            </div>
        </>
    );
}
