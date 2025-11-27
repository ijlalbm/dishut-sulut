import { z } from 'zod';

// Skema untuk semua props yang akan diterima oleh komponen Button
export const ButtonPropsSchema = z.object({
    // children: ReactNode sulit divalidasi oleh Zod secara langsung. 
    // Kita biarkan sebagai z.any() atau z.unknown() karena Zod fokus pada tipe data primitif/JSON.
    children: z.any(), 

    // size: Enum yang didefinisikan dengan z.enum
    size: z.enum(["sm", "md"]).default("md").optional(), 

    // variant: Enum yang didefinisikan dengan z.enum
    variant: z.enum(["primary", "outline"]).default("primary").optional(), 
    
    // startIcon/endIcon: Mirip dengan children, kita biarkan sebagai z.any()
    startIcon: z.any().optional(),
    endIcon: z.any().optional(),

    // onClick: Fungsi, divalidasi sebagai fungsi
    // onClick: z.function().implement.returns(z.void()).optional(),
    onClick: z.function().optional(), 

    // disabled: Boolean
    disabled: z.boolean().optional(),
    
    // className: String
    className: z.string().optional(),
    
    // Semua atribut HTML Button lainnya (spread props)
    // Zod tidak dapat dengan mudah menampung semua atribut HTML secara dinamis.
    // Jika Anda ingin memvalidasi props tertentu, Anda harus menambahkannya di sini.
    // Untuk tujuan ini, kita fokus pada props custom.
}).passthrough(); // Gunakan .passthrough() agar properti HTML standar lainnya (seperti type="button") diizinkan.

// Ekspor Tipe TypeScript dari Skema Zod (Menggantikan interface Anda)
// Ini adalah cara terbaik untuk menjaga konsistensi tipe dan validasi.
export type ButtonProps = z.infer<typeof ButtonPropsSchema> & React.ButtonHTMLAttributes<HTMLButtonElement>;