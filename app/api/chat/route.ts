import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { EVENT, FAQ, AGENDA, PRIZES } from "@/lib/constants";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are the on-page assistant for the Jobbyist Webinar Series landing page.
You answer visitor questions about ONLY this event — nothing else. Be brief (2-4 sentences),
warm, and confident. If asked something unrelated to the webinar or Jobbyist, politely redirect
to the registration form.

Event: ${EVENT.series} — ${EVENT.episode}: ${EVENT.name}
Date: ${EVENT.displayDate} at ${EVENT.displayTime}, hosted on ${EVENT.platform}.
Description: ${EVENT.description}
Host: ${EVENT.host.name} — ${EVENT.host.tagline}

Agenda: ${AGENDA.map((a) => `${a.time} ${a.title}`).join(", ")}
Prizes: ${PRIZES.map((p) => p.title).join(", ")}
FAQ you already have answers to: ${FAQ.map((f) => f.q).join(" | ")}

Always end by encouraging the visitor to reserve their seat if they haven't already.`;

interface ChatRequestBody {
  message: string;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
}

/**
 * POST /api/chat
 * Lightweight chatbot answering webinar-specific questions, backed
 * by the Claude Messages API. Requires ANTHROPIC_API_KEY.
 */
export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const { success } = await rateLimit(`chat:${ip}`, 15, 60_000);
  if (!success) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error: "chat_not_configured",
        reply:
          "Our AI assistant isn't switched on just yet — but check the FAQ below, or reserve your seat and we'll email you directly!",
      },
      { status: 200 }
    );
  }

  let body: ChatRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!body.message || body.message.length > 600) {
    return NextResponse.json({ ok: false, error: "invalid_message" }, { status: 400 });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: [
          ...(body.history ?? []).slice(-6),
          { role: "user", content: body.message },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error(`[api/chat] Claude API error ${res.status}: ${errText}`);
      return NextResponse.json(
        { ok: false, error: "upstream_error", reply: "Sorry, I couldn't process that just now — try again in a moment." },
        { status: 200 }
      );
    }

    const json = (await res.json()) as {
      content: Array<{ type: string; text?: string }>;
    };
    const reply = json.content.find((c) => c.type === "text")?.text ?? "";

    return NextResponse.json({ ok: true, reply });
  } catch (err) {
    console.error("[api/chat] request failed:", err);
    return NextResponse.json(
      { ok: false, error: "network_error", reply: "Sorry, something went wrong. Please try again." },
      { status: 200 }
    );
  }
}
