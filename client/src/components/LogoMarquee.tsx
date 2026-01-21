import { useMemo } from "react";

import { healthSystemLogos } from "@/lib/logos/healthsystems";
import { cn } from "@/lib/utils";

type LogoMarqueeProps = {
  variant?: "color" | "mono";
  className?: string;
  speed?: number;
};

export function LogoMarquee({ variant, className, speed = 130 }: LogoMarqueeProps) {
  const resolvedVariant = variant ?? "color";

  const trackLogos = useMemo(
    () => [...healthSystemLogos, ...healthSystemLogos],
    []
  );

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div className="relative w-full overflow-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <div
          className="flex animate-scrolling-left items-center gap-10 sm:gap-14 whitespace-nowrap w-max group-hover:[animation-play-state:paused]"
          style={{ animationDuration: `${speed}s` }}
        >
          {trackLogos.map((logo, index) => {
            const src = resolvedVariant === "mono" ? logo.monoSrc : logo.colorSrc;
            const isDuplicate = index >= healthSystemLogos.length;
            return (
              <img
                key={`${logo.id}-${index}`}
                src={src}
                alt={logo.name}
                loading="lazy"
                decoding="async"
                aria-hidden={isDuplicate}
                className={cn(
                  "h-8 sm:h-10 w-auto object-contain shrink-0",
                  resolvedVariant === "mono" ? "dark:invert dark:brightness-200" : "",
                  logo.className
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
