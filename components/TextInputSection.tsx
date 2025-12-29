import React, { useState } from 'react';
import { getTextFormatExample } from '@/lib/textParser';

interface TextInputSectionProps {
  onSubmit: (textInput: string) => void;
  isLoading: boolean;
}

export default function TextInputSection({ onSubmit, isLoading }: TextInputSectionProps) {
  const [textInput, setTextInput] = useState('');
  const [showExample, setShowExample] = useState(false);

  const handleSubmit = () => {
    if (!textInput.trim()) return;
    onSubmit(textInput);
  };

  const loadExample = () => {
    setTextInput(getTextFormatExample());
    setShowExample(false);
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl backdrop-blur-sm overflow-hidden">
      <div className="p-6 border-b border-slate-800/50">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Input Format Text
          </h3>
          <button
            onClick={() => setShowExample(!showExample)}
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            {showExample ? 'Sembunyikan' : 'Lihat'} Contoh Format
          </button>
        </div>
      </div>

      {showExample && (
        <div className="p-6 bg-slate-800/30 border-b border-slate-800/50">
          <div className="flex items-start justify-between gap-4 mb-3">
            <p className="text-sm text-slate-400">Format yang diharapkan:</p>
            <button
              onClick={loadExample}
              className="text-xs px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white rounded transition-colors"
            >
              Load Contoh
            </button>
          </div>
          <pre className="text-xs text-slate-300 bg-slate-950/50 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
{`1. Soal
[Pertanyaan soal]

Pilihan ganda:
A. [Opsi A]
B. [Opsi B]
C. [Opsi C]
D. [Opsi D]
E. [Opsi E]

Pembahasan:
[Penjelasan pembahasan]
Jawaban: [A/B/C/D/E]

2. Soal
[Pertanyaan soal kedua]
...`}
          </pre>
        </div>
      )}

      <div className="p-6">
        <textarea
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Paste text soal di sini dengan format yang sudah ditentukan..."
          className="w-full h-96 px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-lg text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all font-mono text-sm resize-y"
          disabled={isLoading}
        />
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-slate-500">
            Kategori default: &quot;umum&quot; (bisa di-edit nanti)
          </p>
          <button
            onClick={handleSubmit}
            disabled={!textInput.trim() || isLoading}
            className="px-6 py-2.5 bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-lg transition-all shadow-lg shadow-amber-900/50 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </span>
            ) : (
              'Parse Text'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
