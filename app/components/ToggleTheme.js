'use client'
import { useEffect, useState } from 'react';

export default function ToggleTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(v => !v)}
      className="ml-4 px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition"
    >
      {dark ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}