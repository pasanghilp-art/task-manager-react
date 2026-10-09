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

const CheckIcon = () => (
    <Icon>
        <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Icon>
);
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
const ChevronLeftIcon = () => (
    <Icon>
        <path d="m15 18-6-6 6-6" />
    </Icon>
);
const LogoutIcon = () => (
    <Icon>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <path d="m16 17 5-5-5-5" />
        <path d="M21 12H9" />
    </Icon>
);

export function Sidebar({ collapsed, onToggle, mobileOpen, onNavigate }) {
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
            <button
                className="sidebar-toggle"
                onClick={onToggle}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                <ChevronLeftIcon />
            </button>

            <div className="sidebar-brand">
                <span className="sidebar-logo">
                    <CheckIcon />
                </span>
                <span className="sidebar-brand-text">Workspace</span>
            </div>

            <p className="sidebar-label">Main</p>
            <nav className="sidebar-nav">
                <NavLink
                    to="/"
                    end
                    className="sidebar-link"
                    title="Tasks"
                    onClick={onNavigate}
                >
                    <TasksIcon />
                    <span className="sidebar-link-text">Tasks</span>
                </NavLink>
                <NavLink
                    to="/expenses"
                    className="sidebar-link"
                    title="Expenses"
                    onClick={onNavigate}
                >
                    <ExpensesIcon />
                    <span className="sidebar-link-text">Expenses</span>
                </NavLink>
            </nav>

            <div className="sidebar-account">
                <div className="account-card">
                    <span className="avatar">
                        {name.charAt(0).toUpperCase()}
                    </span>
                    <span className="account-info">
                        <span className="account-name">{name}</span>
                        <span className="account-email">
                            {isGuest ? "Guest session" : session?.email}
                        </span>
                    </span>
                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                    title={logoutLabel}
                >
                    <LogoutIcon />
                    <span className="logout-text">{logoutLabel}</span>
                </button>
            </div>
        </aside>
    );
}
