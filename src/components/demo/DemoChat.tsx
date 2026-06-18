"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, RotateCcw, Sparkles } from "lucide-react";
import { IPhoneFrame } from "@/components/demo/iPhoneFrame";
import { OwnershipChainCard } from "@/components/demo/OwnershipChainCard";
import { OfferCard } from "@/components/demo/OfferCard";
import {
  demoChatScript,
  getDemoStage,
  type DemoChatMessage,
} from "@/lib/data/demo-chat";
import { cn } from "@/lib/utils/cn";

const TYPING_MS = 1100;
const LOOP_PAUSE_MS = 5000;
const SCROLL_BOTTOM_THRESHOLD = 28;

function pauseAfterMessage(message: DemoChatMessage): number {
  if (message.kind === "chain" || message.kind === "offer") return 1200;
  const words = message.text.split(" ").length;
  return Math.min(2000, 450 + words * 40);
}

function isAgentMessage(message: DemoChatMessage): boolean {
  return (
    message.kind === "agent" ||
    message.kind === "chain" ||
    message.kind === "offer"
  );
}

function ChatBubble({
  message,
  isUser,
}: {
  message: Extract<DemoChatMessage, { kind: "user" | "agent" }>;
  isUser: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[88%] rounded-[18px] px-3 py-2 text-[12px] leading-[1.35]",
          isUser
            ? "rounded-br-[6px] bg-[#007aff] text-white"
            : "rounded-bl-[6px] bg-white text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.06)]",
        )}
      >
        {message.text}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      className="flex justify-start"
    >
      <div className="flex items-center gap-1 rounded-[18px] rounded-bl-[6px] bg-white px-3.5 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-muted/60"
            animate={{ y: [0, -3, 0], opacity: [0.45, 1, 0.45] }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function DemoProgressBar({
  visibleCount,
  stageLabel,
  isPaused,
}: {
  visibleCount: number;
  stageLabel: string;
  isPaused: boolean;
}) {
  const progress = Math.min(visibleCount / demoChatScript.length, 1);

  return (
    <div className="border-b border-black/5 bg-white/95 px-4 py-2">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <p className="truncate text-[10px] font-medium text-accent">
          {stageLabel}
        </p>
        <span className="flex shrink-0 items-center gap-1 text-[9px] text-muted">
          {isPaused && <Pause className="h-2.5 w-2.5" />}
          {visibleCount}/{demoChatScript.length}
        </span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-black/[0.06]">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={false}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function renderMessage(message: DemoChatMessage, playKey: number) {
  if (message.kind === "user" || message.kind === "agent") {
    return (
      <ChatBubble
        key={`${playKey}-${message.id}`}
        message={message}
        isUser={message.kind === "user"}
      />
    );
  }

  if (message.kind === "chain") {
    return (
      <motion.div
        key={`${playKey}-${message.id}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-start"
      >
        <OwnershipChainCard />
      </motion.div>
    );
  }

  return (
    <motion.div
      key={`${playKey}-${message.id}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <OfferCard
        listPrice={message.listPrice}
        offer={message.offer}
        counter={message.counter}
        final={message.final}
      />
    </motion.div>
  );
}

export function DemoChat() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAutoScrollingRef = useRef(false);

  const visibleMessages = demoChatScript.slice(0, visibleCount);
  const stage = getDemoStage(visibleCount);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const isNearBottom = useCallback((el: HTMLDivElement) => {
    return (
      el.scrollHeight - el.scrollTop - el.clientHeight <= SCROLL_BOTTOM_THRESHOLD
    );
  }, []);

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    isAutoScrollingRef.current = true;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    window.setTimeout(() => {
      isAutoScrollingRef.current = false;
    }, 350);
  }, []);

  const pauseDemo = useCallback(() => {
    clearTimer();
    setIsTyping(false);
    setIsPaused(true);
  }, []);

  const resumeDemo = useCallback(() => {
    setIsPaused(false);
    scrollToBottom();
  }, [scrollToBottom]);

  const restart = () => {
    clearTimer();
    setVisibleCount(0);
    setIsTyping(false);
    setIsPaused(false);
    setPlayKey((k) => k + 1);
  };

  const handleScroll = useCallback(() => {
    if (isAutoScrollingRef.current || isPaused) return;
    const el = scrollRef.current;
    if (!el) return;
    if (!isNearBottom(el)) pauseDemo();
  }, [isNearBottom, isPaused, pauseDemo]);

  useEffect(() => {
    if (!isPaused) scrollToBottom();
  }, [visibleCount, isTyping, isPaused, scrollToBottom]);

  useEffect(() => {
    if (isPaused) {
      clearTimer();
      return;
    }

    clearTimer();

    if (visibleCount >= demoChatScript.length) {
      setIsTyping(false);
      timerRef.current = setTimeout(() => {
        setVisibleCount(0);
        setIsTyping(false);
        setIsPaused(false);
        setPlayKey((k) => k + 1);
      }, LOOP_PAUSE_MS);
      return clearTimer;
    }

    const next = demoChatScript[visibleCount];
    const leadIn =
      visibleCount === 0
        ? 500
        : pauseAfterMessage(demoChatScript[visibleCount - 1]);

    if (isAgentMessage(next)) {
      timerRef.current = setTimeout(() => {
        setIsTyping(true);
        timerRef.current = setTimeout(() => {
          setIsTyping(false);
          setVisibleCount((c) => c + 1);
        }, TYPING_MS);
      }, leadIn);
    } else {
      timerRef.current = setTimeout(() => {
        setVisibleCount((c) => c + 1);
      }, leadIn);
    }

    return clearTimer;
  }, [visibleCount, playKey, isPaused]);

  return (
    <div className="flex w-[320px] shrink-0 flex-col items-center gap-4">
      <IPhoneFrame>
        <div className="border-b border-black/5 bg-white/90 px-4 py-2.5 backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-foreground">
                Geosify Agent
              </p>
              <p className="flex items-center gap-1 text-[10px] text-muted">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                {isPaused ? "Paused — review stage" : "Negotiating on your behalf"}
              </p>
            </div>
            {isPaused && (
              <button
                type="button"
                onClick={resumeDemo}
                className="nav-btn flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent"
                aria-label="Continue demo"
              >
                <Play className="h-3 w-3" fill="currentColor" />
              </button>
            )}
          </div>
        </div>

        <DemoProgressBar
          visibleCount={visibleCount}
          stageLabel={stage.label}
          isPaused={isPaused}
        />

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="h-[420px] space-y-2.5 overflow-y-auto px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <AnimatePresence initial={false}>
            {visibleMessages.map((message) => renderMessage(message, playKey))}
          </AnimatePresence>
          <AnimatePresence>{isTyping && !isPaused && <TypingIndicator />}</AnimatePresence>
        </div>

        <div className="border-t border-black/5 bg-white/95 px-3 py-2.5">
          <div className="flex items-center gap-2 rounded-full border border-black/8 bg-[#f2f2f7] px-3 py-2">
            <span className="flex-1 text-[11px] text-muted/70">
              Message Geosify Agent…
            </span>
            <div className="h-6 w-6 rounded-full bg-[#007aff]/15" />
          </div>
        </div>
      </IPhoneFrame>

      <div className="flex items-center gap-2">
        {isPaused && (
          <button
            type="button"
            onClick={resumeDemo}
            className="nav-btn inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-3.5 py-1.5 text-xs font-medium text-accent shadow-sm"
          >
            <Play className="h-3 w-3" fill="currentColor" />
            Continue
          </button>
        )}
        <button
          type="button"
          onClick={restart}
          className="nav-btn inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-white/70 px-3.5 py-1.5 text-xs text-muted shadow-sm backdrop-blur-sm"
        >
          <RotateCcw className="h-3 w-3" />
          Replay demo
        </button>
      </div>
    </div>
  );
}
