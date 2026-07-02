"use client";

import { LoaderCircle, Send } from "lucide-react";
import { type ChangeEvent, type FormEvent, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  getFieldErrorMap,
  normalizeClientSubscribeInput,
  subscribeFormSchema,
} from "@/lib/validation";
import { cn } from "@/lib/utils";
import type { SubscribeApiResponse, SubscribeFormInput } from "@/types/subscribe";

type FormState = SubscribeFormInput;

const initialFormState: FormState = {
  consent: false,
  email: "",
  fullName: "",
  phone: "",
};

export function LeadFormClient() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [feedback, setFeedback] = useState<SubscribeApiResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setFormState((current) => ({
      ...current,
      [key]: value,
    }));

    setErrors((current) => {
      if (!current[key]) {
        return current;
      }

      return {
        ...current,
        [key]: undefined,
      };
    });
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { checked, name, type, value } = event.target;
    const field = name as keyof FormState;
    updateField(field, (type === "checkbox" ? checked : value) as FormState[keyof FormState]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);

    const normalizedInput = normalizeClientSubscribeInput(formState);
    const validationResult = subscribeFormSchema.safeParse(normalizedInput);

    if (!validationResult.success) {
      setErrors(getFieldErrorMap(validationResult.error));
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/subscribe", {
        body: JSON.stringify(validationResult.data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const result = (await response.json()) as SubscribeApiResponse;

      setFeedback(result);

      if (response.ok && result.ok) {
        setFormState(initialFormState);
      }
    } catch {
      setFeedback({
        message: "Unable to submit right now. Please try again in a moment.",
        ok: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="p-6 sm:p-8">
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-medium text-charcoal">Full name</span>
            <input
              name="fullName"
              type="text"
              autoComplete="name"
              value={formState.fullName}
              onChange={handleChange}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              className="h-12 w-full rounded-2xl border border-border bg-surface-soft px-4 text-sm text-charcoal transition-colors duration-300 ease-out placeholder:text-charcoal-soft/70 focus-visible:border-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/50"
              placeholder="Jordan Rivera"
            />
            {errors.fullName ? (
              <p id="fullName-error" className="text-sm text-danger">
                {errors.fullName}
              </p>
            ) : null}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-charcoal">Email</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={formState.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="h-12 w-full rounded-2xl border border-border bg-surface-soft px-4 text-sm text-charcoal transition-colors duration-300 ease-out placeholder:text-charcoal-soft/70 focus-visible:border-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/50"
              placeholder="jordan@example.com"
            />
            {errors.email ? (
              <p id="email-error" className="text-sm text-danger">
                {errors.email}
              </p>
            ) : null}
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-charcoal">Phone (optional)</span>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              value={formState.phone}
              onChange={handleChange}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className="h-12 w-full rounded-2xl border border-border bg-surface-soft px-4 text-sm text-charcoal transition-colors duration-300 ease-out placeholder:text-charcoal-soft/70 focus-visible:border-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/50"
              placeholder="+1 415 555 0137"
            />
            {errors.phone ? (
              <p id="phone-error" className="text-sm text-danger">
                {errors.phone}
              </p>
            ) : null}
          </label>
        </div>

        <label className="interactive-lift flex items-start gap-3 rounded-2xl border border-border/80 bg-surface-strong/75 p-4">
          <input
            name="consent"
            type="checkbox"
            checked={formState.consent}
            onChange={handleChange}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1 h-4 w-4 rounded border-border text-mint-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/50"
          />
          <span className="space-y-1">
            <span className="block text-sm font-medium text-charcoal">
              I agree to receive updates about Aera One.
            </span>
            <span className="block text-sm leading-6 text-charcoal-soft">
              You can unsubscribe at any time. We use your details only for launch
              updates and product communication.
            </span>
          </span>
        </label>
        {errors.consent ? (
          <p id="consent-error" className="text-sm text-danger">
            {errors.consent}
          </p>
        ) : null}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                Submitting
              </>
            ) : (
              <>
                <Send className="h-4 w-4" aria-hidden="true" />
                Join the list
              </>
            )}
          </Button>
          <p className="text-sm text-charcoal-soft">
            Webhook-backed signup with server-side validation.
          </p>
        </div>

        <div aria-live="polite" role="status">
          {feedback ? (
            <div
              className={cn(
                "rounded-2xl border px-4 py-3 text-sm",
                feedback.ok
                  ? "border-success/20 bg-success/10 text-success"
                  : "border-danger/20 bg-danger/10 text-danger",
              )}
            >
              {feedback.message}
            </div>
          ) : null}
        </div>
      </form>
    </Card>
  );
}
