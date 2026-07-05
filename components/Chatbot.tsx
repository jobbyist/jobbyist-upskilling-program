"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/ui/Icon";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = ["Is it free?", "What time does it start?", "How do I win a prize?"];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm the Jobbyist event assistant. Ask me anything about the webinar — schedule, prizes, or how to join.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const nextMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: nextMessages.slice(-6) }),
      });
      const data = (await res.json()) as { ok: boolean; reply?: string };
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Sorry, I couldn't process that. Please try the FAQ below." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong — please check the FAQ section or try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 md:bottom-6 md:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="glass-strong mb-3 flex h-[440px] w-[320px] flex-col overflow-hidden rounded-xl2 shadow-card sm:w-[360px]"
          >
            <div className="flex items-center justify-between border-b border-charcoal-line px-4 py-3">
              <p className="font-heading text-sm font-bold text-ink">Ask about the webinar</p>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-1 text-ink-faint hover:bg-white/10 hover:text-ink"
              >
                <Icon name="close" className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 no-scrollbar">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto bg-electric text-charcoal"
                      : "bg-charcoal-raised text-ink-mid"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="max-w-[60%] rounded-2xl bg-charcoal-raised px-3.5 py-2.5 text-[13px] text-ink-faint">
                  Typing…
                </div>
              )}
            </div>

            {messages.length < 3 && (
              <div className="flex flex-wrap gap-2 px-4 pb-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-charcoal-line-strong px-3 py-1.5 text-xs text-ink-mid hover:border-electric-soft hover:text-ink"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-charcoal-line p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a question…"
                className="flex-1 rounded-xl bg-charcoal-raised px-3.5 py-2.5 text-[13px] text-ink placeholder:text-ink-faint focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-electric px-3.5 py-2.5 text-charcoal disabled:opacity-50"
                aria-label="Send message"
              >
                <Icon name="arrow-right" className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-electric to-electric-soft text-charcoal shadow-glow-lg transition-transform hover:scale-105"
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
      >
        <Icon name={open ? "close" : "message-circle"} className="h-6 w-6" />
      </button>
    </div>
  );
}
