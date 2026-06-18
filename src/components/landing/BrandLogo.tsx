import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { Brand } from "@/lib/data/brands";

interface BrandLogoProps {
  brand: Brand;
  className?: string;
  height?: number;
  showName?: boolean;
}

export function BrandLogo({
  brand,
  className,
  height = 22,
  showName = false,
}: BrandLogoProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap",
        className,
      )}
    >
      <Image
        src={brand.logo}
        alt={brand.name}
        width={Math.round(height * 4.5)}
        height={height}
        className="h-auto w-auto object-contain opacity-45 grayscale"
        style={{ height, width: "auto" }}
      />
      {showName && (
        <span className="text-sm font-medium text-muted/70">{brand.name}</span>
      )}
    </span>
  );
}
