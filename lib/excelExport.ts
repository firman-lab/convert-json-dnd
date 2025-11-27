import * as XLSX from 'xlsx';
import { TableRow } from './jsonParser';

export function exportToExcel(data: TableRow[], filename: string = 'soal_export.xlsx') {
  try {
    // Prepare data for export
    const exportData = data.map((row, index) => ({
      'No': index + 1,
      'Pertanyaan': row.pertanyaan,
      'Opsi A': row.optionA,
      'Opsi B': row.optionB,
      'Opsi C': row.optionC,
      'Opsi D': row.optionD,
      'Opsi E': row.optionE,
      'Jawaban Benar': row.correctAnswer,
      'Score A': row.scoreA,
      'Score B': row.scoreB,
      'Score C': row.scoreC,
      'Score D': row.scoreD,
      'Score E': row.scoreE,
      'Pembahasan': row.pembahasan,
    }));

    // Create a new workbook
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Set column widths for better readability
    const colWidths = [
      { wch: 5 },      // No
      { wch: 40 },     // Pertanyaan
      { wch: 30 },     // Opsi A
      { wch: 30 },     // Opsi B
      { wch: 30 },     // Opsi C
      { wch: 30 },     // Opsi D
      { wch: 30 },     // Opsi E
      { wch: 12 },     // Jawaban Benar
      { wch: 10 },     // Score A
      { wch: 10 },     // Score B
      { wch: 10 },     // Score C
      { wch: 10 },     // Score D
      { wch: 10 },     // Score E
      { wch: 50 },     // Pembahasan
    ];
    ws['!cols'] = colWidths;

    // Wrap text in cells for long content
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell = ws[XLSX.utils.encode_cell({ r: R, c: C })];
        if (cell) {
          cell.alignment = { wrapText: true, vertical: 'top' };
        }
      }
    }

    // Add header styling
    if (ws['!rows'] === undefined) {
      ws['!rows'] = [];
    }
    ws['!rows'][0] = { hpx: 25 };

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Soal');

    // Trigger download
    XLSX.writeFile(wb, filename);

    return true;
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    throw new Error('Gagal mengexport ke Excel');
  }
}
