export function decodeToken(token) {
    try {
        const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
        const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
        return JSON.parse(new TextDecoder().decode(bytes));
    } catch {
        return null;
    }
}
 
export function getSession() {
    const token = localStorage.getItem("token");
    if (!token) return null;
 
    const payload = decodeToken(token);
    if (!payload || payload.exp * 1000 <= Date.now()) return null;
 
    return {
        isGuest: !!payload.guest,
        exp: payload.exp * 1000,
        id: payload.id,
        name: payload.name,
        email: payload.email,
    };
}