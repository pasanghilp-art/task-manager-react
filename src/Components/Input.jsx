import { useState } from "react";
import "./Input.css";

export function Input([task, setTask]) {
    const [text, setText] = useState("");
    const addBtn = () => {
        /*
        if (!text) {
            taskInput.focus();
            taskInput.style.borderColor = "#ff6b6b";
            setTimeout(() => (taskInput.style.borderColor = ""), 800);
            return;
        }

        tasks.unshift({
            id: nextId++,
            text: text,
            priority: selectedPriority,
            done: false,
            created: Date.now(),
        });

        taskInput.value = "";
        taskInput.focus();

        // Reset filter to show all so user sees new task
        currentFilter = "all";
        document.querySelectorAll(".filter-btn").forEach((b, i) => {
            b.classList.toggle("active", i === 0);
        });

        save();
        render();
    };

    addBtn.addEventListener("click", addTask);

    // Enter key to add
    taskInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addTask();
    });

    // ── Toggle done ──
    function toggleDone(id) {
        const task = tasks.find((t) => t.id === id);
        if (task) task.done = !task.done;
        save();
        render();
    }
    */
        const newTask = [
            ...task,
            {
                id: nextId++,
                text: text,
                priority: selectedPriority,
                done: false,
                created: Date.now(),
            },
        ];
    };

    function saveText(event) {
        setText(event.target.value);
    }
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
                        value={text}
                        onChange={saveText}
                    />
                    <button class="add-btn" onClick={addBtn}>
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
