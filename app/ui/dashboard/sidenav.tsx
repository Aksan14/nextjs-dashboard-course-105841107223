'use client'; // Tetap gunakan Client Component

import { useState } from 'react';
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(true); // State untuk kontrol kolaps

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      alert('Gagal logout. Silakan coba lagi.');
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Tombol Toggle untuk layar kecil */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out flex h-full w-64 flex-col border-r bg-white px-3 py-4 md:px-2`}
      >
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
        <div className="flex grow flex-col justify-between space-y-2">
          <div>
            <NavLinks />
          </div>

          {/* Sign out */}
          <button
            onClick={handleSignOut}
            className="flex h-[48px] w-full items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-600"
          >
            <PowerIcon className="w-6" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Overlay untuk menutup sidebar pada layar kecil saat diklik di luar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}