'use client';

import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/app/lib/auth';
import { redirect } from 'next/navigation';

async function handleSignOut() {
  try {
    await signOut({ redirect: false });
    redirect('/login');
  } catch (error) {
    console.error('Error during sign out:', error);
    throw new Error('Gagal logout. Silakan coba lagi.');
  }
}

export default function SideNav() {
  return (
    <div className="flex h-full w-64 flex-col border-r bg-white px-3 py-4 md:px-2">
      {/* Logo */}
      <Link
        className="mb-6 flex h-20 items-center justify-start rounded-md bg-blue-600 p-4 md:h-24"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>

      {/* Menu */}
      <div className="flex grow flex-col justify-between">
        <div className="space-y-2">
          <NavLinks />
        </div>

        {/* Sign out */}
        <form action={handleSignOut}>
          <button
            type="submit"
            className="flex h-[48px] w-full items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-600"
          >
            <PowerIcon className="w-6" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  );
}
