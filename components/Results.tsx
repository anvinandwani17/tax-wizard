'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { jsPDF } from 'jspdf';

export default function Results({ userData }: any) {
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);

  // ✅ SAFE DATA (no crash)
  const oldTax = userData?.oldRegimeTax || 0;
  const newTax = userData?.newRegimeTax || 0;
  const better = userData?.betterOption || 'NEW';
  const savings = userData?.savings || 0;
  const salary = userData?.grossSalary || 0;

  // 📊 Chart data
  const chartData = [
    { name: 'Old', tax: oldTax },
    { name: 'New', tax: newTax },
  ];

  // 🎤 VOICE
  const speakExplanation = () => {
    if (!('speechSynthesis' in window)) {
      alert('Voice not supported');
      return;
    }

    const text = `
      Your salary is ${salary} rupees.
      ${better} regime is better for you.
      You save ${savings} rupees.
    `;

    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  // 📄 PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Tax Wizard Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Salary: ₹${salary}`, 20, 40);
    doc.text(`80C: ₹${userData.section80C || 0}`, 20, 50);
    doc.text(`HRA: ₹${userData.hra || 0}`, 20, 60);

    doc.text(`Old Regime Tax: ₹${oldTax}`, 20, 80);
    doc.text(`New Regime Tax: ₹${newTax}`, 20, 90);
    doc.text(`Best Option: ${better}`, 20, 100);
    doc.text(`Savings: ₹${savings}`, 20, 110);

    // Ensure strict filename and extension
    const pdfBlob = doc.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);
    
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = "Tax_Record.pdf";
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };

  // 🤖 GEN AI EXPLANATION
  const askAI = async () => {
    setLoadingAi(true);
    setAiAnalysis('');
    try {
      const res = await fetch('/api/ai_explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grossSalary: salary,
          oldRegimeTax: oldTax,
          newRegimeTax: newTax,
          betterOption: better,
          savings: savings
        }),
      });
      const data = await res.json();
      setAiAnalysis(data.explanation || 'AI failed to generate explanation.');
    } catch (err) {
      setAiAnalysis('An error occurred calling AI.');
    }
    setLoadingAi(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid md:grid-cols-3 gap-6 mt-6"
    >

      {/* LEFT PANEL */}
      <div className="bg-white rounded-2xl shadow-lg p-5 space-y-4">
        <h2 className="font-bold text-lg">📊 Your Data</h2>

        <div className="bg-gray-100 p-4 rounded-xl text-sm space-y-2">
          <p>Gross Income: ₹{salary}</p>
          <p>80C: ₹{userData.section80C || 0}</p>
          <p>HRA: ₹{userData.hra || 0}</p>
        </div>

        {/* GEN AI BUTTON */}
        <hr className="my-4 border-gray-200" />
        <h2 className="font-bold text-lg text-indigo-700">🤖 AI Tax Advisor</h2>
        <button
          onClick={askAI}
          disabled={loadingAi}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-2 rounded-xl transition duration-300 shadow shadow-indigo-300 font-medium"
        >
          {loadingAi ? 'Thinking...' : 'Get Smart AI Review'}
        </button>

        {aiAnalysis && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 bg-indigo-50 p-4 rounded-xl text-sm text-indigo-900 leading-relaxed border border-indigo-100 overflow-hidden"
          >
            {aiAnalysis.split('\n').map((line, idx) => (
              <p key={idx} className="mb-2 last:mb-0">
                {line}
              </p>
            ))}
          </motion.div>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6 space-y-6">

        <h2 className="text-xl font-bold text-gray-800">
          💰 Your Tax Results Summary
        </h2>

        {/* CARDS */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-100 p-4 rounded-xl text-center">
            <p className="text-gray-600">Old Regime</p>
            <p className="text-xl font-bold text-red-700">₹{oldTax}</p>
          </div>

          <div className="bg-green-100 p-4 rounded-xl text-center">
            <p className="text-gray-600">New Regime</p>
            <p className="text-xl font-bold text-green-700">₹{newTax}</p>
          </div>
        </div>

        {/* 📊 CHART */}
        <div className="h-60 mt-4 mb-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '10px' }} />
              <Bar dataKey="tax" radius={[10, 10, 0, 0]} fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* RESULT */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-2xl text-center shadow-inner border border-blue-200">
          <p className="font-bold text-xl text-blue-900 mb-1">
            🎯 Recommended: {better}
          </p>
          <p className="text-green-600 font-bold block bg-green-50 rounded-lg inline-block px-4 py-1 border border-green-200 mt-2">
            💸 You save top up to ₹{savings}
          </p>
        </div>

        {/* BUTTONS */}
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={downloadPDF}
            className="bg-blue-600 hover:bg-blue-700 transition text-white py-2.5 rounded-xl font-medium shadow"
          >
            📥 PDF
          </button>

          <button
            onClick={speakExplanation}
            className="bg-purple-600 hover:bg-purple-700 transition text-white py-2.5 rounded-xl font-medium shadow flex items-center justify-center gap-2"
          >
            🔊 Listen
          </button>

          <button
            onClick={() =>
              window.open(
                `https://wa.me/?text=I saved ₹${savings} using Tax Wizard 🚀`
              )
            }
            className="bg-green-500 hover:bg-green-600 transition text-white py-2.5 rounded-xl font-medium shadow flex items-center justify-center gap-2"
          >
            📲 Share
          </button>
        </div>

      </div>
    </motion.div>
  );
}