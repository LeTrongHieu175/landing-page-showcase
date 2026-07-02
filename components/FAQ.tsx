import { ChevronDown } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

const faqs = [
  {
    answer:
      "The multi-layer filter typically lasts 8 to 10 months, depending on room size, airflow demand, and pollution levels. The Aera One app sends a reminder before replacement is due.",
    question: "How often do I need to replace the filter?",
  },
  {
    answer:
      "Yes. Quiet Night Mode drops fan noise to a whisper-soft level while dimming the status glow, making it suitable for sleep-focused environments.",
    question: "Is it quiet enough for a bedroom at night?",
  },
  {
    answer:
      "Aera One covers spaces up to 55 m² effectively, making it a strong fit for bedrooms, shared living areas, and compact studio apartments.",
    question: "What room size is Aera One designed for?",
  },
  {
    answer:
      "You can monitor air quality, switch modes, schedule purification windows, and receive filter reminders directly from the mobile companion app.",
    question: "What can I control from the app?",
  },
] as const;

export function FAQ() {
  return (
    <section id="faq" className="section-anchor section-spacing">
      <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <SectionTitle
            eyebrow="FAQs"
            title="Everything you need to know before bringing Aera One home."
            description="Fast answers for setup, quiet operation, filter life, and app control."
          />
        </Reveal>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <Reveal
              key={item.question}
              delay={index % 3 === 0 ? "none" : index % 3 === 1 ? "short" : "medium"}
            >
              <details
                className="group surface-panel overflow-hidden rounded-[1.75rem]"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-base font-semibold text-charcoal transition-colors duration-300 ease-out hover:text-charcoal-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/70">
                  <span>{item.question}</span>
                  <ChevronDown
                    className="h-5 w-5 shrink-0 transition-transform duration-300 ease-out group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-6 pb-6 text-sm leading-7 text-charcoal-soft">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
