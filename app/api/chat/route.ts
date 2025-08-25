import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Safer input formatting
    const result = await model.generateContent([message]);

    // Safer output extraction
    const text =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response";

    return NextResponse.json({ response: text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}
