import "./BottomRow.css";
import api from "../../api";

export function BottomRow({ task, setTask, isGuest }) {
    const updated = task.filter((taskInput) => !taskInput.done);

    const deleteCompleted = () => {
        if (isGuest) {
            setTask((current) => current.filter((t) => !t.done));
            return;
        }
        const completedTasks = task.filter((t) => t.done);
        Promise.all(
            completedTasks.map((t) => api.delete(`/tasks/${t._id}`)),
        ).then(() => {
            setTask(task.filter((t) => !t.done));
        });
    };

    return (
        <>
            <div className="bottom-row">
                <span className="task-count" id="taskCount">
                    {updated.length === 0
                        ? "All done"
                        : `${updated.length} ${updated.length === 1 ? "task" : "tasks"} remaining`}
                </span>
                <button
                    className="clear-btn"
                    id="clearBtn"
                    onClick={deleteCompleted}
                >
                    Clear completed
                </button>
            </div>
        </>
    );
}
