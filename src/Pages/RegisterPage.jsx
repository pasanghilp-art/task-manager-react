import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await axios.post(
                "https://task-manager-backend-ctw2.onrender.com/api/register",
                { name, email, password },
            );

            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Could not reach server");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button type="submit">Register</button>

            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </form>
    );
}
