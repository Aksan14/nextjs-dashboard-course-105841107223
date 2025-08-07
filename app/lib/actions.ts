// app/lib/actions.ts
'use server';

import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';
import { signIn } from 'next-auth/react'; // Catatan: Tidak digunakan di Server Action
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

// Fungsi autentikasi
export async function authenticate(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const data = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;
    const user = data.rows[0];

    if (!user) {
      return { error: 'Email atau kata sandi salah.' };
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return { error: 'Email atau kata sandi salah.' };
    }

    // Mengembalikan data pengguna untuk digunakan di klien
    return { user: { id: user.id, name: user.name, email: user.email } };
  } catch (error) {
    console.error('Database Error:', error);
    return { error: 'Terjadi kesalahan pada server.' };
  }
}

// Skema untuk invoice
const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number().positive(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });
const UpdateInvoice = InvoiceSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  try {
    const { customerId, amount, status } = CreateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    const date = new Date().toISOString().split('T')[0];

    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amount}, ${status}, ${date})
    `;
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
    return { message: null };
  } catch (error) {
    return { message: 'Gagal membuat invoice: ' + (error instanceof Error ? error.message : 'Kesalahan tidak diketahui') };
  }
}

export async function updateInvoice(id: string, formData: FormData) {
  try {
    const { customerId, amount, status } = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amount}, status = ${status}
      WHERE id = ${id}
    `;
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
    return { message: null };
  } catch (error) {
    return { message: 'Gagal memperbarui invoice: ' + (error instanceof Error ? error.message : 'Kesalahan tidak diketahui') };
  }
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: null };
  } catch (error) {
    return { message: 'Gagal menghapus invoice: ' + (error instanceof Error ? error.message : 'Kesalahan tidak diketahui') };
  }
}