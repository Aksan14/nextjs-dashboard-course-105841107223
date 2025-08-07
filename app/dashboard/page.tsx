import { lusitana } from '@/app/ui/fonts';

export default function Page() {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} text-2xl`}>Dashboard</h1>
      <p>Welcome to your financial dashboard.</p>
    </div>
  );
}