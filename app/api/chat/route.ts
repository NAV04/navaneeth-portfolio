import { NextResponse } from "next/server";
import { portfolioKnowledge } from "@/app/lib/portfolioKnowledge";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Server is missing OPENROUTER_API_KEY." },
        { status: 500 },
      );
    }

    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid payload. 'message' is required." },
        { status: 400 },
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [
            {
              role: "system",
              content: `
You are Navaneeth A D's AI portfolio assistant.

You must ONLY answer based on the information below.
If a question is unrelated, politely say you only answer questions about Navaneeth's work.
Speak in a friendly student-like tone, not overly corporate.
Keep responses short: 2-5 lines max, or up to 4 concise bullet points.
Do not start with long greetings or repeated introductions.
Answer directly and naturally.

Knowledge Base:
${portfolioKnowledge}
`,
            },
            {
              role: "user",
              content: message,
            },
          ],
          temperature: 0.3,
          max_tokens: 220,
        }),
      },
    );

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { error: `OpenRouter request failed: ${errText}` },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json({
      reply: data?.choices?.[0]?.message?.content ?? "No response.",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
