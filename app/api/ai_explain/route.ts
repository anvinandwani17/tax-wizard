import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.OPEN_API_KEY || "dummy_key",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      grossSalary,
      oldRegimeTax,
      newRegimeTax,
      betterOption,
      savings
    } = body;

    const prompt = `
You are a smart tax advisor.

User details:
- Salary: ₹${grossSalary}
- Old Regime Tax: ₹${oldRegimeTax}
- New Regime Tax: ₹${newRegimeTax}
- Recommended: ${betterOption}
- Savings: ₹${savings}

Explain in simple Hinglish:
1. Which regime is better and why
2. How user can save more tax
3. Give 2-3 smart tips
Keep it short and friendly.
`;

    const mockText = `Namaste! 👋 Basic analysis for your demo:\n\n1. **${betterOption} Regime is better** because it saves you ₹${savings} compared to the other regime.\n2. **To save more tax**: Consider maximizing your 80C to ₹1.5L if you haven't already, or optimizing your HRA if you pay rent.\n3. **Smart Tip**: Review the new tax slabs every year, as the New Regime is becoming more beneficial by default!`;

    const apiKeyConfigured = process.env.OPENAI_API_KEY || process.env.OPEN_API_KEY;
    if (!apiKeyConfigured || apiKeyConfigured === 'dummy_key') {
      return NextResponse.json({ explanation: mockText });
    }

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      });

      const text = response.choices[0].message.content;
      return NextResponse.json({ explanation: text });
    } catch (openaiError) {
      console.error(openaiError);
      // Fallback if API throws (e.g. invalid key, quota exceeded)
      return NextResponse.json({ explanation: mockText });
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json({ explanation: "Unexpected server issue processing request." });
  }
}