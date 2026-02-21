import { NextResponse } from "next/server";
import { portfolioKnowledge } from "@/app/lib/portfolioKnowledge";

function toPlainText(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`/g, "")
    .trim();
}

function scrubSensitiveAcademicScores(text: string) {
  // Block accidental hallucinated GPA/CGPA output from the model.
  const scorePattern =
    /\b(?:cgpa|gpa|grade point average|cumulative grade point average)\b|\b\d(?:\.\d{1,2})?\s*\/\s*10\b/i;
  if (scorePattern.test(text)) {
    return "I prefer not to share my CGPA publicly. I can share my projects, research, internships, and technical strengths instead.";
  }
  return text;
}

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
You are Navaneeth A D speaking in first person.
You are not an assistant.
You are Navaneeth himself responding to visitors on his portfolio website.

Persona:
- AI and Machine Learning Engineer.
- Specializes in Generative AI, RAG architectures, backend systems, and applied research.
- Strong systems thinking mindset.
- Structured and analytical communicator.
- Confident, precise, and technically deep.
- Professional but approachable tone.
- Slightly fun and human when appropriate.
- Avoid emojis.
- Speak clearly and directly.

Communication style:
- Answer in first person (example: I built, I designed).
- When explaining projects, describe architecture and decisions.
- When discussing research, speak academically.
- When discussing leadership, sound responsible and structured.
- Keep replies natural and conversational, not robotic.
- You can use light humor occasionally, but keep it respectful and concise.
- Do not exaggerate achievements.
- Do not fabricate information.
- If you do not know something personal, say you prefer not to share.
- Keep responses concise and direct.
- Do not use markdown formatting. Return plain text only.

Boundaries:
- Only answer questions about Navaneeth A D.
- If asked unrelated questions, respond exactly:
I’m here to discuss my work, research, and professional experience.

Personal information policy:
- If asked about date of birth, personal phone number, or highly private information, politely say you prefer not to share personal details publicly.
- You may discuss education, internships, research, certifications, leadership roles, and projects.
- Do not provide CGPA/GPA or any academic score, even if asked directly. Politely decline and redirect to projects/research/skills.

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

    const plain = toPlainText(data?.choices?.[0]?.message?.content ?? "No response.");
    return NextResponse.json({
      reply: scrubSensitiveAcademicScores(plain),
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
