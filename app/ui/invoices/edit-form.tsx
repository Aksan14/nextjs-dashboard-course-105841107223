'use client';

import { useRouter } from 'next/navigation';
import { Invoice, Customer } from '@/app/lib/definitions';
import { UsersIcon, DollarSign, Clock, CheckCircle2 } from 'lucide-react';
import { updateInvoice } from '@/app/lib/actions';

export default function EditForm({ invoice, customers }: { invoice: Invoice; customers: Customer[] }) {
  const router = useRouter();

  return (
    <form action={updateInvoice}>
      <input type="hidden" name="id" value={invoice.id} />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Pilih customer */}
        <div className="mb-4">
          <label htmlFor="customerId" className="mb-2 block text-sm font-medium">Pilih pelanggan</label>
          <div className="relative">
            <UsersIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              id="customerId"
              name="customerId"
              className="block w-full rounded-md border border-gray-200 py-2 pl-10 pr-3 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              defaultValue={invoice.customer_id}
              required
            >
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>{customer.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Input jumlah */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">Masukkan jumlah</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              className="block w-full rounded-md border border-gray-200 py-2 pl-10 pr-3 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              defaultValue={invoice.amount}
              required
            />
          </div>
        </div>

        {/* Status invoice */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">Atur status invoice</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="status"
                value="pending"
                defaultChecked={invoice.status === 'pending'}
                className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                required
              />
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="text-sm">Menunggu</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="status"
                value="paid"
                defaultChecked={invoice.status === 'paid'}
                className="text-green-600 focus:ring-green-500 h-4 w-4"
                required
              />
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="text-sm">Lunas</span>
            </label>
          </div>
        </div>

        {/* Tombol */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/dashboard/invoices')}
            className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
          >
            Batal
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
          >
            Edit Invoice
          </button>
        </div>
      </div>
    </form>
  );
}
