import "./Input.css";

export function Input() {
    return (
        <>
            <div class="input-card">
                <div class="input-row">
                    <input
                        class="task-input"
                        id="taskInput"
                        type="text"
                        placeholder="Add a new task..."
                        maxlength="80"
                        autocomplete="off"
                    />
                    <button class="add-btn" id="addBtn">
                        + Add
                    </button>
                </div>
                <div class="priority-row">
                    <span class="priority-label">Priority:</span>
                    <button class="pri-btn high selected" data-priority="high">
                        🔴 High
                    </button>
                    <button class="pri-btn med" data-priority="med">
                        🟡 Medium
                    </button>
                    <button class="pri-btn low" data-priority="low">
                        🟢 Low
                    </button>
                </div>
            </div>
        </>
    );
}
