import type { SanitizedSubscribePayload, WebhookPayload } from "@/types/subscribe";

const WEBHOOK_TIMEOUT_MS = 5_000;

type RequestMeta = {
  referrer?: string;
  userAgent?: string;
};

function getWebhookUrl() {
  const webhookUrl = process.env.SUBSCRIBE_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    throw new Error("Subscription webhook is not configured.");
  }

  return webhookUrl;
}

function buildWebhookPayload(
  input: SanitizedSubscribePayload,
  meta: RequestMeta,
): WebhookPayload {
  return {
    consent: true,
    email: input.email,
    fullName: input.fullName,
    meta: {
      referrer: meta.referrer,
      userAgent: meta.userAgent,
    },
    phone: input.phone,
    source: "aera-one-landing-page",
    submittedAt: new Date().toISOString(),
  };
}

export async function deliverSubscription(
  input: SanitizedSubscribePayload,
  meta: RequestMeta,
) {
  const webhookUrl = getWebhookUrl();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    const webhookToken = process.env.SUBSCRIBE_WEBHOOK_TOKEN?.trim();
    if (webhookToken) {
      headers.Authorization = `Bearer ${webhookToken}`;
    }

    const response = await fetch(webhookUrl, {
      body: JSON.stringify(buildWebhookPayload(input, meta)),
      cache: "no-store",
      headers,
      method: "POST",
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error("Webhook delivery failed upstream.");
    }
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Webhook request timed out.");
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Webhook delivery failed.");
  } finally {
    clearTimeout(timeoutId);
  }
}
