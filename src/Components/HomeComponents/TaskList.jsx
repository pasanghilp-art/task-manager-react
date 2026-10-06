import "./TaskList.css";
import axios from "axios";

export function TaskList({ task, setTask, filterPriority }) {
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

        try {
            const response = await axios.put(
                `https://task-manager-backend-ctw2.onrender.com/tasks/${id}`,
                { done: updatedDoneState },
            );

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
        axios
            .delete(
                `https://task-manager-backend-ctw2.onrender.com/tasks/${id}`,
            )
            .then(() => {
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
