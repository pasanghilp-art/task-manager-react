import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./Auth.css";

export function GuestButton() {
    const navigate = useNavigate();

    const handleGuest = async () => {
        try {
            const res = await api.post("/api/guest");
            localStorage.setItem("token", res.data.token);
            navigate("/");
        } catch {
            alert("Could not start guest session");
        }
    };

    return (
        <button type="button" className="auth-guest" onClick={handleGuest}>
            Guest
        </button>
    );
}
