import { useState, useEffect } from "react";
import { HomePage } from "./Pages/HomePage/HomePage";
import { ExpensesPage } from "./Pages/ExpensePage/ExpensesPage";
import { ChatPage } from "./Pages/ChatPage/ChatPage";
import { Layout } from "./Components/HomeComponents/Layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./Pages/SignupPage/LoginPage";
import { RegisterPage } from "./Pages/SignupPage/RegisterPage";
import { RequireAuth } from "./Components/AuthComponents/RequireAuth";
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
                    <Route path="/ai" element={<ChatPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
