import "./BottomRow.css";
import axios from "axios";

export function BottomRow({ task, setTask }) {
    const updated = task.filter((taskInput) => !taskInput.done);
    const deleteCompleted = () => {
        const completedTasks = task.filter((t) => t.done);
        Promise.all(
            completedTasks.map((t) =>
                axios.delete(`http://localhost:3000/tasks/${t.id}`),
            ),
        ).then(() => {
            setTask(task.filter((t) => !t.done));
        });
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
