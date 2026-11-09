import "./MessageList.css";

import { useEffect, useRef } from "react";

export function MessageList({ messages, loading }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    return (
        <div className="chat-messages">
            {messages.map((m, i) => (
                <div key={i} className={`chat-msg chat-msg-${m.role}`}>
                    {m.content}
                </div>
            ))}
            {loading && (
                <div className="chat-msg chat-msg-assistant">Thinking...</div>
            )}
            <div ref={bottomRef} />
        </div>
    );
}
