"use client";

import type { HTMLAttributes } from "react";

import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

type RevealDelay = "none" | "short" | "medium";

const delayClasses: Record<RevealDelay, string> = {
  medium: "delay-150",
  none: "delay-0",
  short: "delay-75",
};

export function Reveal({
  children,
  className,
  delay = "none",
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  delay?: RevealDelay;
}) {
  const { isVisible, ref } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-300 ease-out motion-reduce:transition-none",
        delayClasses[delay],
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
