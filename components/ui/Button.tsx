import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "solid" | "ghost";
type ButtonSize = "sm" | "lg";

type ButtonLinkProps = {
  children: ReactNode;
  href: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href">;

type ButtonElementProps = {
  children: ReactNode;
  href?: undefined;
  size?: ButtonSize;
  variant?: ButtonVariant;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export type ButtonProps = ButtonLinkProps | ButtonElementProps;

const variantClasses: Record<ButtonVariant, string> = {
  ghost:
    "border border-border bg-surface-strong/80 text-charcoal shadow-[0_14px_35px_rgba(17,52,61,0.08)] hover:bg-surface-strong hover:border-mint/30",
  solid:
    "border border-transparent bg-[linear-gradient(135deg,var(--button-solid-start),var(--button-solid-end))] text-white shadow-[0_18px_40px_rgba(17,52,61,0.18)] hover:-translate-y-0.5 hover:shadow-[0_24px_45px_rgba(17,52,61,0.2)] active:translate-y-0 active:scale-[0.985]",
};

const sizeClasses: Record<ButtonSize, string> = {
  lg: "min-h-12 px-6 text-sm",
  sm: "min-h-10 px-5 text-sm",
};

export function buttonVariants({
  size = "lg",
  variant = "solid",
}: {
  size?: ButtonSize;
  variant?: ButtonVariant;
}) {
  return cn(
    "interactive-lift inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/70 disabled:pointer-events-none disabled:opacity-70",
    sizeClasses[size],
    variantClasses[variant],
  );
}

export function Button(props: ButtonProps) {
  const { children, size = "lg", variant = "solid" } = props;
  const className = buttonVariants({ size, variant });

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;

    return (
      <Link href={href} className={className} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props as ButtonElementProps;

  return (
    <button type={type} className={className} {...buttonProps}>
      {children}
    </button>
  );
}
