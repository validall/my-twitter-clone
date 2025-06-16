import React from 'react';
import Link from 'next/link';

export default function Sidebar() {
    const menuItems = [
        { name: 'Home', icon: '🏠', href: '/' },
        { name: 'Explore', icon: '🔍', href: '/explore' },
        { name: 'Notifications', icon: '🔔', href: '/notifications' },
        { name: 'Messages', icon: '✉️', href: '/messages' },
        { name: 'Profile', icon: '👤', href: '/profile' },
    ];
    
    return (
        <aside className="w-20 md:w-64 p-4">
            <div className="mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white text-2xl">
                    🐦
                </div>
            </div>
            
            <nav>
                <ul className="space-y-4">
                    {menuItems.map(item => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className="flex items-center gap-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                            >
                                <span className="text-2xl dark:text-white">{item.icon}</span>
                                <span className="hidden md:inline font-medium dark:text-white">{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            
            <div className="mt-auto pt-8">
                <button className="bg-blue-500 text-white w-full md:w-auto rounded-full py-3 px-4 font-bold">
                    <span className="hidden md:inline">Tweet</span>
                    <span className="md:hidden">+</span>
                </button>
            </div>
        </aside> 
    );
}