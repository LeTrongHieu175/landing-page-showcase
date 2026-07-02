import { DeferredLeadForm } from "@/components/DeferredLeadForm";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CheckCircle2, ShieldCheck } from "lucide-react";

const benefitList = [
  "Early launch announcements",
  "Room-by-room air care guidance",
  "First access to introductory pricing",
] as const;

export function LeadForm() {
  return (
    <section id="lead-form" className="section-anchor section-spacing pb-24">
      <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <div className="space-y-6">
            <SectionTitle
              eyebrow="Get updates"
              title="Stay in the loop for launch access, care tips, and first-release offers."
              description="Join the early list and receive launch news, healthy-living insights, and a preview of the Aera One app experience."
            />

            <Card className="p-6">
              <div className="mb-5 inline-flex rounded-2xl border border-mint/20 bg-mint/12 p-3 text-mint-deep">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-charcoal">
                Why subscribe?
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-charcoal-soft">
                {benefitList.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-1 h-4 w-4 shrink-0 text-mint-deep"
                      aria-hidden="true"
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Reveal>

        <Reveal delay="short">
          <DeferredLeadForm />
        </Reveal>
      </div>
    </section>
  );
}
