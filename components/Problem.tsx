import { Dog, Flower2, ShieldAlert, Wind } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

const concerns = [
  {
    description:
      "Invisible fine dust can build up indoors faster than expected, especially in dense urban environments.",
    icon: Wind,
    title: "PM2.5 drift",
  },
  {
    description:
      "Seasonal pollen often lingers in bedrooms and shared spaces, making everyday breathing feel heavier.",
    icon: Flower2,
    title: "Pollen exposure",
  },
  {
    description:
      "Pet hair and dander circulate constantly, even in homes that look spotless on the surface.",
    icon: Dog,
    title: "Pet hair and dander",
  },
  {
    description:
      "Allergens and odor molecules can collect quietly, lowering comfort before you even notice a change in the room.",
    icon: ShieldAlert,
    title: "Hidden irritants",
  },
] as const;

export function Problem() {
  return (
    <section className="section-spacing border-b border-border/60">
      <div className="shell grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <Reveal>
          <SectionTitle
            eyebrow="Indoor air problem"
            title="Air quality at home changes faster than most routines can keep up with."
            description="From drifting PM2.5 to pet dander and allergens, indoor air pollution can quietly affect sleep, focus, and comfort throughout the day."
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {concerns.map((concern, index) => {
            const Icon = concern.icon;

            return (
              <Reveal
                key={concern.title}
                delay={index % 2 === 0 ? "short" : "medium"}
              >
                <Card className="h-full p-6">
                  <div className="mb-4 inline-flex rounded-2xl border border-ice-blue/70 bg-ice-blue/75 p-3 text-charcoal">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-charcoal">
                    {concern.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-charcoal-soft">
                    {concern.description}
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
