import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import "./Layout.css";

const MIN = 200;
const MAX = 360;
const DEFAULT = 248;
const COLLAPSED = 72;
const SNAP = 140;

export function Layout() {
    const [width, setWidth] = useState(() => {
        const saved = Number(localStorage.getItem("sidebarWidth"));
        return saved >= MIN && saved <= MAX ? saved : DEFAULT;
    });
    const [collapsed, setCollapsed] = useState(
        () => localStorage.getItem("sidebarCollapsed") === "true",
    );
    const [resizing, setResizing] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const drag = useRef(null);

    useEffect(() => {
        localStorage.setItem("sidebarWidth", String(width));
    }, [width]);

    useEffect(() => {
        localStorage.setItem("sidebarCollapsed", String(collapsed));
    }, [collapsed]);

    useEffect(() => {
        const onKey = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
                e.preventDefault();
                setCollapsed((c) => !c);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const resizerProps = {
        onPointerDown: (e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            drag.current = {
                startX: e.clientX,
                startWidth: collapsed ? COLLAPSED : width,
                moved: false,
            };
            setResizing(true);
        },
        onPointerMove: (e) => {
            const d = drag.current;
            if (!d) return;

            const delta = e.clientX - d.startX;
            if (Math.abs(delta) > 3) d.moved = true;
            if (!d.moved) return;

            const raw = d.startWidth + delta;
            if (raw < SNAP) {
                setCollapsed(true);
            } else {
                setCollapsed(false);
                setWidth(Math.min(MAX, Math.max(MIN, raw)));
            }
        },
        onPointerUp: () => {
            const d = drag.current;
            drag.current = null;
            setResizing(false);
            if (d && !d.moved) setCollapsed((c) => !c);
        },
        onPointerCancel: () => {
            drag.current = null;
            setResizing(false);
        },
    };

    return (
        <div
            className={`layout${resizing ? " is-resizing" : ""}`}
            style={{ "--sidebar-w": `${collapsed ? COLLAPSED : width}px` }}
        >
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
                mobileOpen={mobileOpen}
                onNavigate={() => setMobileOpen(false)}
                resizerProps={resizerProps}
            />

            <main className="layout-main">
                <div className="layout-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
