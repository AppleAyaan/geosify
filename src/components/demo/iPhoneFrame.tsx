"use client";

import { cn } from "@/lib/utils/cn";

interface IPhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function IPhoneFrame({ children, className }: IPhoneFrameProps) {
  return (
    <div className={cn("relative mx-auto w-[320px] shrink-0", className)}>
      <div className="relative rounded-[2.75rem] border-[3px] border-[#1c1c1e] bg-[#1c1c1e] p-2 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.28),0_0_0_1px_rgba(255,255,255,0.06)_inset]">
        <div className="absolute left-1/2 top-3 z-20 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-black" />

        <div className="relative overflow-hidden rounded-[2.25rem] bg-[#f2f2f7]">
          <div className="flex items-center justify-between px-6 pb-1 pt-3 text-[10px] font-semibold text-foreground/80">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <SignalIcon />
              <WifiIcon />
              <BatteryIcon />
            </div>
          </div>

          {children}

          <div className="flex justify-center pb-2 pt-1">
            <div className="h-1 w-28 rounded-full bg-foreground/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SignalIcon() {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor" aria-hidden>
      <rect x="0" y="6" width="2.5" height="4" rx="0.5" opacity="0.35" />
      <rect x="4" y="4" width="2.5" height="6" rx="0.5" opacity="0.55" />
      <rect x="8" y="2" width="2.5" height="8" rx="0.5" opacity="0.75" />
      <rect x="12" y="0" width="2.5" height="10" rx="0.5" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor" aria-hidden>
      <path d="M7 8.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" />
      <path
        d="M4.2 6.1a3.6 3.6 0 0 1 5.6 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M1.8 3.6a7.2 7.2 0 0 1 10.4 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="22" height="10" viewBox="0 0 22 10" fill="currentColor" aria-hidden>
      <rect
        x="0.5"
        y="0.5"
        width="18"
        height="9"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.45"
      />
      <rect x="2" y="2" width="13" height="6" rx="1" />
      <path d="M20 3.5v3c.8-.2 1.4-.8 1.4-1.5S20.8 3.7 20 3.5Z" opacity="0.45" />
    </svg>
  );
}
