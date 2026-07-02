export type SubscribeFormInput = {
  consent: boolean;
  email: string;
  fullName: string;
  phone: string;
};

export type SanitizedSubscribePayload = {
  consent: true;
  email: string;
  fullName: string;
  phone: string | null;
};

export type SubscribeApiResponse = {
  message: string;
  ok: boolean;
};

export type WebhookPayload = {
  consent: true;
  email: string;
  fullName: string;
  meta: {
    referrer?: string;
    userAgent?: string;
  };
  phone: string | null;
  source: "aera-one-landing-page";
  submittedAt: string;
};
