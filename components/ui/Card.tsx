import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "surface-panel rounded-[1.75rem] border border-border/80 bg-white/72",
        className,
      )}
      {...props}
    />
  );
}
