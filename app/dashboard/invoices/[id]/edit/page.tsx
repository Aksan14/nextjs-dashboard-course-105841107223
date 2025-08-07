import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import EditForm from '@/app/ui/invoices/edit-form';
import { lusitana } from '@/app/ui/fonts';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const invoice = await fetchInvoiceById(params.id);
  const customers = await fetchCustomers();

  if (!invoice) {
    notFound();
  }

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} text-2xl`}>Edit Invoice</h1>
      <EditForm invoice={invoice} customers={customers} />
    </div>
  );
}