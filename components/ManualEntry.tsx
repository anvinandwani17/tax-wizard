'use client';
import { useState } from 'react';

export default function ManualEntry({
  onSubmit,
}: {
  onSubmit: (d: any) => void;
}) {
  const [salary, setSalary] = useState('');
  const [hra, setHra] = useState('');
  const [ded80c, setDed80C] = useState('');

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const payload = {
          grossSalary: Number(salary),
          section80C: Number(ded80c),
          hra: Number(hra),
        };

        const res = await fetch('/api/calculate-tax', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        onSubmit(data);
      }}
      className="bg-white p-6 rounded-xl shadow max-w-md mx-auto"
    >
      <h2 className="text-lg font-bold mb-4 text-center">
        Enter Details
      </h2>

      <input
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        type="number"
        placeholder="80C"
        value={ded80c}
        onChange={(e) => setDed80C(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        type="number"
        placeholder="HRA"
        value={hra}
        onChange={(e) => setHra(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <button className="w-full bg-blue-600 text-white py-2 rounded">
        Calculate
      </button>
    </form>
  );
}