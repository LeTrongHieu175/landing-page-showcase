import { ArrowDown, ArrowRight, Cpu, Smartphone, Sparkles, Waves, Wind } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

const flowSteps = [
  { icon: Cpu, label: "Sensor" },
  { icon: Waves, label: "Air Quality Detection" },
  { icon: Sparkles, label: "Automatic Decision" },
  { icon: Wind, label: "Purification" },
  { icon: Smartphone, label: "Mobile App" },
] as const;

const appHighlights = [
  "Live air score with trend snapshots",
  "Filter life overview and maintenance reminders",
  "One-tap switching between Auto, Boost, and Night modes",
] as const;

export function Technology() {
  return (
    <section id="technology" className="section-anchor section-spacing border-y border-border/60">
      <div className="shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-8">
          <Reveal>
            <SectionTitle
              eyebrow="Technology"
              title="A smart purification loop that senses, decides, and responds in seconds."
              description="Aera One combines high-sensitivity sensing with adaptive fan control so air care stays proactive instead of reactive."
            />
          </Reveal>

          <Reveal delay="short">
            <div className="grid gap-3">
              {flowSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={step.label} className="flex items-center gap-3">
                    <Card className="flex flex-1 items-center gap-4 p-4">
                      <div className="rounded-2xl border border-mint/20 bg-mint/12 p-3 text-mint-deep">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="text-sm font-semibold text-charcoal">{step.label}</span>
                    </Card>
                    {index < flowSteps.length - 1 ? (
                      <>
                        <ArrowRight className="hidden h-5 w-5 text-charcoal-soft lg:block" aria-hidden="true" />
                        <ArrowDown className="h-5 w-5 text-charcoal-soft lg:hidden" aria-hidden="true" />
                      </>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>

        <Reveal delay="medium">
          <div className="surface-panel rounded-[2rem] p-6 sm:p-8">
            <div className="rounded-[1.6rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(235,247,249,0.92))] p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-charcoal-soft">
                    App dashboard
                  </p>
                  <p className="mt-2 font-heading text-2xl font-semibold text-charcoal">
                    Purification in sync with your space
                  </p>
                </div>
                <div className="rounded-2xl border border-border/80 bg-white/90 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-success">
                  Auto Mode
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[1.5rem] border border-border/70 bg-white/90 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-charcoal-soft">
                    Air score
                  </p>
                  <p className="mt-2 font-heading text-5xl font-semibold text-charcoal">08</p>
                  <div className="mt-4 h-2 rounded-full bg-surface-muted">
                    <div className="h-full w-4/5 rounded-full bg-[linear-gradient(90deg,#66d7ba,#8ec9f5)]" />
                  </div>
                  <p className="mt-3 text-sm text-charcoal-soft">
                    Cleaner air detected after 12 minutes of adaptive purification.
                  </p>
                </div>

                <div className="space-y-3">
                  {appHighlights.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.25rem] border border-border/70 bg-white/90 p-4 text-sm leading-7 text-charcoal-soft"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
