import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize with your Gemini API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    // Choose a model (gemini-1.5-flash is fast, gemini-1.5-pro is more powerful)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Send the request
    const result = await model.generateContent(message);

    return NextResponse.json({
      response: result.response.text() || "No response",
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}
