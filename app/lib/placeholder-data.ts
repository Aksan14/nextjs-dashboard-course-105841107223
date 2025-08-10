const users = [
  {
    id: 'user1',
    name: 'Admin User',
    email: 'admin@example.com',
    // Simpan password dalam bentuk bcrypt hash (ini hash contoh untuk "password123")
    password: '$2b$10$Qe0sp8hYPX8jTKG2uY8d1u1Jv4ZbE82QccZ4VwQtY9m3DZJ7P3ZpS',
  },
];

const customers = [
  { id: 'customer1', name: 'John Doe', email: 'john@example.com' },
  { id: 'customer2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: 'customer3', name: 'Michael Johnson', email: 'michael@example.com' },
  { id: 'customer4', name: 'Emily Davis', email: 'emily@example.com' },
  { id: 'customer5', name: 'David Brown', email: 'david@example.com' },
];

const invoices = [
  {
    id: 'inv1',
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    id: 'inv2',
    customer_id: customers[1].id,
    amount: 20348,
    status: 'paid',
    date: '2022-11-14',
  },
  {
    id: 'inv3',
    customer_id: customers[2].id,
    amount: 12000,
    status: 'paid',
    date: '2023-01-05',
  },
  {
    id: 'inv4',
    customer_id: customers[3].id,
    amount: 8900,
    status: 'pending',
    date: '2023-02-20',
  },
  {
    id: 'inv5',
    customer_id: customers[4].id,
    amount: 45200,
    status: 'paid',
    date: '2023-03-11',
  },
];

export { users, customers, invoices };
