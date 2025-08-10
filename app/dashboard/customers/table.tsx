'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { Customer } from '@/app/lib/definitions';

export default function CustomersTable({ customers }: { customers: Customer[] }) {
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';
    const currentPage = Number(searchParams.get('page')) || 1;

    const filteredCustomers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(query.toLowerCase())
    );

    const itemsPerPage = 6;
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
    const paginatedCustomers = filteredCustomers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left text-gray-900">
                <thead className="bg-gray-100 text-sm font-semibold uppercase tracking-wide text-gray-700">
                    <tr>
                        <th className="px-4 py-3">ID</th>
                        <th className="px-4 py-3">Name</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                    {paginatedCustomers.map((customer, index) => (
                        <tr
                            key={customer.id}
                            className={clsx(index % 2 === 0 ? 'bg-white' : 'bg-gray-50')}
                        >
                            <td className="px-4 py-3">{customer.id}</td>
                            <td className="px-4 py-3">{customer.name}</td>
                        </tr>
                    ))}

                    {paginatedCustomers.length === 0 && (
                        <tr>
                            <td colSpan={2} className="px-4 py-6 text-center text-gray-500">
                                No customers found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-3">
                <Link
                    href={`/dashboard/customers?page=${currentPage - 1}`}
                    className={clsx(
                        'rounded px-4 py-2 text-sm font-medium',
                        currentPage === 1
                            ? 'cursor-not-allowed bg-gray-200 text-gray-500'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                    )}
                >
                    Previous
                </Link>
                <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                </span>
                <Link
                    href={`/dashboard/customers?page=${currentPage + 1}`}
                    className={clsx(
                        'rounded px-4 py-2 text-sm font-medium',
                        currentPage === totalPages
                            ? 'cursor-not-allowed bg-gray-200 text-gray-500'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                    )}
                >
                    Next
                </Link>
            </div>
        </div>
    );
}
