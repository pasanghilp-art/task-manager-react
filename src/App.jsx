import { useState, useEffect } from "react";
import { HomePage } from "./Pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage";
import { RegisterPage } from "./Pages/RegisterPage";
import { RequireAuth } from "./Pages/RequireAuth";
import axios from "axios";
import "./App.css";

function App() {
    const [task, setTask] = useState([]);
    const [filterPriority, setFilterPriority] = useState("all");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios
            .get("https://task-manager-backend-ctw2.onrender.com/tasks", {
                withCredentials: true,
                validateStatus: function (httpStatus) {
                    return httpStatus === 200 || httpStatus === 401;
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setTask(response.data);
                }
            });
    }, []);
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <RequireAuth>
                                <HomePage
                                    task={task}
                                    setTask={setTask}
                                    filterPriority={filterPriority}
                                    setFilterPriority={setFilterPriority}
                                />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <LoginPage
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                error={error}
                                setError={setError}
                                loading={loading}
                                setLoading={setLoading}
                            />
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <RegisterPage
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                error={error}
                                setError={setError}
                                loading={loading}
                                setLoading={setLoading}
                            />
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
