import "./Stats.css";

export function Stats() {
    return (
        <>
            <div className="stats">
                <div className="stat">
                    <span className="stat-num" id="stat-total">
                        0
                    </span>
                    <span className="stat-label">Total</span>
                </div>
                <div className="stat high">
                    <span className="stat-num" id="stat-high">
                        0
                    </span>
                    <span className="stat-label">High</span>
                </div>
                <div className="stat med">
                    <span className="stat-num" id="stat-med">
                        0
                    </span>
                    <span className="stat-label">Medium</span>
                </div>
                <div className="stat done">
                    <span className="stat-num" id="stat-done">
                        0
                    </span>
                    <span className="stat-label">Done</span>
                </div>
            </div>
        </>
    );
}
