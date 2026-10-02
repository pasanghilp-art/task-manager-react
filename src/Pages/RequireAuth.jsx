import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../api";
import "../Components/AuthComponents/Auth.css";

export function RequireAuth({ children }) {
    const [status, setStatus] = useState(() =>
        localStorage.getItem("token") ? "checking" : "guest",
    );

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
        api.get("/api/me")
            .then(() => setStatus("authed"))
            .catch(() => setStatus("guest"));
    }, []);

    if (status === "checking")
        return <p className="auth-loading">Loading...</p>;
    if (status === "guest") return <Navigate to="/login" />;
    return children;
}
