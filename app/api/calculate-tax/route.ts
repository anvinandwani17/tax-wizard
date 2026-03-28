import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const salary = body.grossSalary || 0;
  const sec80c = body.section80C || 0;
  const hra = body.hra || 0;

  const standardDeduction = 50000;

  // OLD REGIME CALCULATION
  const oldDeductions = standardDeduction + Math.min(sec80c, 150000) + hra;
  const taxableOld = Math.max(0, salary - oldDeductions);
  
  let oldTax = 0;
  if (taxableOld > 250000) {
    if (taxableOld <= 500000) {
      oldTax = (taxableOld - 250000) * 0.05;
    } else if (taxableOld <= 1000000) {
      oldTax = 12500 + (taxableOld - 500000) * 0.20;
    } else {
      oldTax = 112500 + (taxableOld - 1000000) * 0.30;
    }
  }
  // 87A Rebate for Old Regime (up to 5L)
  if (taxableOld <= 500000) oldTax = 0;
  
  // Cess
  oldTax = oldTax * 1.04;

  // NEW REGIME CALCULATION (FY 23-24 onwards)
  const taxableNew = Math.max(0, salary - standardDeduction);
  
  let newTax = 0;
  if (taxableNew > 300000) {
    if (taxableNew <= 600000) {
      newTax = (taxableNew - 300000) * 0.05;
    } else if (taxableNew <= 900000) {
      newTax = 15000 + (taxableNew - 600000) * 0.10;
    } else if (taxableNew <= 1200000) {
      newTax = 45000 + (taxableNew - 900000) * 0.15;
    } else if (taxableNew <= 1500000) {
      newTax = 90000 + (taxableNew - 1200000) * 0.20;
    } else {
      newTax = 150000 + (taxableNew - 1500000) * 0.30;
    }
  }
  // 87A Rebate for New Regime (up to 7L)
  if (taxableNew <= 700000) newTax = 0;

  // Cess
  newTax = newTax * 1.04;

  const better = oldTax <= newTax ? "OLD" : "NEW";
  const savings = Math.abs(oldTax - newTax);

  return NextResponse.json({
    grossSalary: salary,
    section80C: sec80c,
    hra: hra,
    oldRegimeTax: Math.round(oldTax),
    newRegimeTax: Math.round(newTax),
    betterOption: better,
    savings: Math.round(savings),
  });
}