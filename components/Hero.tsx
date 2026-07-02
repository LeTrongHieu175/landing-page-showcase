import Image from "next/image";
import { ArrowRight, ShieldCheck, Smartphone, Wind } from "lucide-react";

import { buttonVariants } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const trustPoints = [
  "PM2.5 live tracking",
  "Adaptive HEPA purification",
  "Intelligent app control",
] as const;

const quickStats = [
  { label: "Coverage", value: "Up to 55 m²" },
  { label: "Night noise", value: "23 dB" },
  { label: "Filter life", value: "10 months" },
] as const;

export function Hero() {
  return (
    <section id="top" className="section-spacing grid-lines border-b border-border/60">
      <div className="shell relative grid gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="space-y-8">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-mint/25 bg-white/80 px-4 py-2 text-sm font-medium text-charcoal-soft shadow-[0_10px_25px_rgba(17,52,61,0.08)]">
              <Wind className="h-4 w-4 text-mint-deep" aria-hidden="true" />
              Breathe calmer with intelligent air care.
            </div>
          </Reveal>

          <Reveal delay="short">
            <div className="space-y-5">
              <h1 className="text-balance font-heading text-5xl font-semibold tracking-tight text-charcoal sm:text-6xl">
                Cleaner air, automatically tailored to the way you live.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-charcoal-soft">
                Aera One senses fine dust, allergens, and stale indoor air in real
                time, then adjusts its purification power so your home stays fresh,
                quiet, and effortlessly comfortable.
              </p>
            </div>
          </Reveal>

          <Reveal delay="medium">
            <div className="flex flex-col gap-4 sm:flex-row">
              <a href="#lead-form" className={buttonVariants({ size: "lg", variant: "solid" })}>
                Get launch updates
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#features"
                className={buttonVariants({ size: "lg", variant: "ghost" })}
              >
                Explore features
              </a>
            </div>
          </Reveal>

          <Reveal delay="medium">
            <div className="flex flex-wrap gap-3">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/75 px-4 py-2 text-sm text-charcoal-soft"
                >
                  <ShieldCheck className="h-4 w-4 text-mint-deep" aria-hidden="true" />
                  {point}
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="lg:justify-self-end" delay="short">
          <div className="surface-panel relative isolate overflow-hidden rounded-[2rem] p-5 sm:p-6">
            <div className="absolute inset-x-6 top-6 h-28 rounded-full bg-mint/20 blur-3xl" />
            <div className="absolute -right-10 bottom-4 h-36 w-36 rounded-full bg-sky/20 blur-3xl" />
            <div className="relative grid gap-5">
              <div className="flex items-start justify-between gap-4 rounded-[1.5rem] border border-white/70 bg-white/85 p-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-charcoal-soft">
                    Live air score
                  </p>
                  <p className="mt-2 font-heading text-4xl font-semibold text-charcoal">
                    08
                  </p>
                  <p className="mt-1 text-sm text-success">Excellent indoor conditions</p>
                </div>
                <div className="rounded-2xl border border-mint/20 bg-mint/12 p-3 text-mint-deep">
                  <Smartphone className="h-6 w-6" aria-hidden="true" />
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(235,247,249,0.95))] p-4 sm:p-5">
                <div className="absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(circle_at_bottom,rgba(102,215,186,0.26),transparent_70%)]" />
                <Image
                  src="/images/product.webp"
                  alt="Aera One smart air purifier product render"
                  width={880}
                  height={1120}
                  priority
                  className="relative mx-auto h-auto w-full max-w-[23rem]"
                  sizes="(max-width: 768px) 90vw, 28rem"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {quickStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.4rem] border border-white/70 bg-white/85 p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-charcoal-soft">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-charcoal">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
