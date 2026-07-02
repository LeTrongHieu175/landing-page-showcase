const productKnowledge = [
  {
    answer:
      "Aera One covers rooms up to 55 m² comfortably. It works especially well in bedrooms, living rooms, compact apartments, and focused workspaces.",
    id: "coverage",
    suggestions: [
      "Is it quiet enough for bedrooms?",
      "How often should I replace the filter?",
      "What can I control from the app?",
    ],
    triggers: [
      "coverage",
      "room size",
      "55",
      "m2",
      "m²",
      "square meter",
      "apartment",
      "bedroom",
      "living room",
    ],
  },
  {
    answer:
      "In Quiet Night Mode, Aera One runs as low as 23 dB. It is designed for sleep-friendly airflow while dimming status lighting for a calmer room.",
    id: "noise",
    suggestions: [
      "What is Quiet Night Mode?",
      "What sensors does it have?",
      "Can I schedule it from the app?",
    ],
    triggers: [
      "quiet",
      "noise",
      "db",
      "decibel",
      "bedroom",
      "night mode",
      "sleep",
      "loud",
    ],
  },
  {
    answer:
      "The filter system combines a pre-filter, activated carbon, and HEPA H13 filtration. Filter life is typically up to 10 months, and the app sends replacement reminders.",
    id: "filter",
    suggestions: [
      "Does it help with pet hair and dander?",
      "What pollutants can it detect?",
      "How does auto purification work?",
    ],
    triggers: [
      "filter",
      "hepa",
      "h13",
      "replace",
      "replacement",
      "months",
      "maintenance",
      "carbon",
    ],
  },
  {
    answer:
      "Aera One can detect PM2.5, VOCs, humidity, and temperature. Those readings feed the auto purification logic so airflow adjusts in real time.",
    id: "sensors",
    suggestions: [
      "How does auto mode work?",
      "Can I see live air quality?",
      "What can I control from the app?",
    ],
    triggers: [
      "sensor",
      "sensors",
      "pm2.5",
      "voc",
      "humidity",
      "temperature",
      "detect",
      "air quality",
    ],
  },
  {
    answer:
      "From the app, you can monitor live air score, switch modes, schedule purification windows, and get filter reminders. Connectivity is Wi-Fi 6 plus Bluetooth LE.",
    id: "app",
    suggestions: [
      "Can it run automatically?",
      "How quiet is it at night?",
      "What room size is it built for?",
    ],
    triggers: [
      "app",
      "phone",
      "mobile",
      "wifi",
      "wi-fi",
      "bluetooth",
      "schedule",
      "control",
    ],
  },
  {
    answer:
      "Auto purification mode uses the onboard sensors to react to changing air conditions. It raises or lowers fan power automatically so you do not need to keep tuning it manually.",
    id: "auto-mode",
    suggestions: [
      "What does it detect?",
      "Can I still control it manually?",
      "Is it suitable for bedrooms?",
    ],
    triggers: [
      "auto",
      "automatic",
      "auto mode",
      "purification",
      "smart",
      "intelligent",
      "react",
      "manual",
    ],
  },
  {
    answer:
      "Aera One is built to reduce PM2.5, odors, allergens, pet dander, and stale indoor buildup through its multi-layer filtration and adaptive airflow control.",
    id: "benefits",
    suggestions: [
      "Does it help with pollen?",
      "How often is maintenance needed?",
      "What sensors are built in?",
    ],
    triggers: [
      "allergy",
      "allergies",
      "pollen",
      "odor",
      "smell",
      "pet",
      "dander",
      "dust",
      "benefit",
    ],
  },
  {
    answer:
      "Launch pricing has not been published on this page yet. The fastest way to get first-release offers is to join the launch list from the signup form.",
    id: "price",
    suggestions: [
      "How do I join the launch list?",
      "What features are included?",
      "What room size is it designed for?",
    ],
    triggers: [
      "price",
      "pricing",
      "cost",
      "buy",
      "purchase",
      "launch offer",
      "discount",
    ],
  },
] as const;

const fallbackSuggestions = [
  "What room size is Aera One designed for?",
  "How often do I need to replace the filter?",
  "Is it quiet enough for a bedroom at night?",
] as const;

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s.+-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getChatbotReply(message: string) {
  const normalized = normalizeText(message);

  if (!normalized) {
    return {
      answer:
        "Ask me about coverage, filter life, sensors, app control, quiet night mode, or launch availability.",
      suggestions: [...fallbackSuggestions],
    };
  }

  const scoredEntries = productKnowledge
    .map((entry) => {
      const score = entry.triggers.reduce((total, trigger) => {
        if (normalized.includes(trigger)) {
          return total + Math.max(2, trigger.length > 6 ? 3 : 2);
        }

        const triggerWords = trigger.split(" ");
        const matchedWords = triggerWords.filter((word) => normalized.includes(word)).length;

        return total + matchedWords;
      }, 0);

      return {
        ...entry,
        score,
      };
    })
    .sort((left, right) => right.score - left.score);

  const topMatch = scoredEntries[0];

  if (!topMatch || topMatch.score < 2) {
    return {
      answer:
        "I can help with product questions about room coverage, filter replacement, noise level, sensors, app control, and launch access. Try one of the suggested questions below.",
      suggestions: [...fallbackSuggestions],
    };
  }

  return {
    answer: topMatch.answer,
    suggestions: [...topMatch.suggestions],
  };
}
