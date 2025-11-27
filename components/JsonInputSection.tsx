'use client';

import React, { useState } from 'react';

interface JsonInputSectionProps {
  onSubmit: (jsonString: string) => void;
  isLoading: boolean;
}

export default function JsonInputSection({
  onSubmit,
  isLoading,
}: JsonInputSectionProps) {
  const [jsonInput, setJsonInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(jsonInput);
  };

  const handleSampleData = () => {
    const sampleJson = {
      soal: [
        {
          id: 21357313,
          soal_id: 34547,
          kategori: 'twk',
          pertanyaan:
            'Dalam Pembukaan UUD 1945 juga terdapat frasa "mencerdaskan kehidupan bangsa". Apa yang dimaksud dengan frasa tersebut?',
          pilihan: {
            a: {
              text: 'Membuat bangsa Indonesia semakin kaya secara material',
              poin: 0,
            },
            b: {
              text: 'Membuat bangsa Indonesia semakin kaya secara spiritual',
              poin: 0,
            },
            c: {
              text: 'Membuat bangsa Indonesia semakin cerdas dalam ilmu pengetahuan dan teknologi',
              poin: 5,
            },
            d: {
              text: 'Membuat bangsa Indonesia semakin cerdas dalam kebudayaan',
              poin: 0,
            },
            e: {
              text: 'Membuat bangsa Indonesia semakin cerdas dalam olahraga',
              poin: 0,
            },
          },
          pembahasan:
            'Frasa "mencerdaskan kehidupan bangsa" dalam Pembukaan UUD 1945 mengacu pada upaya untuk meningkatkan kualitas pendidikan dan memajukan ilmu pengetahuan dan teknologi di Indonesia.',
          ragu: false,
          jawaban: 'C',
          kunci: 'C',
          nilai: 5,
          time: 1030,
        },
      ],
    };
    setJsonInput(JSON.stringify(sampleJson, null, 2));
  };

  const handleClear = () => {
    setJsonInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900/50 border border-slate-800/50 rounded-xl backdrop-blur-sm shadow-xl">
      <div className="p-6 border-b border-slate-800/50">
        <h2 className="text-lg font-semibold text-white flex items-center gap-3">
          <div className="w-8 h-8 bg-linear-to-br from-cyan-500/20 to-blue-600/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          Paste JSON
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Paste format JSON soal untuk dikonversi
        </p>
      </div>

      <div className="p-6">
        <div className="relative">
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{"soal": [...]}'
            className="w-full h-[400px] bg-slate-950/50 border border-slate-700 rounded-xl p-4 text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 font-mono text-xs resize-none transition-all"
          />
          {jsonInput && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 bg-slate-800/80 border border-slate-700 rounded text-xs text-slate-400">
                {jsonInput.length} chars
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 border-t border-slate-800/50 space-y-3">
        <button
          type="submit"
          disabled={isLoading || !jsonInput.trim()}
          className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-900/30 disabled:shadow-none"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Convert Sekarang
            </>
          )}
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleSampleData}
            className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-2 px-4 rounded-lg transition-all text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Sample
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-2 px-4 rounded-lg transition-all text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear
          </button>
        </div>

        <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-slate-400 leading-relaxed">
              Format JSON harus memiliki properti <code className="text-cyan-400 bg-cyan-500/10 px-1 py-0.5 rounded">soal</code> berisi array objek dengan struktur: pertanyaan, pilihan (a-e), kunci, dan pembahasan.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
