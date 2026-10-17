import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getSession } from "../../../session";
import "./Sidebar.css";

function Icon({ children }) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {children}
        </svg>
    );
}

const TasksIcon = () => (
    <Icon>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <path d="m8.5 12.5 2.5 2.5 4.5-5" />
    </Icon>
);
const ExpensesIcon = () => (
    <Icon>
        <rect x="3" y="6" width="18" height="13" rx="3" />
        <path d="M3 10h18" />
        <path d="M16 15h2" />
    </Icon>
);

const LogoutIcon = () => (
    <Icon>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <path d="m16 17 5-5-5-5" />
        <path d="M21 12H9" />
    </Icon>
);

export function Sidebar({ collapsed, mobileOpen, onNavigate, resizerProps }) {
    const navigate = useNavigate();
    const [session] = useState(getSession); // { isGuest, name, email, ... }

    const isGuest = !!session?.isGuest;
    const name = session?.name ?? "Account";
    const logoutLabel = isGuest ? "End guest session" : "Log out";

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
    };

    return (
        <aside
            className={`sidebar${collapsed ? " is-collapsed" : ""}${mobileOpen ? " is-open" : ""}`}
        >
            <div
                className="sidebar-resizer"
                role="separator"
                aria-orientation="vertical"
                aria-label="Resize sidebar"
                title="Drag to resize · Click to collapse (Ctrl+B)"
                {...resizerProps}
            />

            <nav className="sidebar-nav">
                <NavLink
                    to="/"
                    end
                    className="sidebar-link"
                    data-tip="Tasks"
                    onClick={onNavigate}
                >
                    <TasksIcon />
                    <span className="sb-text">Tasks</span>
                </NavLink>
                <NavLink
                    to="/expenses"
                    className="sidebar-link"
                    data-tip="Expenses"
                    onClick={onNavigate}
                >
                    <ExpensesIcon />
                    <span className="sb-text">Expenses</span>
                </NavLink>
            </nav>

            <div className="sidebar-bottom">
                <button
                    className="sidebar-link"
                    data-tip={logoutLabel}
                    onClick={handleLogout}
                >
                    <LogoutIcon />
                    <span className="sb-text">{logoutLabel}</span>
                </button>

                <div className="sidebar-divider" />

                <div className="account-card" data-tip={name}>
                    <span className="avatar">
                        {name.charAt(0).toUpperCase()}
                    </span>
                    <span className="sb-text account-info">
                        <span className="account-name">{name}</span>
                        <span className="account-email">
                            {isGuest ? "Guest session" : session?.email}
                        </span>
                    </span>
                </div>
            </div>
        </aside>
    );
}
