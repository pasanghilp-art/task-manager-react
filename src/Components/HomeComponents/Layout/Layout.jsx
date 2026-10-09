import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar/SideBar";
import "./Layout.css";

export function Layout() {
    const [collapsed, setCollapsed] = useState(
        () => localStorage.getItem("sidebarCollapsed") === "true",
    );
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem("sidebarCollapsed", String(collapsed));
    }, [collapsed]);

    return (
        <div className={`layout${collapsed ? " is-collapsed" : ""}`}>
            <button
                className="layout-menu-btn"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    aria-hidden="true"
                >
                    <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {mobileOpen && (
                <div
                    className="layout-backdrop"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            <Sidebar
                collapsed={collapsed}
                onToggle={() => setCollapsed((c) => !c)}
                mobileOpen={mobileOpen}
                onNavigate={() => setMobileOpen(false)}
            />

            <main className="layout-main">
                <div className="layout-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
