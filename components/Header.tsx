import Image from "next/image";

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
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-white/70 backdrop-blur-xl">
      <div className="shell flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between md:gap-6">
        <a
          href="#top"
          className="flex items-center gap-3 self-start rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/70"
          aria-label="Aera One homepage"
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

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
          <nav aria-label="Primary navigation" className="overflow-x-auto">
            <ul className="flex min-w-max items-center gap-2 text-sm font-medium text-charcoal-soft md:gap-3">
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
            className={cn(
              buttonVariants({ size: "sm", variant: "solid" }),
              "self-start md:self-auto",
            )}
          >
            Request launch access
          </a>
        </div>
      </div>
    </header>
  );
}
