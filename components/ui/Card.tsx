import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "interactive-card surface-panel rounded-[1.75rem] border border-border/80 bg-surface-strong/72",
        className,
      )}
      {...props}
    />
  );
}
