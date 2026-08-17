export function Stats() {
    return (
        <>
            <div class="stats">
                <div class="stat">
                    <span class="stat-num" id="stat-total">
                        0
                    </span>
                    <span class="stat-label">Total</span>
                </div>
                <div class="stat high">
                    <span class="stat-num" id="stat-high">
                        0
                    </span>
                    <span class="stat-label">High</span>
                </div>
                <div class="stat med">
                    <span class="stat-num" id="stat-med">
                        0
                    </span>
                    <span class="stat-label">Medium</span>
                </div>
                <div class="stat done">
                    <span class="stat-num" id="stat-done">
                        0
                    </span>
                    <span class="stat-label">Done</span>
                </div>
            </div>
        </>
    );
}
