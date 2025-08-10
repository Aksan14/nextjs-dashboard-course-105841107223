// app/dashboard/invoices/[id]/edit/page.tsx
import { sql } from '@vercel/postgres';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';

// Props
type Props = {
  params: Promise<{ id: string }>; // Perbarui ke Promise
};

// Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params; // Tunggu Promise params

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

// Halaman
export default async function EditInvoicePage({ params }: Props) {
  const { id } = await params; // Tunggu Promise params

  try {
    const data = await sql`SELECT * FROM invoices WHERE id = ${id}`;
    const invoice = data.rows[0];

    if (!invoice) {
      notFound();
    }

    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
          <h1 className={`${lusitana.className} mb-6 text-2xl font-semibold text-gray-800`}>
            Edit Invoice #{id}
          </h1>

          <form
            action={async (formData: FormData) => {
              'use server';
              const { updateInvoice } = await import('@/app/lib/actions');
              const result = await updateInvoice(id, formData);
              if (result.message) {
                throw new Error(result.message);
              }
            }}
            className="space-y-4"
          >
            {/* ID Pelanggan */}
            <div>
              <label
                htmlFor="customerId"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                ID Pelanggan
              </label>
              <input
                id="customerId"
                name="customerId"
                defaultValue={invoice.customer_id}
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            {/* Jumlah */}
            <div>
              <label
                htmlFor="amount"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Jumlah
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                defaultValue={invoice.amount}
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                defaultValue={invoice.status}
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                <option value="pending">Menunggu</option>
                <option value="paid">Lunas</option>
              </select>
            </div>

            {/* Tombol Kirim */}
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              Perbarui Invoice
            </button>
          </form>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Gagal mengambil invoice:', error);
    notFound();
  }
}