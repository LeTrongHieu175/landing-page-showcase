# Aera One Landing Page

Production-ready landing page for the fictional `Aera One` smart air purifier, built with `Next.js 15`, `React 19`, `TypeScript`, and `Tailwind CSS v4`.

## Requirements

- Node.js 20 or newer
- npm 10 or newer

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The site will be available at `http://localhost:3000`.

## Environment Variables

Copy `.env.example` to `.env.local` and update the values:

```bash
cp .env.example .env.local
```

Required:

- `NEXT_PUBLIC_SITE_URL`
- `SUBSCRIBE_WEBHOOK_URL`

Optional:

- `SUBSCRIBE_WEBHOOK_TOKEN`

## Webhook Configuration

The lead form posts to `POST /api/subscribe`, which validates and sanitizes the payload before forwarding it to `SUBSCRIBE_WEBHOOK_URL`.

If `SUBSCRIBE_WEBHOOK_TOKEN` is present, the webhook request includes:

```http
Authorization: Bearer <token>
```

Forwarded payload:

```json
{
  "source": "aera-one-landing-page",
  "submittedAt": "2026-07-02T08:00:00.000Z",
  "fullName": "Jordan Rivera",
  "email": "jordan@example.com",
  "phone": "+1 415 555 0137",
  "consent": true,
  "meta": {
    "userAgent": "Mozilla/5.0 ...",
    "referrer": "https://aera-one.vercel.app/"
  }
}
```

When `phone` is omitted, it is forwarded as `null`.

## Quality Checks

```bash
npm run lint
npm run build
```

## Deployment

This project is ready to deploy on Vercel.

1. Import the repository into Vercel.
2. Set the environment variables:
   - `NEXT_PUBLIC_SITE_URL`
   - `SUBSCRIBE_WEBHOOK_URL`
   - `SUBSCRIBE_WEBHOOK_TOKEN` if needed
3. Deploy.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript (strict mode)
- Tailwind CSS v4
- Zod
- lucide-react
- clsx
- tailwind-merge
