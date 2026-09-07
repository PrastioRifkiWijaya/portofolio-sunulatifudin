import { Section } from "../Section";
import { Award, Globe, PenTool } from "lucide-react";

const skillGroups = [
  {
    title: "Skills",
    icon: PenTool,
    items: [
      "Leadership",
      "Design — Canva, CorelDRAW",
      "Microsoft Office — Word, Excel, PowerPoint",
    ],
  },
  {
    title: "Languages",
    icon: Globe,
    items: ["Bahasa Indonesia", "Bahasa Inggris", "Bahasa Jawa"],
  },
  {
    title: "Awards & Activities",
    icon: Award,
    items: ["Juara 1 Futsal Tingkat Fakultas"],
  },
];

export default function Skills() {
  return (
    <Section id="skills">
      {/* Heading */}
      <div className="mb-14 text-center">
        <span className="font-desc text-xs font-semibold uppercase tracking-[0.2em] text-primary dark:text-gold">
          Beyond Education
        </span>

        <h2 className="mt-2 font-title text-3xl font-bold tracking-tight text-secondary dark:text-white sm:text-4xl">
          Additional Information
        </h2>

        <div className="mx-auto mt-5 h-1 w-10 rounded-full bg-primary dark:bg-gold" />
      </div>

      {/* Information Grid */}
      <div className="grid gap-x-10 gap-y-12 md:grid-cols-3">
        {skillGroups.map((group) => {
          const Icon = group.icon;

          return (
            <div
              key={group.title}
              className="border-t border-gray-200 pt-6 dark:border-gray-700"
            >
              {/* Icon & Title */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-gold/10 dark:text-gold">
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                </div>

                <h3 className="font-title text-lg font-semibold text-secondary dark:text-white">
                  {group.title}
                </h3>
              </div>

              {/* Items */}
              <ul className="space-y-4">
                {group.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 font-desc text-[15px] leading-6 text-gray-600 dark:text-gray-300"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60 dark:bg-gold/60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
