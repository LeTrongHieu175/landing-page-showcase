import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type RevealDelay = "none" | "short" | "medium";

const delayClasses: Record<RevealDelay, string> = {
  medium: "reveal-delay-medium",
  none: "reveal-delay-none",
  short: "reveal-delay-short",
};

export function Reveal({
  children,
  className,
  delay = "none",
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  delay?: RevealDelay;
}) {
  return (
    <div
      className={cn(
        "reveal-enter motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none",
        delayClasses[delay],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
