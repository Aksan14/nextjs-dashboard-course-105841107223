'use client';

import { useSearchParams } from 'next/navigation';
import { Invoice } from '@/app/lib/definitions';
import Link from 'next/link';
import clsx from 'clsx';
import { deleteInvoice } from '@/app/lib/actions';
import { FaEdit, FaTrash } from 'react-icons/fa';

async function deleteInvoiceAction(id: string, _formData: FormData): Promise<void> {
  try {
    await deleteInvoice(id);
  } catch (error) {
    console.error('Error deleting invoice:', error);
    throw error;
  }
}

export default function InvoicesTable({ invoices }: { invoices: Invoice[] }) {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.customer_id.toLowerCase().includes(query.toLowerCase())
  );

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mt-6">
      {/* Search */}
      <div className="mb-4 flex items-center justify-between">
        {/* <input
          type="text"
          placeholder="Search invoices"
          defaultValue={query}
          className="w-full max-w-sm rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        /> */}
        {/* <Link
          href="/dashboard/invoices/create"
          className="ml-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Create Invoice
        </Link> */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-gray-900">
          <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-600">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedInvoices.length > 0 ? (
              paginatedInvoices.map((invoice, index) => (
                <tr
                  key={invoice.id}
                  className={clsx(index % 2 === 0 ? 'bg-white' : 'bg-gray-50')}
                >
                  <td className="px-4 py-3 font-mono text-xs">
                    {String(invoice.id).slice(0, 8)}...
                  </td>
                  <td className="px-4 py-3">{invoice.customer_id}</td>
                  <td className="px-4 py-3 font-medium">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">{invoice.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={clsx(
                        'rounded-full px-3 py-1 text-xs font-semibold',
                        invoice.status === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      )}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <Link
                        href={`/dashboard/invoices/${invoice.id}/edit`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </Link>
                      <form action={deleteInvoiceAction.bind(null, invoice.id)}>
                        <button
                          type="submit"
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={`/dashboard/invoices?page=${page}`}
              className={clsx(
                'rounded-md px-3 py-1 text-sm font-medium',
                page === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {page}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
