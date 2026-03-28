'use client';

import { useState } from 'react';
import ManualEntry from '../components/ManualEntry';
import FileUpload from '../components/FileUpload';
import Results from '../components/Results';

export default function Home() {
  const [mode, setMode] = useState<'manual' | 'upload'>('manual');
  const [data, setData] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-8">
        💡 Tax Wizard
      </h1>

      {/* TOGGLE */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setMode('manual')}
          className={`px-4 py-2 rounded-xl transition ${
            mode === 'manual' ? 'bg-blue-600 text-white' : 'bg-gray-300'
          }`}
        >
          Enter Manually
        </button>

        <button
          onClick={() => setMode('upload')}
          className={`px-4 py-2 rounded-xl transition ${
            mode === 'upload' ? 'bg-blue-600 text-white' : 'bg-gray-300'
          }`}
        >
          Upload Form 16
        </button>
      </div>

      {/* ALWAYS SHOW INPUTS */}
      {mode === 'manual' && (
        <ManualEntry onSubmit={setData} />
      )}

      {mode === 'upload' && (
        <FileUpload onUpload={setData} />
      )}

      {/* SHOW RESULTS BELOW THE INPUT */}
      {data && <Results userData={data} />}

    </div>
  );
}