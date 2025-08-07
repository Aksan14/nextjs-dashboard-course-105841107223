const users = [
  {
    id: 'user1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123', // Harus di-hash dengan bcrypt
  },
];

const customers = [
  { id: 'customer1', name: 'John Doe' },
  { id: 'customer2', name: 'Jane Smith' },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'paid',
    date: '2022-11-14',
  },
];

export { users, customers, invoices };