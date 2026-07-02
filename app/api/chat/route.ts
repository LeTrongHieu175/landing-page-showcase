import { NextResponse } from "next/server";
import { z } from "zod";

import { getChatbotReply } from "@/lib/chatbot";

const chatRequestSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, "Please enter a question.")
    .max(400, "Please keep your message under 400 characters."),
});

function jsonResponse(status: number, message: string) {
  return NextResponse.json(
    {
      message,
      ok: false,
      suggestions: [],
    },
    { status },
  );
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type");

  if (!contentType?.toLowerCase().startsWith("application/json")) {
    return jsonResponse(415, "Only JSON requests are supported.");
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, "Malformed JSON payload.");
  }

  const parsedBody = chatRequestSchema.safeParse(body);

  if (!parsedBody.success) {
    return jsonResponse(400, parsedBody.error.issues[0]?.message ?? "Invalid message.");
  }

  const reply = getChatbotReply(parsedBody.data.message);

  return NextResponse.json(
    {
      message: reply.answer,
      ok: true,
      suggestions: reply.suggestions,
    },
    { status: 200 },
  );
}
