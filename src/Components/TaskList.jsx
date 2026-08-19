import "./TaskList.css";

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
            t.id === id ? { ...t, done: !t.done } : t,
        );
        setTask(updated);
    };

    const deleteTask = (id) => {
        const updated = task.filter((taskItem) => taskItem.id !== id);
        setTask(updated);
    };

    return (
        <>
            <div className="task-list" id="taskList">
                {filteredTask.map((taskItem) => {
                    return (
                        <div
                            key={taskItem.id}
                            className={`task-item ${taskItem.priority}${taskItem.done ? " done" : ""}`}
                        >
                            <input
                                type="checkbox"
                                checked={taskItem.done}
                                onChange={() => toggleDone(taskItem.id)}
                                className="check-btn"
                            />
                            <span className="task-text">{taskItem.text}</span>
                            <span className="pri-badge">
                                {taskItem.priority}
                            </span>
                            <button
                                className="del-btn"
                                onClick={() => deleteTask(taskItem.id)}
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
