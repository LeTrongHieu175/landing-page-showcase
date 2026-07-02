"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { Card } from "@/components/ui/Card";

const LazyLeadFormClient = dynamic(
  () => import("@/components/LeadFormClient").then((module) => module.LeadFormClient),
  {
    loading: () => <LeadFormSkeleton />,
    ssr: false,
  },
);

function LeadFormSkeleton() {
  return (
    <Card className="p-6 sm:p-8">
      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={index === 0 ? "space-y-2 sm:col-span-2" : "space-y-2"}>
              <div className="skeleton-shimmer h-4 w-24 rounded-full bg-surface-muted" />
              <div className="skeleton-shimmer h-12 rounded-2xl bg-surface-muted" />
            </div>
          ))}
        </div>
        <div className="skeleton-shimmer h-20 rounded-2xl bg-surface-muted" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="skeleton-shimmer h-12 w-40 rounded-full bg-surface-muted" />
          <div className="skeleton-shimmer h-4 w-48 rounded-full bg-surface-muted" />
        </div>
      </div>
    </Card>
  );
}

export function DeferredLeadForm() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "240px 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return <div ref={containerRef}>{shouldLoad ? <LazyLeadFormClient /> : <LeadFormSkeleton />}</div>;
}
