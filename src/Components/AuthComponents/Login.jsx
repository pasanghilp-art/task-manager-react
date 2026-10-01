import { useNavigate, Link } from "react-router-dom";
import { useAuthForm } from "./useAuthForm";
import axios from "axios";
import "./Auth.css";

export function Login() {
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
                "https://task-manager-backend-ctw2.onrender.com/api/login",
                { email, password },
                { withCredentials: true },
            );

            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Could not reach server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrap">
            <div className="auth-card">
                <h2 className="auth-title">Welcome back</h2>
                <p className="auth-sub">Log in to see your tasks.</p>

                {error && <p className="auth-error">{error}</p>}

                <form onSubmit={handleSubmit}>
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
                            placeholder="Your password"
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
                        {loading ? "Logging in..." : "Log in"}
                    </button>
                </form>

                <p className="auth-switch">
                    No account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}
