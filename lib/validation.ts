import { z } from "zod";

import type { SanitizedSubscribePayload, SubscribeFormInput } from "@/types/subscribe";

export const MAX_SUBSCRIBE_PAYLOAD_BYTES = 100 * 1024;

function sanitizeText(value: string) {
  return value
    .normalize("NFKC")
    .replace(/<[^>]*>/g, " ")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeEmail(value: string) {
  return sanitizeText(value).toLowerCase();
}

function sanitizePhone(value: string) {
  return sanitizeText(value)
    .replace(/[^\d+\-()\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const fullNameSchema = z.preprocess(
  (value) => (typeof value === "string" ? sanitizeText(value) : value),
  z
    .string({ error: "Please enter your full name." })
    .min(2, "Please enter your full name.")
    .max(80, "Name must be 80 characters or fewer."),
);

const emailSchema = z.preprocess(
  (value) => (typeof value === "string" ? sanitizeEmail(value) : value),
  z
    .string({ error: "Please enter a valid email address." })
    .email("Please enter a valid email address.")
    .max(160, "Email must be 160 characters or fewer."),
);

const phoneSchema = z.preprocess(
  (value) => {
    if (typeof value !== "string") {
      return undefined;
    }

    const sanitized = sanitizePhone(value);
    return sanitized.length > 0 ? sanitized : undefined;
  },
  z
    .string()
    .min(7, "Please enter a valid phone number.")
    .max(32, "Phone number must be 32 characters or fewer.")
    .optional(),
);

const consentSchema = z.literal(true, {
  error: "Please confirm you want to receive updates.",
});

export const subscribeFormSchema = z.object({
  consent: consentSchema,
  email: emailSchema,
  fullName: fullNameSchema,
  phone: phoneSchema,
});

type SubscribeFormSchemaData = z.infer<typeof subscribeFormSchema>;

export function normalizeClientSubscribeInput(
  input: SubscribeFormInput,
): SubscribeFormInput {
  return {
    consent: Boolean(input.consent),
    email: sanitizeEmail(input.email),
    fullName: sanitizeText(input.fullName),
    phone: sanitizePhone(input.phone),
  };
}

export function parseSubscribePayload(input: unknown):
  | { data: SanitizedSubscribePayload; success: true }
  | { message: string; success: false } {
  const result = subscribeFormSchema.safeParse(input);

  if (!result.success) {
    return {
      message: result.error.issues[0]?.message ?? "Invalid subscription payload.",
      success: false,
    };
  }

  return {
    data: {
      consent: true,
      email: result.data.email,
      fullName: result.data.fullName,
      phone: result.data.phone ?? null,
    },
    success: true,
  };
}

export function getFieldErrorMap(error: z.ZodError<SubscribeFormSchemaData>) {
  const flattened = error.flatten().fieldErrors;

  return {
    consent: flattened.consent?.[0],
    email: flattened.email?.[0],
    fullName: flattened.fullName?.[0],
    phone: flattened.phone?.[0],
  };
}
