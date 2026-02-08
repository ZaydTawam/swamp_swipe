import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { listings } from "@/data/listings";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are a helpful apartment finder assistant for UF (University of Florida) students.
The user will describe what they're looking for in an apartment in natural language.

Extract these preferences from their message:
- minPrice: number (minimum monthly rent, default 500)
- maxPrice: number (maximum monthly rent, default 2000)
- beds: number (1-4, default 2)
- commuteMode: "walking" | "biking" | "driving" | "bus" (default "biking")
- maxCommuteTime: number in minutes (default 20)
- liveliness: 1-5 where 1=very quiet, 5=very lively/party (default 3)

If the user message contains NO apartment preferences at all (just a greeting, random question, etc), respond with exactly:
{"error": "no_preferences"}

Otherwise, respond with ONLY a valid JSON object with the extracted preferences. Use defaults for any preference not mentioned.

Examples:
- "I want a cheap 1 bedroom" -> {"minPrice":500,"maxPrice":800,"beds":1,"commuteMode":"biking","maxCommuteTime":20,"liveliness":3}
- "Looking for a quiet place near campus I can bike to" -> {"minPrice":500,"maxPrice":2000,"beds":2,"commuteMode":"biking","maxCommuteTime":10,"liveliness":1}
- "hello" -> {"error": "no_preferences"}

User message: "${message}"

Respond with ONLY the JSON object, no markdown, no explanation.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    if (parsed.error === "no_preferences") {
      return NextResponse.json({ type: "need_details" });
    }

    // Score and rank listings based on extracted preferences
    const scored = listings
      .map((listing) => {
        let score = 0;

        if (listing.price >= parsed.minPrice && listing.price <= parsed.maxPrice) {
          score += 50;
        }

        if (listing.floorplan.beds === parsed.beds) {
          score += 15;
        }

        const commuteTime = listing.commuteMins[parsed.commuteMode as keyof typeof listing.commuteMins];
        if (commuteTime <= parsed.maxCommuteTime) {
          score += 25;
        }

        const livelinessDiff = Math.abs(listing.liveliness - parsed.liveliness);
        score += Math.max(0, 10 - livelinessDiff * 2);

        return { ...listing, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    return NextResponse.json({
      type: "results",
      preferences: parsed,
      listings: scored,
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
