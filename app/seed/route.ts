import { sql } from '@vercel/postgres';
import { users, customers, invoices } from '@/app/lib/placeholder-data';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )`;
    await sql`CREATE TABLE IF NOT EXISTS customers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL
    )`;
    await sql`CREATE TABLE IF NOT EXISTS invoices (
      id SERIAL PRIMARY KEY,
      customer_id TEXT NOT NULL,
      amount INTEGER NOT NULL,
      status TEXT NOT NULL,
      date TEXT NOT NULL
    )`;

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING
      `;
    }

    for (const customer of customers) {
      await sql`
        INSERT INTO customers (id, name)
        VALUES (${customer.id}, ${customer.name})
        ON CONFLICT (id) DO NOTHING
      `;
    }

    for (const invoice of invoices) {
      await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
      `;
    }

    return new Response('Database seeded successfully');
  } catch (error) {
    return new Response('Error seeding database', { status: 500 });
  }
}