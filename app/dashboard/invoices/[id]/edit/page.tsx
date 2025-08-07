// app/dashboard/invoices/[id]/edit/page.ts
import { sql } from '@vercel/postgres';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Definisikan tipe Props dengan benar
type Props = {
  params: Promise<{ id: string }>; // Gunakan Promise untuk params
};

// Fungsi untuk menghasilkan metadata (opsional)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params; // Tunggu params untuk mendapatkan id

  try {
    const data = await sql`SELECT * FROM invoices WHERE id = ${id}`;
    const invoice = data.rows[0];

    return {
      title: invoice ? `Edit Invoice ${invoice.id}` : 'Edit Invoice',
    };
  } catch (error) {
    console.error('Gagal mengambil invoice untuk metadata:', error);
    return { title: 'Edit Invoice' };
  }
}

// Komponen halaman
export default async function EditInvoicePage({ params }: Props) {
  const { id } = await params; // Tunggu params untuk mendapatkan id

  try {
    const data = await sql`
      SELECT * FROM invoices WHERE id = ${id}
    `;
    const invoice = data.rows[0];

    if (!invoice) {
      notFound();
    }

    return (
      <div>
        <h1>Edit Invoice {id}</h1>
        <form
          action={async (formData: FormData) => {
            'use server';
            const { updateInvoice } = await import('@/app/lib/actions');
            const result = await updateInvoice(id, formData);
            if (result.message) {
              throw new Error(result.message);
            }
          }}
        >
          <label>
            ID Pelanggan:
            <input name="customerId" defaultValue={invoice.customer_id} required />
          </label>
          <label>
            Jumlah:
            <input name="amount" type="number" defaultValue={invoice.amount} required />
          </label>
          <label>
            Status:
            <select name="status" defaultValue={invoice.status} required>
              <option value="pending">Menunggu</option>
              <option value="paid">Lunas</option>
            </select>
          </label>
          <button type="submit">Perbarui Invoice</button>
        </form>
      </div>
    );
  } catch (error) {
    console.error('Gagal mengambil invoice:', error);
    notFound();
  }
}