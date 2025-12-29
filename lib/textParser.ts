import { TableRow } from './jsonParser';

export function parseTextInput(textInput: string): TableRow[] {
  try {
    const result: TableRow[] = [];
    
    // Split by question numbers (1., 2., 3., etc.)
    const questions = textInput.split(/\n(?=\d+\.\s+Soal)/);
    
    for (const questionBlock of questions) {
      if (!questionBlock.trim()) continue;
      
      // Extract question number
      const numberMatch = questionBlock.match(/^(\d+)\.\s+Soal/);
      if (!numberMatch) continue;
      
      // Extract the question text (after "Soal" until "Pilihan ganda:")
      const questionMatch = questionBlock.match(/Soal\s*\n([\s\S]+?)(?=\n\s*Pilihan ganda:)/);
      const question = questionMatch ? questionMatch[1].trim() : '';
      
      // Extract options (A to E)
      const optionAMatch = questionBlock.match(/A\.\s*([\s\S]+?)(?=\n[B-E]\.|\nPembahasan:)/);
      const optionBMatch = questionBlock.match(/B\.\s*([\s\S]+?)(?=\n[C-E]\.|\nPembahasan:)/);
      const optionCMatch = questionBlock.match(/C\.\s*([\s\S]+?)(?=\n[D-E]\.|\nPembahasan:)/);
      const optionDMatch = questionBlock.match(/D\.\s*([\s\S]+?)(?=\nE\.|\nPembahasan:)/);
      const optionEMatch = questionBlock.match(/E\.\s*([\s\S]+?)(?=\nPembahasan:|$)/);
      
      const optionA = optionAMatch ? optionAMatch[1].trim() : '';
      const optionB = optionBMatch ? optionBMatch[1].trim() : '';
      const optionC = optionCMatch ? optionCMatch[1].trim() : '';
      const optionD = optionDMatch ? optionDMatch[1].trim() : '';
      const optionE = optionEMatch ? optionEMatch[1].trim() : '';
      
      // Extract pembahasan (after "Pembahasan:" until "Jawaban:")
      const pembahasanMatch = questionBlock.match(/Pembahasan:\s*\n([\s\S]+?)(?=\nJawaban:)/);
      const pembahasan = pembahasanMatch ? pembahasanMatch[1].trim() : '';
      
      // Extract correct answer (after "Jawaban:")
      const answerMatch = questionBlock.match(/Jawaban:\s*([A-E])/);
      const correctAnswer = answerMatch ? answerMatch[1] : '';
      
      if (question && correctAnswer) {
        result.push({
          id: `row-${Date.now()}-${result.length}`,
          kategori: 'umum', // Default category, can be edited later
          pertanyaan: question,
          optionA: optionA,
          optionB: optionB,
          optionC: optionC,
          optionD: optionD,
          optionE: optionE,
          correctAnswer: correctAnswer,
          scoreA: correctAnswer === 'A' ? 1 : 0,
          scoreB: correctAnswer === 'B' ? 1 : 0,
          scoreC: correctAnswer === 'C' ? 1 : 0,
          scoreD: correctAnswer === 'D' ? 1 : 0,
          scoreE: correctAnswer === 'E' ? 1 : 0,
          pembahasan: pembahasan,
        });
      }
    }
    
    if (result.length === 0) {
      throw new Error('Tidak ada soal yang berhasil di-parse. Pastikan format text sesuai.');
    }
    
    return result;
  } catch (error) {
    console.error('Error parsing text:', error);
    throw new Error('Gagal mem-parse text. Pastikan format sesuai dengan contoh.');
  }
}

export function getTextFormatExample(): string {
  return `1. Soal
Hubungan yang setara dengan kalimat "Kurang tidur dalam jangka panjang dapat menurunkan daya konsentrasi" adalah …

Pilihan ganda:
A. Kurang olahraga menyebabkan tubuh mudah lelah
B. Kurang istirahat membuat seseorang mengantuk
C. Kurang tidur mengakibatkan mimpi buruk
D. Terlalu banyak tidur membuat tubuh pegal
E. Tidur siang dapat memulihkan tenaga

Pembahasan:
Pola hubungan pada kalimat soal adalah sebab → akibat negatif jangka panjang. Pilihan A memiliki pola yang sama: kekurangan suatu kebutuhan menyebabkan penurunan fungsi tubuh.
Jawaban: A

2. Soal
Pertanyaan kedua...

Pilihan ganda:
A. Opsi A
B. Opsi B
C. Opsi C
D. Opsi D
E. Opsi E

Pembahasan:
Penjelasan pembahasan...
Jawaban: B`;
}
