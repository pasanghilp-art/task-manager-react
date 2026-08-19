import { useState, useEffect } from "react";
import { HomePage } from "./Pages/HomePage";
import "./App.css";

function App() {
    const [task, setTask] = useState(
        JSON.parse(localStorage.getItem("list") || "[]"),
    );

    const [filterPriority, setFilterPriority] = useState("all");

    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(task));
    }, [task]);
    return (
        <>
            <HomePage
                task={task}
                setTask={setTask}
                filterPriority={filterPriority}
                setFilterPriority={setFilterPriority}
            />
        </>
    );
}

export default App;
