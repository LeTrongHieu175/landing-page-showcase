import Image from "next/image";

const footerLinks = [
  { href: "mailto:hello@aeraone.com", label: "Contact" },
  { href: "mailto:privacy@aeraone.com?subject=Privacy%20request", label: "Privacy" },
  { href: "mailto:legal@aeraone.com?subject=Terms%20request", label: "Terms" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-white/70 py-10">
      <div className="shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/icons/aera-mark.svg"
            alt="Aera One"
            width={36}
            height={36}
            className="h-9 w-9"
          />
          <div>
            <p className="font-heading text-lg font-semibold text-charcoal">Aera One</p>
            <p className="text-sm text-charcoal-soft">
              Smart air care for modern, health-first homes.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-charcoal-soft">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors duration-300 ease-out hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/70"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
