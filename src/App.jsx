import { useState, useEffect } from "react";
import { HomePage } from "./Pages/HomePage";
import { ExpensesPage } from "./Pages/ExpensesPage";
import { Layout } from "./Components/HomeComponents/Layout/Layout";
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
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    element={
                        <RequireAuth>
                            <Layout />
                        </RequireAuth>
                    }
                >
                    <Route path="/" element={<HomeRoute />} />
                    <Route path="/expenses" element={<ExpensesPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
