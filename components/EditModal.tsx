'use client';

import React, { useState } from 'react';
import { TableRow } from '@/lib/jsonParser';

interface EditModalProps {
  row: TableRow;
  onSave: (row: TableRow) => void;
  onClose: () => void;
}

export default function EditModal({ row, onSave, onClose }: EditModalProps) {
  const [editedRow, setEditedRow] = useState<TableRow>(row);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedRow);
  };

  const updateField = (field: keyof TableRow, value: string | number) => {
    setEditedRow((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-cyan-500/10 to-blue-500/10 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Soal
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-8 space-y-6">
            {/* Pertanyaan */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Pertanyaan
              </label>
              <textarea
                value={editedRow.pertanyaan}
                onChange={(e) => updateField('pertanyaan', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 min-h-[100px] resize-y"
                placeholder="Masukkan pertanyaan..."
              />
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['A', 'B', 'C', 'D', 'E'].map((opt) => (
                <div key={opt} className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">
                    Opsi {opt}
                  </label>
                  <textarea
                    value={editedRow[`option${opt}` as keyof TableRow] as string}
                    onChange={(e) => updateField(`option${opt}` as keyof TableRow, e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 min-h-20 resize-y mb-3"
                    placeholder={`Masukkan opsi ${opt}...`}
                  />
                  <div>
                    <label className="block text-xs font-medium text-amber-400 mb-1">
                      Score {opt}
                    </label>
                    <input
                      type="number"
                      value={editedRow[`score${opt}` as keyof TableRow] as number}
                      onChange={(e) => updateField(`score${opt}` as keyof TableRow, parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
                      placeholder="0"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Correct Answer */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Jawaban Benar
              </label>
              <div className="flex gap-2">
                {['A', 'B', 'C', 'D', 'E'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => updateField('correctAnswer', opt)}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                      editedRow.correctAnswer === opt
                        ? 'bg-linear-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-900/50'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Pembahasan */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Pembahasan
              </label>
              <textarea
                value={editedRow.pembahasan}
                onChange={(e) => updateField('pembahasan', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 min-h-[120px] resize-y"
                placeholder="Masukkan pembahasan..."
              />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-700 px-6 py-4 bg-slate-900/50 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg transition-all shadow-lg shadow-cyan-900/50 font-medium"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
