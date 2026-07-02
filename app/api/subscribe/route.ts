import { NextResponse } from "next/server";

import { MAX_SUBSCRIBE_PAYLOAD_BYTES, parseSubscribePayload } from "@/lib/validation";
import { deliverSubscription } from "@/lib/webhook";

const METHOD_NOT_ALLOWED_BODY = {
  ok: false,
  message: "Method not allowed.",
} as const;

const JSON_CONTENT_TYPE = "application/json";

function jsonResponse(status: number, message: string) {
  return NextResponse.json(
    {
      ok: false,
      message,
    },
    { status },
  );
}

function methodNotAllowed() {
  return NextResponse.json(METHOD_NOT_ALLOWED_BODY, {
    status: 405,
    headers: {
      Allow: "POST",
    },
  });
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type");

  if (!contentType || !contentType.toLowerCase().startsWith(JSON_CONTENT_TYPE)) {
    return jsonResponse(415, "Only JSON requests are supported.");
  }

  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_SUBSCRIBE_PAYLOAD_BYTES) {
    return jsonResponse(413, "Request body is too large.");
  }

  let rawBody = "";

  try {
    rawBody = await request.text();
  } catch {
    return jsonResponse(400, "Unable to read request body.");
  }

  if (Buffer.byteLength(rawBody, "utf8") > MAX_SUBSCRIBE_PAYLOAD_BYTES) {
    return jsonResponse(413, "Request body is too large.");
  }

  let parsedJson: unknown;

  try {
    parsedJson = JSON.parse(rawBody);
  } catch {
    return jsonResponse(400, "Malformed JSON payload.");
  }

  const parsedResult = parseSubscribePayload(parsedJson);

  if (!parsedResult.success) {
    return jsonResponse(400, parsedResult.message);
  }

  try {
    await deliverSubscription(parsedResult.data, {
      referrer:
        request.headers.get("referer") ?? request.headers.get("referrer") ?? undefined,
      userAgent: request.headers.get("user-agent") ?? undefined,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to forward the subscription at the moment.";

    return jsonResponse(502, message);
  }

  return NextResponse.json(
    {
      ok: true,
      message: "Thanks for subscribing.",
    },
    { status: 200 },
  );
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const OPTIONS = methodNotAllowed;
export const HEAD = methodNotAllowed;
