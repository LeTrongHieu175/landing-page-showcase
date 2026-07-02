import { Reveal } from "@/components/ui/Reveal";
import { SectionTitle } from "@/components/ui/SectionTitle";

const specs = [
  { label: "Coverage", value: "Up to 55 m²" },
  { label: "Noise", value: "23–52 dB" },
  { label: "Power", value: "6W standby / 38W max" },
  { label: "Filter", value: "Pre-filter + carbon + HEPA H13" },
  { label: "Connectivity", value: "Wi-Fi 6 + Bluetooth LE" },
  { label: "Sensors", value: "PM2.5, VOC, humidity, temperature" },
  { label: "Dimensions", value: "32 × 32 × 58 cm" },
  { label: "Filter life", value: "Up to 10 months" },
] as const;

export function Specs() {
  return (
    <section id="specs" className="section-anchor section-spacing">
      <div className="shell space-y-12">
        <Reveal>
          <SectionTitle
            eyebrow="Technical specs"
            title="Performance details, clearly presented."
            description="The engineering behind Aera One is tuned for quiet operation, reliable filtration, and a footprint that fits naturally into modern interiors."
            centered
          />
        </Reveal>

        <Reveal delay="short">
          <div className="surface-panel overflow-hidden rounded-[2rem]">
            <table className="min-w-full border-separate border-spacing-0 text-left">
              <thead>
                <tr className="bg-surface-strong/85">
                  <th className="border-b border-border px-6 py-4 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-charcoal-soft">
                    Specification
                  </th>
                  <th className="border-b border-border px-6 py-4 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-charcoal-soft">
                    Aera One
                  </th>
                </tr>
              </thead>
              <tbody>
                {specs.map((item, index) => (
                  <tr
                    key={item.label}
                    className={index % 2 === 0 ? "bg-surface-strong/70" : "bg-surface-muted/60"}
                  >
                    <th
                      scope="row"
                      className="border-b border-border/80 px-6 py-4 text-sm font-semibold text-charcoal"
                    >
                      {item.label}
                    </th>
                    <td className="border-b border-border/80 px-6 py-4 text-sm leading-7 text-charcoal-soft">
                      {item.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
