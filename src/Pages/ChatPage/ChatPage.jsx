import { useState } from "react";
import { getSession } from "../../session";
import { ChatHeader } from "../../Components/ChatComponents/ChatHeader";
import { MessageList } from "../../Components/ChatComponents/MessageList";
import { ChatInput } from "../../Components/ChatComponents/ChatInput";
import "../Components/ChatComponents/ChatPage.css";

// Temporary fake reply. Next step this becomes a call to our backend.
function getReply() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("This is a fake reply for now."), 800);
    });
}

export function ChatPage() {
    const isGuest = !!getSession()?.isGuest;
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "Hi! Ask me anything about your tasks or expenses.",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        const text = input.trim();
        if (!text || loading || isGuest) return;

        const next = [...messages, { role: "user", content: text }];
        setMessages(next);
        setInput("");
        setLoading(true);

        try {
            const reply = await getReply(next);
            setMessages([...next, { role: "assistant", content: reply }]);
        } catch {
            setMessages([
                ...next,
                {
                    role: "assistant",
                    content: "Something went wrong. Try again.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-page">
            <ChatHeader />

            {isGuest && (
                <p className="guest-banner">
                    Guest mode: log in with an account to use the AI assistant.
                </p>
            )}

            <div className="chat-box">
                <MessageList messages={messages} loading={loading} />
                <ChatInput
                    input={input}
                    setInput={setInput}
                    onSend={handleSend}
                    disabled={isGuest}
                    loading={loading}
                />
            </div>
        </div>
    );
}
