import "./TaskList.css";
import api from "../../api";

export function TaskList({ task, setTask, filterPriority, isGuest }) {
    const filteredTask = task.filter((taskItem) => {
        if (filterPriority === "all") return true;
        if (filterPriority === "done") return taskItem.done;
        return taskItem.priority === filterPriority;
    });

    if (filteredTask.length === 0) {
        return (
            <div className="empty">
                <p className="empty-title">Nothing here yet</p>
                <p className="empty-hint">Add a task above to get started.</p>
            </div>
        );
    }

    const toggleDone = async (id) => {
        const taskToUpdate = task.find((t) => t._id === id);
        if (!taskToUpdate) return;

        const updatedDoneState = !taskToUpdate.done;

        setTask((currentTasks) =>
            currentTasks.map((t) =>
                t._id === id ? { ...t, done: updatedDoneState } : t,
            ),
        );

        if (isGuest) return;

        try {
            const response = await api.put(`/tasks/${id}`, {
                done: updatedDoneState,
            });

            setTask((currentTasks) =>
                currentTasks.map((t) => (t._id === id ? response.data : t)),
            );
        } catch (error) {
            setTask((currentTasks) =>
                currentTasks.map((t) =>
                    t._id === id ? { ...t, done: taskToUpdate.done } : t,
                ),
            );
            console.error("Failed to update task status:", error);
        }
    };

    const deleteTask = (id) => {
        const taskToDelete = task.find((t) => t._id === id);
        if (!taskToDelete || !taskToDelete.done) return; // unticked: do nothing

        if (isGuest) {
            setTask((currentTasks) => currentTasks.filter((t) => t._id !== id));
            return;
        }
        api.delete(`/tasks/${id}`).then(() => {
            setTask((currentTasks) =>
                currentTasks.filter((taskItem) => taskItem._id !== id),
            );
        });
    };

    return (
        <>
            <div className="task-list" id="taskList">
                {filteredTask.map((taskItem) => {
                    return (
                        <div
                            key={taskItem._id}
                            className={`task-item ${taskItem.priority}${taskItem.done ? " done" : ""}`}
                        >
                            <input
                                type="checkbox"
                                checked={taskItem.done}
                                onChange={() => toggleDone(taskItem._id)}
                                className="check-btn"
                            />
                            <span className="task-text">{taskItem.name}</span>
                            <span className="pri-badge">
                                {taskItem.priority}
                            </span>
                            <button
                                className="del-btn"
                                onClick={() => deleteTask(taskItem._id)}
                            >
                                ✕
                            </button>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
