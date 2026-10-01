import { useState } from "react";
import { useAuthForm } from "./useAuthForm";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

export function Register() {
    const [name, setName] = useState("");
    const {
        email,
        setEmail,
        password,
        setPassword,
        error,
        setError,
        loading,
        setLoading,
    } = useAuthForm();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await axios.post(
                "https://task-manager-backend-ctw2.onrender.com/api/register",
                { name, email, password },
            );

            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Could not reach server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrap">
            <div className="auth-card">
                <h2 className="auth-title">Create your account</h2>
                <p className="auth-sub">
                    Start tracking your tasks in seconds.
                </p>

                {error && <p className="auth-error">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="auth-field">
                        <label className="auth-label" htmlFor="name">
                            Name
                        </label>
                        <input
                            id="name"
                            className="auth-input"
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label className="auth-label" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            className="auth-input"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label className="auth-label" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            className="auth-input"
                            type="password"
                            placeholder="At least 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className="auth-submit"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Create account"}
                    </button>
                </form>

                <p className="auth-switch">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
}
