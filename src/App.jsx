import { useState, useEffect } from "react";
import { HomePage } from "./Pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage";
import { RegisterPage } from "./Pages/RegisterPage";
import axios from "axios";
import "./App.css";

function App() {
    const [task, setTask] = useState([]);

    const [filterPriority, setFilterPriority] = useState("all");

    useEffect(() => {
        axios
            .get("https://task-manager-backend-ctw2.onrender.com/tasks")
            .then((response) => setTask(response.data));
    }, []);
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <HomePage
                                task={task}
                                setTask={setTask}
                                filterPriority={filterPriority}
                                setFilterPriority={setFilterPriority}
                            />
                        }
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
