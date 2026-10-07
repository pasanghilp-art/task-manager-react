import { useState } from "react";
import api from "../../api";
import "./Input.css";

export function Input({ setTask, isGuest }) {
    const [text, setText] = useState("");
    const [priority, setPriority] = useState("high");

    const addBtn = () => {
        const trimed = text.trim();
        if (!trimed) return;

        if (isGuest) {
            setTask((current) => [
                ...current,
                {
                    _id: crypto.randomUUID(),
                    name: trimed,
                    priority,
                    done: false,
                },
            ]);
        } else {
            api.post("/tasks", { name: trimed, priority }).then((response) =>
                setTask((current) => [...current, response.data]),
            );
        }
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
                        High
                    </button>
                    <button
                        className={`pri-btn med ${priority === "med" ? "selected" : ""}`}
                        onClick={() => setPriority("med")}
                    >
                        Medium
                    </button>
                    <button
                        className={`pri-btn low ${priority === "low" ? "selected" : ""}`}
                        onClick={() => setPriority("low")}
                    >
                        Low
                    </button>
                </div>
            </div>
        </>
    );
}
