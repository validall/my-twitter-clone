import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="font-bold text-xl hover:underline">
          Home
        </Link>
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
      </div>
    </header>
  );
}