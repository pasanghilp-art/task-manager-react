import { useState, useEffect } from "react";
import { HomePage } from "./Pages/HomePage";
import "./App.css";

function App() {
    const [task, setTask] = useState(
        JSON.parse(localStorage.getITem("list") || []),
    );
    useEffect(() => {
        localStorage.setITem("list", JSON.stringify(task));
    }, [task]);
    return (
        <>
            <HomePage task={task} setTask={setTask} />
        </>
    );
}

export default App;
