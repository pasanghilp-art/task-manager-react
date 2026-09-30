import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export function RequireAuth({ children }) {
    const [status, setStatus] = useState("checking");

    useEffect(() => {
        axios
            .get("https://task-manager-backend-ctw2.onrender.com/api/me", {
                withCredentials: true,
            })
            .then(() => setStatus("authed"))
            .catch(() => setStatus("guest"));
    }, []);

    if (status === "checking") return <p>loading...</p>;
    if (status === "guest") return <Navigate to="/login" />;
    return children;
}
