import { useState } from "react";
import axios from "axios";
import "./Input.css";

export function Input({ task, setTask }) {
    const [text, setText] = useState("");
    const [priority, setPriority] = useState("high");

    const addBtn = () => {
        const trimed = text.trim();
        if (!trimed) return;
        axios
            .post(" https://task-manager-backend-ctw2.onrender.com/tasks", {
                text: trimed,
                priority,
            })
            .then((response) => setTask([...task, response.data]));
        setText("");
    };

    function saveText(event) {
        setText(event.target.value);
    }

    function KeyPressedEvent(event) {
        if (event.key === "Enter") {
            addBtn();
        }
    }
    return (
        <>
            <div className="input-card">
                <div className="input-row">
                    <input
                        className="task-input"
                        id="taskInput"
                        type="text"
                        placeholder="Add a new task..."
                        maxLength="80"
                        autoComplete="off"
                        value={text}
                        onChange={saveText}
                        onKeyDown={KeyPressedEvent}
                    />
                    <button className="add-btn" onClick={addBtn}>
                        + Add
                    </button>
                </div>
                <div className="priority-row">
                    <span className="priority-label">Priority:</span>
                    <button
                        className={`pri-btn high ${priority === "high" ? "selected" : ""}`}
                        onClick={() => setPriority("high")}
                    >
                        🔴 High
                    </button>
                    <button
                        className={`pri-btn med ${priority === "med" ? "selected" : ""}`}
                        onClick={() => setPriority("med")}
                    >
                        🟡 Medium
                    </button>
                    <button
                        className={`pri-btn low ${priority === "low" ? "selected" : ""}`}
                        onClick={() => setPriority("low")}
                    >
                        🟢 Low
                    </button>
                </div>
            </div>
        </>
    );
}
