import "./Stats.css";

export function Stats({ task }) {
    const taskLength = task.length;
    const taskHigh = task.filter(
        (taskItem) => taskItem.priority === "high",
    ).length;
    const taskMed = task.filter(
        (taskItem) => taskItem.priority === "med",
    ).length;
    const tasklow = task.filter(
        (taskItem) => taskItem.priority === "low",
    ).length;
    const taskDone = task.filter((taskItem) => taskItem.done).length;
    return (
        <>
            <div className="stats">
                <div className="stat">
                    <span className="stat-num" id="stat-total">
                        {taskLength}
                    </span>
                    <span className="stat-label">Total</span>
                </div>
                <div className="stat high">
                    <span className="stat-num" id="stat-high">
                        {taskHigh}
                    </span>
                    <span className="stat-label">High</span>
                </div>
                <div className="stat med">
                    <span className="stat-num" id="stat-med">
                        {taskMed}
                    </span>
                    <span className="stat-label">Medium</span>
                </div>
                <div className="stat low">
                    <span className="stat-num" id="stat-low">
                        {tasklow}
                    </span>
                    <span className="stat-label">low</span>
                </div>
                <div className="stat done">
                    <span className="stat-num" id="stat-done">
                        {taskDone}
                    </span>
                    <span className="stat-label">Done</span>
                </div>
            </div>
        </>
    );
}
