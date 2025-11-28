export interface Option {
  text: string;
  poin: number;
}

export interface Pilihan {
  a: Option;
  b: Option;
  c: Option;
  d: Option;
  e: Option;
}

export interface Soal {
  id: number;
  soal_id: number;
  kategori: string;
  pertanyaan: string;
  pilihan: Pilihan;
  pembahasan: string;
  ragu: boolean;
  jawaban: string;
  kunci: string;
  nilai: number;
  time: number;
}

export interface ParsedData {
  soal: Soal[];
}

export interface TableRow {
  id: string;
  kategori: string;
  pertanyaan: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  optionE: string;
  correctAnswer: string;
  scoreA: number;
  scoreB: number;
  scoreC: number;
  scoreD: number;
  scoreE: number;
  pembahasan: string;
  originalSoalId?: number;
}

export function parseJsonInput(jsonString: string): TableRow[] {
  try {
    const parsed: ParsedData = JSON.parse(jsonString);

    if (!parsed.soal || !Array.isArray(parsed.soal)) {
      throw new Error("JSON harus memiliki properti 'soal' berupa array");
    }

    return parsed.soal.map((soal, index) => ({
      id: `row-${soal.id || index}`,
      kategori: soal.kategori,
      pertanyaan: soal.pertanyaan,
      optionA: soal.pilihan.a.text,
      optionB: soal.pilihan.b.text,
      optionC: soal.pilihan.c.text,
      optionD: soal.pilihan.d.text,
      optionE: soal.pilihan.e.text,
      correctAnswer: soal.kunci || soal.jawaban,
      scoreA: soal.pilihan.a.poin,
      scoreB: soal.pilihan.b.poin,
      scoreC: soal.pilihan.c.poin,
      scoreD: soal.pilihan.d.poin,
      scoreE: soal.pilihan.e.poin,
      pembahasan: soal.pembahasan,
      originalSoalId: soal.id,
    }));
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`JSON tidak valid: ${error.message}`);
    }
    throw error;
  }
}

export function validateTableRow(row: TableRow): string[] {
  const errors: string[] = [];

  if (!row.pertanyaan || row.pertanyaan.trim() === "") {
    errors.push("Pertanyaan tidak boleh kosong");
  }

  if (
    !row.correctAnswer ||
    !["A", "B", "C", "D", "E"].includes(row.correctAnswer.toUpperCase())
  ) {
    errors.push("Jawaban yang benar harus A, B, C, D, atau E");
  }

  return errors;
}
