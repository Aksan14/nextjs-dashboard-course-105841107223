// app/lib/data.ts
import { sql } from '@vercel/postgres';
import { Invoice, Customer, LatestInvoice, Revenue } from './definitions';

// Ambil semua invoice
export async function fetchInvoices() {
  try {
    const data = await sql<Invoice>`
      SELECT id, customer_id, amount, status, date
      FROM invoices
      ORDER BY date DESC
    `;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

// Ambil semua customer
export async function fetchCustomers() {
  try {
    const data = await sql<Customer>`
      SELECT id, name
      FROM customers
      ORDER BY name ASC
    `;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customers.');
  }
}

// Ambil 1 invoice berdasarkan ID
export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<Invoice>`
      SELECT id, customer_id, amount, status, date
      FROM invoices
      WHERE id = ${id}
    `;
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

// Ambil data untuk chart revenue
export async function fetchRevenue(): Promise<Revenue[]> {
  try {
    const data = await sql`
      SELECT 
        TO_CHAR(CAST(date AS date), 'YYYY-MM') AS month,
        SUM(amount) AS revenue
      FROM invoices
      WHERE status = 'paid'
      GROUP BY month
      ORDER BY month ASC
    `;

    return data.rows.map(row => ({
      month: row.month,
      revenue: Number(row.revenue) || 0,
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue.');
  }
}

// Data untuk card dashboard
export async function fetchCardData() {
  try {
    const paid = await sql`SELECT SUM(amount) AS total FROM invoices WHERE status = 'paid'`;
    const pending = await sql`SELECT SUM(amount) AS total FROM invoices WHERE status = 'pending'`;
    const invoiceCount = await sql`SELECT COUNT(*) AS count FROM invoices`;
    const customerCount = await sql`SELECT COUNT(*) AS count FROM customers`;

    return {
      totalPaidInvoices: Number(paid.rows[0].total) || 0,
      totalPendingInvoices: Number(pending.rows[0].total) || 0,
      numberOfInvoices: Number(invoiceCount.rows[0].count) || 0,
      numberOfCustomers: Number(customerCount.rows[0].count) || 0,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

// Ambil invoice terbaru
export async function fetchLatestInvoices(): Promise<LatestInvoice[]> {
  try {
    const result = await sql<LatestInvoice>`
      SELECT
        invoices.id,
        customers.name,
        invoices.amount,
        invoices.date,
        invoices.status
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5
    `;
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch latest invoices.');
  }
}
