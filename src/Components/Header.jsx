import "./Header.css";

export function Header() {
    return (
        <header className="app-header">
            <div className="header-left">
                <h1 className="app-title">My Tasks ✅</h1>
                <p className="app-sub">Have your task saved and done</p>
            </div>
            <a href="https://pasanghilp-art.github.io" className="back-link">
                ← Portfolio
            </a>
        </header>
    );
}
