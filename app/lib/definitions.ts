// app/lib/definitions.ts
export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
};

export type Customer = {
  id: string;
  name: string;
};

export type Revenue = {
  revenue: number;
  id?: string;
  date?: string;
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
  image_url: string;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
  image_url: string;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string; // Formatted sebagai string (misalnya, mata uang)
};