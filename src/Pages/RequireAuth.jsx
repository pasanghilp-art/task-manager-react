import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getSession } from "../session";
import api from "../api";
import "../Components/AuthComponents/Auth.css";

export function RequireAuth({ children }) {
    const [status, setStatus] = useState(() =>
        getSession() ? "checking" : "denied",
    );

    useEffect(() => {
        const session = getSession();
        if (!session) return;

        const KickOut = () => {
            localStorage.removeItem("token");
            setStatus("denied");
        };
        api.get("/api/me")
            .then(() => setStatus("authed"))
            .catch(KickOut);

        const timer = setTimeout(KickOut, session.exp - Date.now());
        return () => clearTimeout(timer);
    }, []);

    if (status === "checking")
        return <p className="auth-loading">Loading...</p>;
    if (status === "denied") return <Navigate to="/login" />;
    return children;
}
