import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export const metadata = {
  title: 'Acme Dashboard',
  description: 'A financial dashboard to manage your invoices and customers.',
  openGraph: {
    title: 'Acme Dashboard',
    description: 'Manage your finances with ease!',
    url: 'https://your-vercel-app-url.vercel.app',
    images: [{ url: '/hero-desktop.png', width: 1000, height: 760, alt: 'Acme Dashboard Screenshot' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}