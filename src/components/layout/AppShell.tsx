import { TopBar } from "@/components/layout/TopBar";
import { ParcelPanel } from "@/components/parcel/ParcelPanel";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <TopBar />
      <main className="absolute inset-0">{children}</main>
      <ParcelPanel />
    </div>
  );
}
