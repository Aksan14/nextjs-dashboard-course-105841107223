import { fetchInvoices } from '@/app/lib/data';
import InvoicesTable from '@/app/ui/invoices/table';
import Search from '@/app/ui/invoices/search';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';

export default async function Page() {
  const invoices = await fetchInvoices();
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      <div className="mt-4 flex items-center justify-between gap-2">
        <Search placeholder="Search invoices..." />
        <Link
          href="/dashboard/invoices/create"
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Create Invoice
        </Link>
      </div>
      <InvoicesTable invoices={invoices} />
    </div>
  );
}