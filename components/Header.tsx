"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#features", label: "Features" },
  { href: "#technology", label: "Technology" },
  { href: "#specs", label: "Specs" },
  { href: "#faq", label: "FAQ" },
  { href: "#lead-form", label: "Get Updates" },
] as const;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 48rem)");

    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleBreakpointChange);

    return () => {
      mediaQuery.removeEventListener("change", handleBreakpointChange);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-border/80 bg-[rgba(248,254,255,0.94)] backdrop-blur-xl md:bg-white/70"
    >
      <div className="shell relative py-3 md:py-4">
        <div className="flex items-center justify-between gap-4 md:gap-6">
          <a
            href="#top"
            className="flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/70"
            aria-label="Aera One homepage"
            onClick={closeMenu}
          >
            <Image
              src="/icons/aera-mark.svg"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <div>
              <p className="font-heading text-lg font-semibold tracking-tight text-charcoal">
                Aera One
              </p>
              <p className="text-xs uppercase tracking-[0.24em] text-charcoal-soft">
                Smart Air Purifier
              </p>
            </div>
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-white/80 text-charcoal shadow-[0_12px_30px_rgba(17,52,61,0.08)] transition-colors duration-300 ease-out hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/70 md:hidden"
            aria-controls={menuId}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          <div className="hidden md:flex md:items-center md:gap-5">
            <nav aria-label="Primary navigation">
              <ul className="flex items-center gap-2 text-sm font-medium text-charcoal-soft md:gap-3">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="inline-flex rounded-full px-3 py-2 transition-colors duration-300 ease-out hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/70"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <a
              href="#lead-form"
              className={buttonVariants({ size: "sm", variant: "solid" })}
            >
              Request launch access
            </a>
          </div>
        </div>

        {isMenuOpen ? (
          <div className="absolute inset-x-0 top-full z-10 mt-3 md:hidden">
            <div className="rounded-[1.5rem] border border-border/90 bg-[linear-gradient(180deg,rgba(248,254,255,0.985),rgba(243,250,252,0.975))] p-3 shadow-[0_28px_65px_rgba(17,52,61,0.16)]">
              <nav id={menuId} aria-label="Mobile primary navigation">
                <ul className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="flex min-h-11 items-center rounded-[1rem] px-4 py-3 text-base font-medium text-charcoal-soft transition-colors duration-300 ease-out hover:bg-white hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/70"
                        onClick={closeMenu}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <a
                href="#lead-form"
                className={cn(
                  buttonVariants({ size: "sm", variant: "solid" }),
                  "mt-3 flex w-full justify-center",
                )}
                onClick={closeMenu}
              >
                Request launch access
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
