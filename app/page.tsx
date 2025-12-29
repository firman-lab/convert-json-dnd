'use client';

import React, { useState, useCallback, useRef } from 'react';
import { parseJsonInput, TableRow, validateTableRow } from '@/lib/jsonParser';
import { parseTextInput } from '@/lib/textParser';
import { exportToExcel } from '@/lib/excelExport';
import { importFromExcel } from '@/lib/excelImport';
import JsonInputSection from '@/components/JsonInputSection';
import TextInputSection from '@/components/TextInputSection';
import DataTable from '@/components/DataTable';
import EditModal from '@/components/EditModal';

export default function Home() {
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [editingRow, setEditingRow] = useState<TableRow | null>(null);
  const [showJsonInput, setShowJsonInput] = useState(true);
  const [inputMode, setInputMode] = useState<'json' | 'text'>('json');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleJsonSubmit = useCallback((jsonString: string) => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const parsedData = parseJsonInput(jsonString);

      if (parsedData.length === 0) {
        throw new Error('Data soal tidak ditemukan dalam JSON');
      }

      setTableData(parsedData);
      setSuccessMessage(`Berhasil memparse ${parsedData.length} soal`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error tidak diketahui';
      setError(errorMessage);
      setTableData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleTextSubmit = useCallback((textString: string) => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const parsedData = parseTextInput(textString);

      if (parsedData.length === 0) {
        throw new Error('Data soal tidak ditemukan dalam text');
      }

      setTableData(parsedData);
      setSuccessMessage(`Berhasil memparse ${parsedData.length} soal dari text`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error tidak diketahui';
      setError(errorMessage);
      setTableData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRowEdit = useCallback((row: TableRow) => {
    setEditingRow(row);
  }, []);

  const handleRowUpdate = useCallback((updatedRow: TableRow) => {
    const errors = validateTableRow(updatedRow);
    if (errors.length > 0) {
      setError(errors.join(', '));
      return;
    }

    setTableData((prevData) =>
      prevData.map((row) => (row.id === updatedRow.id ? updatedRow : row))
    );
    setEditingRow(null);
    setSuccessMessage('Data berhasil diupdate');
    setTimeout(() => setSuccessMessage(''), 3000);
  }, []);

  const handleRowDelete = useCallback((rowId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus baris ini?')) {
      setTableData((prevData) => prevData.filter((row) => row.id !== rowId));
      setSuccessMessage('Data berhasil dihapus');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  }, []);

  const handleExportExcel = useCallback(() => {
    try {
      if (tableData.length === 0) {
        setError('Tidak ada data untuk di-export');
        return;
      }
      exportToExcel(tableData);
      setSuccessMessage('Berhasil mengexport ke Excel');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error eksport';
      setError(errorMessage);
    }
  }, [tableData]);

  const handleImportExcel = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    importFromExcel(file)
      .then((data) => {
        setTableData(data);
        setSuccessMessage(`Berhasil mengimport ${data.length} soal dari Excel`);
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      })
      .catch((err) => {
        const errorMessage = err instanceof Error ? err.message : 'Error import';
        setError(errorMessage);
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleImportClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-linear-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Soal Converter
                </h1>
                <p className="text-xs text-slate-500">JSON to Excel</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {tableData.length > 0 && (
                <>
                  <button
                    onClick={() => setShowJsonInput(!showJsonInput)}
                    className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    {showJsonInput ? 'Hide' : 'Show'} JSON
                  </button>
                  <button
                    onClick={handleImportClick}
                    className="flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all shadow-lg shadow-blue-900/50 font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="hidden sm:inline">Import Excel</span>
                  </button>
                  <button
                    onClick={handleExportExcel}
                    className="flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg transition-all shadow-lg shadow-emerald-900/50 font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="hidden sm:inline">Export Excel</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      {error && (
        <div className="fixed top-24 right-4 z-50 animate-fade-in">
          <div className="bg-red-500/10 backdrop-blur-xl border border-red-500/30 rounded-xl shadow-2xl p-4 max-w-md">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-red-400 font-semibold mb-1">Error</h3>
                <p className="text-red-300/80 text-sm">{error}</p>
              </div>
              <button onClick={() => setError('')} className="text-red-400 hover:text-red-300">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="fixed top-24 right-4 z-50 animate-fade-in">
          <div className="bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/30 rounded-xl shadow-2xl p-4 max-w-md">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-emerald-400 font-semibold mb-1">Success</h3>
                <p className="text-emerald-300/80 text-sm">{successMessage}</p>
              </div>
              <button onClick={() => setSuccessMessage('')} className="text-emerald-400 hover:text-emerald-300">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleImportExcel}
          className="hidden"
        />

        {tableData.length === 0 ? (
          /* Initial State - Show JSON Input */
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl mb-4">
                <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Mulai Konversi</h2>
              <p className="text-slate-400">Paste JSON, Text, atau import Excel untuk memulai</p>
            </div>

            {/* Import Excel Button */}
            <div className="mb-6">
              <button
                onClick={handleImportClick}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-all shadow-lg shadow-blue-900/50 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                {isLoading ? 'Memproses...' : 'Import dari Excel'}
              </button>
              <p className="text-center text-slate-500 text-sm mt-2">
                File Excel harus sesuai format export aplikasi ini
              </p>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-950 text-slate-400">atau input manual</span>
              </div>
            </div>

            {/* Tab Switcher */}
            <div className="flex gap-2 mb-6 p-1 bg-slate-800/50 rounded-lg">
              <button
                onClick={() => setInputMode('json')}
                className={`flex-1 px-4 py-2.5 rounded-md transition-all font-medium ${
                  inputMode === 'json'
                    ? 'bg-cyan-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  JSON Format
                </div>
              </button>
              <button
                onClick={() => setInputMode('text')}
                className={`flex-1 px-4 py-2.5 rounded-md transition-all font-medium ${
                  inputMode === 'text'
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Text Format
                </div>
              </button>
            </div>

            {/* Input Section */}
            <div className="mt-6">
              {inputMode === 'json' ? (
                <JsonInputSection onSubmit={handleJsonSubmit} isLoading={isLoading} />
              ) : (
                <TextInputSection onSubmit={handleTextSubmit} isLoading={isLoading} />
              )}
            </div>
          </div>
        ) : (
          /* Data Loaded State */
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-linear-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-6 backdrop-blur-sm shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-400 text-sm font-medium mb-1">Total Soal</p>
                    <p className="text-3xl font-bold text-white">{tableData.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-400 text-sm font-medium mb-1">Valid</p>
                    <p className="text-3xl font-bold text-white">
                      {tableData.filter((row) => validateTableRow(row).length === 0).length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-400 text-sm font-medium mb-1">Total Poin</p>
                    <p className="text-3xl font-bold text-white">
                      {tableData.reduce((sum, row) => sum + row.scoreA + row.scoreB + row.scoreC + row.scoreD + row.scoreE, 0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl backdrop-blur-sm">
              <div className="p-6 border-b border-slate-800/50">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Data Soal
                  <span className="ml-auto text-sm font-normal text-slate-400">
                    Klik tombol Edit untuk mengubah data
                  </span>
                </h2>
              </div>
              <DataTable
                data={tableData}
                onRowEdit={handleRowEdit}
                onRowDelete={handleRowDelete}
              />
            </div>

            {/* JSON Input Toggle (when data exists) */}
            {showJsonInput && (
              <div className="mt-6 space-y-6">
                {/* Tab Switcher */}
                <div className="flex gap-2 p-1 bg-slate-800/50 rounded-lg max-w-md">
                  <button
                    onClick={() => setInputMode('json')}
                    className={`flex-1 px-4 py-2.5 rounded-md transition-all font-medium text-sm ${
                      inputMode === 'json'
                        ? 'bg-cyan-600 text-white shadow-lg'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      JSON
                    </div>
                  </button>
                  <button
                    onClick={() => setInputMode('text')}
                    className={`flex-1 px-4 py-2.5 rounded-md transition-all font-medium text-sm ${
                      inputMode === 'text'
                        ? 'bg-amber-600 text-white shadow-lg'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Text
                    </div>
                  </button>
                </div>

                {/* Input Area */}
                {inputMode === 'json' ? (
                  <JsonInputSection onSubmit={handleJsonSubmit} isLoading={isLoading} />
                ) : (
                  <TextInputSection onSubmit={handleTextSubmit} isLoading={isLoading} />
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Edit Modal */}
      {editingRow && (
        <EditModal
          row={editingRow}
          onSave={handleRowUpdate}
          onClose={() => setEditingRow(null)}
        />
      )}
    </div>
  );
}
