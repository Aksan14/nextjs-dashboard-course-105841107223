import { sql } from '@vercel/postgres';
import { Invoice, Customer } from './definitions';

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