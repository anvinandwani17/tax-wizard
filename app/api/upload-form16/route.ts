import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file' }, { status: 400 });
    }

    // MOCK OCR PARSED VALUES WITH DETAILED HRA & 80C
    return NextResponse.json({
      grossSalary: 1200000,
      section80C: 150000,
      hra: 50000,
      oldRegimeTax: 124800,
      newRegimeTax: 93600,
      betterOption: "NEW",
      savings: 31200,
    });

  } catch (err) {
    return NextResponse.json({
      grossSalary: 1200000,
      section80C: 150000,
      hra: 50000,
      oldRegimeTax: 124800,
      newRegimeTax: 93600,
      betterOption: "NEW",
      savings: 31200,
    });
  }
}