import "./TaskList.css";

export function TaskList({ task, setTask }) {
    if (task.length === 0) {
        return (
            <div className="empty">
                <span className="empty-icon">📝</span>
                <p>No tasks yet</p>
            </div>
        );
    }

    function toggleDone(id) {
        const updated = task.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t,
        );
        setTask(updated);
    }

    function deleteTask(id) {
        const updated = task.filter((t) => t.id !== id);
        setTask(updated);
    }
    return (
        <>
            <div className="task-list" id="taskList">
                {task.map((taskItem) => {
                    return (
                        <div
                            key={taskItem.id}
                            className={`task-item ${taskItem.priority}`}
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
