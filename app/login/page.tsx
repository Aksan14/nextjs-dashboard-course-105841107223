// app/login/page.tsx
'use client';

import { signIn } from '@/app/lib/auth';
import { useState } from 'react';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Tambah state untuk loading
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading true saat submit
    setError(null); // Reset error sebelum mencoba login

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError('Email atau kata sandi salah.');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      setError('Terjadi kesalahan saat login. Silakan coba lagi.');
    } finally {
      setIsLoading(false); // Set loading false setelah selesai
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center p-6">
      <h1 className={`${lusitana.className} text-2xl`}>Log in to Acme Dashboard</h1>
      <form onSubmit={handleSubmit} className="mt-4 max-w-md">
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer block w-full rounded-md border border-gray-200 py-2"
            required
            disabled={isLoading} // Nonaktifkan input saat loading
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer block w-full rounded-md border border-gray-200 py-2"
            required
            disabled={isLoading} // Nonaktifkan input saat loading
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white disabled:bg-blue-300"
          disabled={isLoading} // Nonaktifkan tombol saat loading
        >
          {isLoading ? 'Memproses...' : 'Log in'}
        </button>
      </form>
      <Link href="/" className="mt-4 block text-blue-600">
        Back to Home
      </Link>
    </div>
  );
}