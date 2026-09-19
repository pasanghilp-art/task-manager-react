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
                <span className="empty-icon">📝</span>
                <p>No tasks yet</p>
            </div>
        );
    }

    const toggleDone = (id) => {
        const updated = task.map((t) =>
            t._id === id ? { ...t, done: !t.done } : t,
        );
        setTask(updated);
    };

    const deleteTask = (id) => {
        axios
            .delete(
                ` https://task-manager-backend-ctw2.onrender.com/tasks/${id}`,
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
                            <span className="task-text">{taskItem.text}</span>
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
