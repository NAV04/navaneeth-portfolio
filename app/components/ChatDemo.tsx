"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatDemo() {
  const welcomeMessage =
    "Hi, I am Nav. Talk to me until Navaneeth is available. I can help with projects, experience, research, certifications, and skills.";

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [introText, setIntroText] = useState("");
  const [introTyping, setIntroTyping] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const introStartedRef = useRef(false);

  useEffect(() => {
    if (!open) return;
    const container = messagesRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chat, loading, open]);

  useEffect(() => {
    if (!open || introDone || introStartedRef.current) return;
    introStartedRef.current = true;

    setIntroTyping(true);
    setIntroText("");

    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setIntroText(welcomeMessage.slice(0, index));

      if (index >= welcomeMessage.length) {
        clearInterval(interval);
        setIntroTyping(false);
        setIntroDone(true);
        setChat((prev) => [{ role: "assistant", content: welcomeMessage }, ...prev]);
      }
    }, 18);

    return () => {
      clearInterval(interval);
    };
  }, [open, introDone, welcomeMessage]);

  const sendMessage = async () => {
    const text = message.trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = { role: "user", content: text };
    setChat((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      const botMessage: ChatMessage = {
        role: "assistant",
        content:
          data?.reply ||
          "I am here and ready to help. Try asking about projects, research, or experience.",
      };
      setChat((prev) => [...prev, botMessage]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      const lower = msg.toLowerCase();

      const isLimitIssue =
        lower.includes("429") ||
        lower.includes("rate limit") ||
        lower.includes("quota") ||
        lower.includes("credits") ||
        lower.includes("limit");

      const isMissingKey = lower.includes("openrouter_api_key");

      let fallback =
        "I am having a small delay on my side right now. You can still reach Navaneeth directly via LinkedIn: https://linkedin.com/in/navaneethad or Gmail: navaneeth.ad04@gmail.com";

      if (isLimitIssue) {
        fallback =
          "Looks like this chat hit a request limit for now. Please try again in a bit, or connect directly on LinkedIn: https://linkedin.com/in/navaneethad or Gmail: navaneeth.ad04@gmail.com";
      } else if (isMissingKey) {
        fallback =
          "Chat setup is being updated right now. For immediate contact, please use LinkedIn: https://linkedin.com/in/navaneethad or Gmail: navaneeth.ad04@gmail.com";
      }

      setChat((prev) => [
        ...prev,
        { role: "assistant", content: fallback },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed right-4 bottom-4 z-[120] md:right-8 md:bottom-8">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-blue-500/30 bg-[#0B1120]/95 backdrop-blur-xl shadow-[0_24px_60px_rgba(15,23,42,0.65)] overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#111C33]/80">
              <div className="flex items-center gap-2 text-white">
                <Bot className="w-4 h-4 text-cyan-300" />
                <span className="text-sm font-semibold tracking-wide">Nav</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-300 hover:text-white transition"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div ref={messagesRef} className="h-80 overflow-y-auto px-4 py-4 space-y-3">
              {introTyping && (
                <div className="p-3 rounded-lg text-sm leading-relaxed bg-gray-800 text-left mr-10">
                  {introText}
                  <span className="inline-block ml-0.5 w-1.5 h-4 bg-cyan-300/80 align-[-2px] animate-pulse" />
                </div>
              )}

              {chat.map((msg, i) => (
                <div
                  key={`${msg.role}-${i}`}
                  className={`p-3 rounded-lg text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-500/20 text-right ml-10"
                      : "bg-gray-800 text-left mr-10"
                  }`}
                >
                  {msg.content}
                </div>
              ))}

              {loading && (
                <div className="p-3 rounded-lg bg-gray-800 text-left mr-10 w-fit">
                  <TypingDots />
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="p-3 border-t border-white/10 bg-[#0B1120]">
              <div className="flex gap-2">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") void sendMessage();
                  }}
                  placeholder="Ask about my projects..."
                  className="flex-1 p-3 rounded-lg bg-[#0E1628] border border-blue-500/20 text-white text-sm outline-none focus:border-blue-400"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading}
                  className="px-4 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed transition"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{ scale: 1.08, rotate: 2 }}
        whileTap={{ scale: 0.96 }}
        animate={{
          boxShadow: open
            ? "0 0 0 6px rgba(56,189,248,0.18), 0 14px 35px rgba(56,189,248,0.5)"
            : "0 0 0 0px rgba(56,189,248,0), 0 14px 35px rgba(56,189,248,0.45)",
        }}
        transition={{ duration: 0.25 }}
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-700 text-white flex items-center justify-center border border-white/20"
        aria-label={open ? "Close Nav chat" : "Open Nav chat"}
      >
        <span className="absolute inset-0 rounded-full bg-cyan-300/20 animate-ping" />
        <span className="absolute -inset-1 rounded-full border border-cyan-300/40" />
        <Bot className="relative w-7 h-7" />
      </motion.button>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-cyan-300"
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
