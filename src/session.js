export function getSession() {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
        const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        const payload = JSON.parse(atob(base64));
        if (payload.exp * 1000 <= Date.now()) return null;
        return { isGuest: !!payload.guest, exp: payload.exp * 1000 };
    } catch {
        return null;
    }
}