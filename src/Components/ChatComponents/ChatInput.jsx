import "./ChatInput.css";

export function ChatInput({ input, setInput, onSend, disabled, loading }) {
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="chat-inputbar">
            <textarea
                className="chat-input"
                rows={1}
                placeholder={disabled ? "Log in to chat" : "Type a message..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                autoComplete="off"
            />
            <button
                className="chat-send"
                onClick={onSend}
                disabled={disabled || loading || !input.trim()}
            >
                Send
            </button>
        </div>
    );
}
