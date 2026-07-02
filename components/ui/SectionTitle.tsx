import { cn } from "@/lib/utils";

type SectionTitleProps = {
  centered?: boolean;
  description: string;
  eyebrow: string;
  title: string;
};

export function SectionTitle({
  centered = false,
  description,
  eyebrow,
  title,
}: SectionTitleProps) {
  return (
    <div className={cn("max-w-3xl space-y-4", centered && "mx-auto text-center")}>
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-charcoal-soft">
        {eyebrow}
      </p>
      <h2 className="text-balance font-heading text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
        {title}
      </h2>
      <p className="text-base leading-8 text-charcoal-soft sm:text-lg">{description}</p>
    </div>
  );
}
