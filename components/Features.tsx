import {
  Activity,
  BellRing,
  MoonStar,
  ShieldCheck,
  Sparkles,
  Smartphone,
} from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

const features = [
  {
    description:
      "A high-sensitivity laser sensor detects fine particles in real time and displays live indoor conditions at a glance.",
    icon: Activity,
    title: "Real-time PM2.5 monitoring",
  },
  {
    description:
      "Adaptive logic increases or reduces fan power automatically so your room stays fresh without constant manual tuning.",
    icon: Sparkles,
    title: "Auto purification mode",
  },
  {
    description:
      "Pre-filter, activated carbon, and medical-grade HEPA layers work together to trap dust, odors, and allergens.",
    icon: ShieldCheck,
    title: "Multi-layer HEPA filtration",
  },
  {
    description:
      "When the lights go down, Aera One shifts into a soft-flow mode engineered for deep rest and gentle overnight comfort.",
    icon: MoonStar,
    title: "Quiet night mode",
  },
  {
    description:
      "Switch modes, create schedules, and track room-by-room air quality with intuitive app controls from anywhere.",
    icon: Smartphone,
    title: "App control",
  },
  {
    description:
      "Proactive maintenance alerts tell you exactly when the filter is nearing the end of its service life.",
    icon: BellRing,
    title: "Filter reminders",
  },
] as const;

export function Features() {
  return (
    <section id="features" className="section-anchor section-spacing">
      <div className="shell space-y-12">
        <Reveal>
          <SectionTitle
            eyebrow="Features"
            title="Six essential capabilities built for healthier everyday living."
            description="Aera One combines sensing, filtration, automation, and mobile control into one streamlined experience."
            centered
          />
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Reveal
                key={feature.title}
                delay={index % 3 === 0 ? "none" : index % 3 === 1 ? "short" : "medium"}
              >
                <Card className="h-full p-6">
                  <div className="mb-5 inline-flex rounded-2xl border border-mint/20 bg-mint/12 p-3 text-mint-deep">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-charcoal">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-charcoal-soft">
                    {feature.description}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
