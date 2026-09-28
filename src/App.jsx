import { useState, useEffect } from "react";
import { HomePage } from "./Pages/HomePage";
import axios from "axios";
import "./App.css";

function App() {
    const [task, setTask] = useState([]);

    const [filterPriority, setFilterPriority] = useState("all");

    useEffect(() => {
        axios
            .get(" https://task-manager-backend-ctw2.onrender.com/tasks")
            .then((response) => setTask(response.data));
    }, []);
    return (
        <div className="app">
            <HomePage
                task={task}
                setTask={setTask}
                filterPriority={filterPriority}
                setFilterPriority={setFilterPriority}
            />
        </div>
    );
}

export default App;
