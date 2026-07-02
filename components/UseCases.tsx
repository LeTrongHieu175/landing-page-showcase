import { Baby, BedDouble, BriefcaseBusiness, Building2 } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

const useCases = [
  {
    description:
      "Create a calmer night routine with quieter airflow and cleaner air through the hours you sleep.",
    icon: BedDouble,
    title: "Bedroom",
  },
  {
    description:
      "Reduce stale indoor buildup and stay focused with adaptive purification that reacts before the room feels heavy.",
    icon: BriefcaseBusiness,
    title: "Workspace",
  },
  {
    description:
      "Support gentler breathing conditions for little ones with low-noise operation and filter reminders built in.",
    icon: Baby,
    title: "Nursery",
  },
  {
    description:
      "Cover shared daily life in compact homes with balanced airflow, compact dimensions, and simple app control.",
    icon: Building2,
    title: "Apartment",
  },
] as const;

export function UseCases() {
  return (
    <section className="section-spacing">
      <div className="shell space-y-12">
        <Reveal>
          <SectionTitle
            eyebrow="Use cases"
            title="Designed to fit the places where healthy air matters most."
            description="Whether you are sleeping, working, or caring for family, Aera One adapts to the room without adding noise or friction."
            centered
          />
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;

            return (
              <Reveal
                key={useCase.title}
                delay={index % 4 === 0 ? "none" : index % 4 === 1 ? "short" : "medium"}
              >
                <Card className="h-full p-6">
                  <div className="mb-5 inline-flex rounded-2xl border border-sky/20 bg-sky/12 p-3 text-charcoal">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-charcoal">
                    {useCase.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-charcoal-soft">
                    {useCase.description}
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
