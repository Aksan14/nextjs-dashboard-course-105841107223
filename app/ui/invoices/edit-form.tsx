'use client';

import { updateInvoice } from '@/app/lib/actions';
import { Invoice, Customer } from '@/app/lib/definitions';
import { useFormState } from 'react-dom';

// Fungsi pembungkus untuk menyesuaikan updateInvoiceWithId dengan useFormState
async function updateInvoiceAction(prevState: { message: string | null }, formData: FormData) {
  const updateInvoiceWithId = updateInvoice.bind(null, (formData.get('id') as string) || '');
  return await updateInvoiceWithId(formData);
}

export default function EditForm({ invoice, customers }: { invoice: Invoice; customers: Customer[] }) {
  const initialState = { message: null };
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  const [state, dispatch] = useFormState(updateInvoiceAction, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Tambahkan input tersembunyi untuk ID invoice */}
        <input type="hidden" name="id" value={invoice.id} />
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Pilih Pelanggan
          </label>
          <select
            id="customer"
            name="customerId"
            className="peer block w-full rounded-md border border-gray-200 py-2"
            defaultValue={invoice.customer_id}
            required
          >
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Jumlah
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            className="peer block w-full rounded-md border border-gray-200 py-2"
            defaultValue={invoice.amount}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="mb-2 block text-sm font-medium">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="peer block w-full rounded-md border border-gray-200 py-2"
            defaultValue={invoice.status}
            required
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </div>
        {state.message && <p className="text-red-500">{state.message}</p>}
        <button type="submit" className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white">
          Perbarui Invoice
        </button>
      </div>
    </form>
  );
}