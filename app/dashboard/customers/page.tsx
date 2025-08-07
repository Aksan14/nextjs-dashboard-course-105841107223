import { fetchCustomers } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
  const customers = await fetchCustomers();
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      <div className="mt-4">
        <table className="w-full text-gray-900">
          <thead>
            <tr>
              <th className="text-left">ID</th>
              <th className="text-left">Name</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}