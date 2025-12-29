import * as XLSX from 'xlsx';
import { TableRow } from './jsonParser';

export function importFromExcel(file: File): Promise<TableRow[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        if (!data) {
          throw new Error('Tidak dapat membaca file');
        }

        // Parse workbook
        const workbook = XLSX.read(data, { type: 'binary' });

        // Get first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as Record<string, unknown>[];

        if (!jsonData || jsonData.length === 0) {
          throw new Error('File Excel kosong');
        }

        // Transform data to TableRow format
        const tableData: TableRow[] = jsonData.map((row, index: number) => {
          // Handle different possible column name formats
          const category = row.category || row.Category || row.CATEGORY || '';
          const question = row.question || row.Question || row.QUESTION || '';
          const optionA = row.optionA || row.OptionA || row.OPTIONA || '';
          const optionB = row.optionB || row.OptionB || row.OPTIONB || '';
          const optionC = row.optionC || row.OptionC || row.OPTIONC || '';
          const optionD = row.optionD || row.OptionD || row.OPTIOND || '';
          const optionE = row.optionE || row.OptionE || row.OPTIONE || '';
          const correctAnswer = row.correctAnswer || row.CorrectAnswer || row.CORRECTANSWER || '';
          const scoreA = parseFloat((row.scoreA || row.ScoreA || row.SCOREA || 0) as string);
          const scoreB = parseFloat((row.scoreB || row.ScoreB || row.SCOREB || 0) as string);
          const scoreC = parseFloat((row.scoreC || row.ScoreC || row.SCOREC || 0) as string);
          const scoreD = parseFloat((row.scoreD || row.ScoreD || row.SCORED || 0) as string);
          const scoreE = parseFloat((row.scoreE || row.ScoreE || row.SCOREE || 0) as string);
          const explanation = row.explanation || row.Explanation || row.EXPLANATION || '';

          return {
            id: `row-${Date.now()}-${index}`,
            kategori: category.toString().toLowerCase(),
            pertanyaan: question.toString(),
            optionA: optionA.toString(),
            optionB: optionB.toString(),
            optionC: optionC.toString(),
            optionD: optionD.toString(),
            optionE: optionE.toString(),
            correctAnswer: correctAnswer.toString(),
            scoreA: isNaN(scoreA) ? 0 : scoreA,
            scoreB: isNaN(scoreB) ? 0 : scoreB,
            scoreC: isNaN(scoreC) ? 0 : scoreC,
            scoreD: isNaN(scoreD) ? 0 : scoreD,
            scoreE: isNaN(scoreE) ? 0 : scoreE,
            pembahasan: explanation.toString(),
          };
        });

        resolve(tableData);
      } catch (error) {
        console.error('Error importing Excel:', error);
        reject(new Error('Gagal mengimport file Excel. Pastikan format file sesuai.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Gagal membaca file'));
    };

    reader.readAsBinaryString(file);
  });
}
