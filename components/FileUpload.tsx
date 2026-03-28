'use client';
import { useState } from 'react';

export default function FileUpload({
  onUpload,
}: {
  onUpload: (d: any) => void;
}) {
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload-form16', {
        method: 'POST',
        body: formData,
      });

      // ❗ important check
      if (!res.ok) {
        throw new Error('Upload failed');
      }

      const data = await res.json();
      console.log("UPLOAD DATA:", data);

      onUpload(data);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <label className="block border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center cursor-pointer bg-white hover:bg-blue-50 transition">

      {/* INPUT */}
      <input
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleChange}
      />

      {/* UI */}
      <div className="flex flex-col items-center gap-3">

        <p className="text-4xl">📄</p>

        <p className="font-semibold text-lg">
          {loading ? "Uploading..." : "Upload Form 16 PDF"}
        </p>

        <p className="text-sm text-gray-500">
          Click to upload your tax document
        </p>

        {/* FILE NAME */}
        {fileName && !loading && (
          <p className="text-green-600 mt-2 font-medium">
            ✔ {fileName}
          </p>
        )}

        {/* LOADING */}
        {loading && (
          <p className="text-blue-600 text-sm animate-pulse">
            Processing...
          </p>
        )}

      </div>
    </label>
  );
}