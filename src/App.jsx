import { useState, useEffect } from "react";
import { HomePage } from "./Pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage";
import { RegisterPage } from "./Pages/RegisterPage";
import { RequireAuth } from "./Pages/RequireAuth";
import { getSession } from "./session";
import api from "./api";
import "./App.css";

function HomeRoute() {
    const [task, setTask] = useState([]);
    const [filterPriority, setFilterPriority] = useState("all");
    const isGuest = !!getSession()?.isGuest;

    useEffect(() => {
        if (isGuest) return;
        api.get("/tasks")
            .then((response) => setTask(response.data))
            .catch(() => {});
    }, [isGuest]);

    return (
        <HomePage
            task={task}
            setTask={setTask}
            filterPriority={filterPriority}
            setFilterPriority={setFilterPriority}
            isGuest={isGuest}
        />
    );
}

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <RequireAuth>
                                <HomeRoute />
                            </RequireAuth>
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
