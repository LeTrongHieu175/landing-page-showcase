"use client";

import { LoaderCircle, MessageSquareMore, SendHorizontal, Sparkles, X } from "lucide-react";
import { startTransition, useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type ChatMessage = {
  content: string;
  id: string;
  role: "assistant" | "user";
};

type ChatApiResponse = {
  message: string;
  ok: boolean;
  suggestions: string[];
};

const defaultSuggestions = [
  "What room size is Aera One designed for?",
  "How often do I need to replace the filter?",
  "Is it quiet enough for a bedroom at night?",
] as const;

const initialAssistantMessage =
  "Ask me anything about Aera One. I can explain coverage, filter life, quiet night mode, sensors, app control, and launch access.";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      content: initialAssistantMessage,
      id: "assistant-welcome",
      role: "assistant",
    },
  ]);
  const [suggestions, setSuggestions] = useState<string[]>([...defaultSuggestions]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isSending]);

  const isDraftEmpty = useMemo(() => draft.trim().length === 0, [draft]);

  async function sendMessage(message: string) {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isSending) {
      return;
    }

    const userMessage: ChatMessage = {
      content: trimmedMessage,
      id: `user-${Date.now()}`,
      role: "user",
    };

    setDraft("");
    setMessages((current) => [...current, userMessage]);
    startTransition(() => {
      setIsSending(true);
    });

    try {
      const response = await fetch("/api/chat", {
        body: JSON.stringify({ message: trimmedMessage }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const result = (await response.json()) as ChatApiResponse;

      setMessages((current) => [
        ...current,
        {
          content: result.message,
          id: `assistant-${Date.now()}`,
          role: "assistant",
        },
      ]);

      if (Array.isArray(result.suggestions) && result.suggestions.length > 0) {
        setSuggestions(result.suggestions);
      }
    } catch {
      setMessages((current) => [
        ...current,
        {
          content:
            "I could not answer right now. Please try again in a moment or use the signup form for launch support.",
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-[60] flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {isOpen ? (
        <div className="surface-panel w-[min(24rem,calc(100vw-2rem))] overflow-hidden rounded-[1.75rem] border border-border/80 bg-surface-strong/92 shadow-[0_28px_80px_rgba(5,18,24,0.24)] backdrop-blur-2xl sm:w-[min(24rem,calc(100vw-3rem))]">
          <div className="flex items-start justify-between gap-4 border-b border-border/70 bg-[linear-gradient(135deg,var(--chat-head-start),var(--chat-head-end))] px-5 py-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-mint/20 bg-surface-strong/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal-soft">
                <Sparkles className="h-3.5 w-3.5 text-mint-deep" aria-hidden="true" />
                Live product guide
              </div>
              <p className="mt-3 font-heading text-lg font-semibold text-charcoal">
                Ask about Aera One
              </p>
              <p className="mt-1 text-sm text-charcoal-soft">
                Instant answers for specs, comfort, and product fit.
              </p>
            </div>

            <button
              type="button"
              aria-label="Close chat"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-surface-strong/70 text-charcoal transition-colors duration-300 ease-out hover:bg-surface-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/70"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div ref={scrollRef} className="chat-scroll max-h-[22rem] space-y-4 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "max-w-[88%] rounded-[1.35rem] px-4 py-3 text-sm leading-7 shadow-[0_14px_32px_rgba(17,52,61,0.08)]",
                  message.role === "assistant"
                    ? "mr-auto border border-border/80 bg-surface-soft text-charcoal-soft"
                    : "ml-auto border border-transparent bg-[linear-gradient(135deg,var(--button-solid-start),var(--button-solid-end))] text-white",
                )}
              >
                {message.content}
              </div>
            ))}

            {isSending ? (
              <div className="mr-auto inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface-soft px-4 py-2 text-sm text-charcoal-soft">
                <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                Thinking...
              </div>
            ) : null}
          </div>

          <div className="border-t border-border/70 px-4 py-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {suggestions.slice(0, 3).map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="interactive-lift rounded-full border border-border/80 bg-surface-soft px-3 py-2 text-left text-xs font-medium text-charcoal-soft transition-colors duration-300 ease-out hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/70"
                  onClick={() => {
                    void sendMessage(suggestion);
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <form
              className="flex items-end gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                void sendMessage(draft);
              }}
            >
              <label className="sr-only" htmlFor="chat-message">
                Ask a question about Aera One
              </label>
              <textarea
                id="chat-message"
                rows={1}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ask about filters, noise, coverage, or the app..."
                className="max-h-28 min-h-12 flex-1 resize-y rounded-[1.25rem] border border-border bg-surface-soft px-4 py-3 text-sm text-charcoal transition-colors duration-300 ease-out placeholder:text-charcoal-soft/70 focus-visible:border-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/50"
              />
              <Button type="submit" size="sm" disabled={isDraftEmpty || isSending}>
                <SendHorizontal className="h-4 w-4" aria-hidden="true" />
                Send
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="hidden rounded-full border border-border/80 bg-surface-strong/90 px-4 py-2 text-xs font-medium text-charcoal-soft shadow-[0_16px_40px_rgba(17,52,61,0.12)] backdrop-blur-xl sm:block">
          Ask about filters, room size, or app control
        </div>
      )}

      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Minimize chatbot" : "Open product chatbot"}
        className="interactive-lift inline-flex h-14 w-14 items-center justify-center rounded-full border border-transparent bg-[linear-gradient(135deg,var(--button-solid-start),var(--button-solid-end))] text-white shadow-[0_20px_50px_rgba(5,18,24,0.28)] transition-all duration-300 ease-out hover:shadow-[0_24px_60px_rgba(5,18,24,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/70 sm:min-h-14 sm:w-auto sm:gap-3 sm:px-5 sm:py-1"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/14">
          <MessageSquareMore className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="hidden text-left sm:block">
          <span className="block text-sm font-semibold">Product chatbot</span>
          <span className="block text-xs text-white/80">
            {isOpen ? "Tap to minimize" : "Get instant answers"}
          </span>
        </span>
      </button>
    </div>
  );
}
