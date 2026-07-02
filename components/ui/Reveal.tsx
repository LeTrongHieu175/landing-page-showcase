"use client";

import { startTransition, type HTMLAttributes, useEffect, useRef, useState } from "react";

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
  style,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  delay?: RevealDelay;
}) {
  const [isVisible, setIsVisible] = useState(true);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const viewportHeight = window.innerHeight || 1;
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < viewportHeight * 0.92) {
      setIsVisible(true);
      return;
    }

    setIsVisible(false);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startTransition(() => {
            setIsVisible(true);
          });
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.18,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={cn(
        "reveal-base motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none",
        isVisible ? "reveal-enter" : "reveal-hidden",
        delayClasses[delay],
        className,
      )}
      data-revealed={isVisible}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}
