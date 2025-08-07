'use client';

import { useSearchParams } from 'next/navigation';
import { Invoice } from '@/app/lib/definitions';
import Link from 'next/link';
import clsx from 'clsx';
import { deleteInvoice } from '@/app/lib/actions';

// Fungsi pembungkus untuk menyesuaikan deleteInvoice dengan atribut action
async function deleteInvoiceAction(id: string, _formData: FormData): Promise<void> {
  try {
    await deleteInvoice(id);
  } catch (error) {
    console.error('Error deleting invoice:', error);
    throw error; // Opsional: lempar error untuk ditangani oleh komponen atau halaman error
  }
}

export default function InvoicesTable({ invoices }: { invoices: Invoice[] }) {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.status.toLowerCase().includes(query.toLowerCase())
  );

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mt-6">
      <table className="w-full text-gray-900">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedInvoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.customer_id}</td>
              <td>{invoice.amount}</td>
              <td>{invoice.status}</td>
              <td>{invoice.date}</td>
              <td>
                <Link href={`/dashboard/invoices/${invoice.id}/edit`}>Edit</Link>
                <form action={deleteInvoiceAction.bind(null, invoice.id)}>
                  <button type="submit" className="ml-2 text-red-600">
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <Link
          href={`/dashboard/invoices?page=${currentPage - 1}`}
          className={clsx('px-4 py-2', { 'pointer-events-none opacity-50': currentPage === 1 })}
        >
          Previous
        </Link>
        <Link
          href={`/dashboard/invoices?page=${currentPage + 1}`}
          className={clsx('px-4 py-2', { 'pointer-events-none opacity-50': currentPage === totalPages })}
        >
          Next
        </Link>
      </div>
    </div>
  );
}