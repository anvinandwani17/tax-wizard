import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const { grossSalary, betterOption, savings, extraSavings } = data;

    const message = `
Aapka salary ₹${grossSalary} hai.

Agar aap ${betterOption} regime choose karte ho,
toh aap ₹${savings} tax bacha sakte ho.

Aur agar aap proper investments karein,
toh extra ₹${extraSavings} aur save kar sakte ho 💰

Smart planning se aap total ₹${savings + extraSavings} bacha sakte ho.
    `;

    return NextResponse.json({
      success: true,
      explanation: message.trim()
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to generate explanation"
    });
  }
}