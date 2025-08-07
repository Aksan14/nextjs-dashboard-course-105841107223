import CreateForm from '@/app/ui/invoices/create-form';
import { fetchCustomers } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
  const customers = await fetchCustomers();
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} text-2xl`}>Create Invoice</h1>
      <CreateForm customers={customers} />
    </div>
  );
}