# JSON to Excel Converter - Soal

Website responsif untuk convert JSON format soal menjadi tabel yang dapat diedit dan di-export ke file Excel (.xlsx).

## Fitur

✨ **Features:**
- ✅ Parse JSON dengan format soal yang kompleks (hingga 2000 baris)
- ✅ Tampilkan data dalam table dengan 13 kolom:
  - Pertanyaan
  - Opsi A, B, C, D, E
  - Jawaban Benar
  - Score A, B, C, D, E
  - Pembahasan
- ✅ Edit inline setiap cell di table
- ✅ Validasi data otomatis
- ✅ Export ke Excel (.xlsx) dengan format yang rapi
- ✅ Dark modern theme UI
- ✅ Responsive design untuk mobile dan desktop
- ✅ Statistik data real-time

## Teknologi Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Excel Export:** XLSX library
- **Package Manager:** pnpm

## Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build untuk Production

```bash
pnpm run build
pnpm run start
```

## Format JSON yang Didukung

```json
{
  "soal": [
    {
      "id": 21357313,
      "soal_id": 34547,
      "kategori": "twk",
      "pertanyaan": "Pertanyaan di sini...",
      "pilihan": {
        "a": {"text": "Opsi A", "poin": 0},
        "b": {"text": "Opsi B", "poin": 0},
        "c": {"text": "Opsi C", "poin": 5},
        "d": {"text": "Opsi D", "poin": 0},
        "e": {"text": "Opsi E", "poin": 0}
      },
      "pembahasan": "Pembahasan lengkap di sini...",
      "ragu": false,
      "jawaban": "C",
      "kunci": "C",
      "nilai": 5,
      "time": 1030
    }
  ]
}
```

## Cara Menggunakan

1. **Paste JSON**
   - Copy JSON soal Anda
   - Paste di textarea input
   - Klik tombol "Parse JSON"

2. **Edit Data (Opsional)**
   - Klik pada cell manapun untuk mengedit
   - Tekan Enter untuk simpan
   - Tekan Escape untuk batal

3. **Export ke Excel**
   - Klik tombol "Export ke Excel"
   - File .xlsx akan terdownload otomatis

4. **Load Sample Data**
   - Klik "Load Sample Data" untuk lihat contoh format

## Fitur Editing

- **Single Click Edit:** Klik pada cell untuk mengedit
- **Auto Save:** Tekan Enter untuk simpan
- **Data Validation:** Validasi otomatis saat save
- **Delete Row:** Klik tombol 🗑️ untuk hapus baris

## Statistik Real-time

Table menampilkan statistik data yang diupdate real-time:
- **Total Soal:** Jumlah soal yang diparse
- **Soal Valid:** Soal yang lolos validasi
- **Total Score:** Jumlah score dari semua opsi

## Export Excel

File Excel yang dihasilkan memiliki:
- ✅ Column width yang optimal
- ✅ Text wrapping untuk cell panjang
- ✅ Header formatting
- ✅ 14 kolom: No, Pertanyaan, Opsi A-E, Jawaban Benar, Score A-E, Pembahasan

## Responsive Design

Aplikasi dirancang responsif untuk:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## Dark Theme

- Menggunakan Tailwind CSS dark colors (slate-900, slate-800, etc)
- Modern design dengan gradient backgrounds
- Accessibility-friendly dengan contrast ratio yang baik

## Development

### Structure

```
/app          - Next.js app router
/components   - React components
/lib          - Utility functions
  - jsonParser.ts    - JSON parsing logic
  - excelExport.ts   - Excel export utility
```

### Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint

## Known Limitations

- Maximum recommended: 2000 soal per file
- Browser memory akan tergantung ukuran JSON
- Excel export terbatas pada kapabilitas XLSX library

## License

Open source - feel free to use and modify

## Support

Untuk issues atau feature requests, silakan buat issue di repository.

---

**Dibuat dengan ❤️ untuk memudahkan konversi data soal**
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
