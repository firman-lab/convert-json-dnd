'use client';

import { TableRow } from '@/lib/jsonParser';

interface DataTableProps {
  data: TableRow[];
  onRowEdit: (row: TableRow) => void;
  onRowDelete: (rowId: string) => void;
}

export default function DataTable({
  data,
  onRowEdit,
  onRowDelete,
}: DataTableProps) {

  const truncateText = (text: string, maxLength: number = 60) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="overflow-x-auto">
      <div className="space-y-6 p-6">
        {data.map((row, idx) => (
          <div
            key={row.id}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all group shadow-lg"
          >
            <div className="p-8">
              {/* Header dengan nomor dan actions */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded-lg text-cyan-400 font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="text-white font-semibold text-sm">Soal #{idx + 1}</h3>
                    <p className="text-xs text-slate-500">
                      Jawaban: <span className="text-green-400 font-bold">{row.correctAnswer}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onRowEdit(row)}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 text-cyan-400 rounded-lg transition-all text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => onRowDelete(row.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 rounded-lg transition-all text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Hapus
                  </button>
                </div>
              </div>

              {/* Pertanyaan */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-slate-400 mb-3">PERTANYAAN</h4>
                <p className="text-white text-sm leading-relaxed">{row.pertanyaan}</p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {['A', 'B', 'C', 'D', 'E'].map((opt) => {
                  const optionKey = `option${opt}` as keyof TableRow;
                  const scoreKey = `score${opt}` as keyof TableRow;
                  const isCorrect = row.correctAnswer === opt;
                  
                  return (
                    <div
                      key={opt}
                      className={`p-4 rounded-lg border ${
                        isCorrect
                          ? 'bg-green-500/10 border-green-500/30'
                          : 'bg-slate-900/50 border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <span className={`shrink-0 flex items-center justify-center w-6 h-6 rounded-md text-xs font-bold ${
                          isCorrect
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-slate-700 text-slate-400'
                        }`}>
                          {opt}
                        </span>
                        <p className="text-slate-300 text-xs leading-relaxed flex-1">
                          {truncateText(row[optionKey] as string, 50)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">Poin:</span>
                        <span className="text-amber-400 font-semibold text-sm">{row[scoreKey]}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pembahasan */}
              {row.pembahasan && (
                <div className="pt-6 mt-2 border-t border-slate-700">
                  <h4 className="text-xs font-semibold text-slate-400 mb-3">PEMBAHASAN</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {truncateText(row.pembahasan, 150)}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 opacity-30">📝</div>
            <p className="text-slate-500">Tidak ada data untuk ditampilkan</p>
          </div>
        )}
      </div>
    </div>
  );
}
