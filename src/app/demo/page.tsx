import { DemoChat } from "@/components/demo/DemoChat";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { Badge } from "@/components/ui/Badge";

export default function DemoPage() {
  return (
    <div className="liquid-bg relative min-h-[100dvh]">
      <LandingHeader currentPage="demo" />
      <main className="mx-auto flex min-h-[100dvh] max-w-6xl flex-col items-center justify-center gap-10 px-4 pb-12 pt-24 md:flex-row md:gap-16 md:px-6 md:pt-28">
        <div className="max-w-md text-center md:text-left">
          <Badge className="mb-4">AI agent demo</Badge>
          <h1 className="mb-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            Your agent negotiates while you sleep
          </h1>
          <p className="mb-6 text-sm leading-relaxed text-muted md:text-base">
            Watch Geosify trace ownership from crown registry to listing agent,
            then negotiate price on your behalf — all in a single conversation.
          </p>
          <ul className="space-y-2 text-left text-sm text-muted">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              Full chain of command for any parcel
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              Autonomous outreach to listing agents
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              Data-backed counter offers in real time
            </li>
          </ul>
        </div>

        <div className="flex shrink-0 justify-center">
          <DemoChat />
        </div>
      </main>
    </div>
  );
}
