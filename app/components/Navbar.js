'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ToggleTheme from './ToggleTheme';

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // Search logic here
        // For now, just log the search term
        console.log('Searching for:', searchTerm);
    };

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto">
                {/* Mobile: 3 rows layout, Desktop: single row */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    {/* Mobile: first row, Desktop: left side */}
                    <h1 className="text-white text-2xl mb-3 md:mb-0">My Twitter Clone</h1>
                    
                    {/* Mobile: third row, Desktop: middle */}
                    <div className="order-last md:order-none my-3 md:my-0 md:mx-4 md:flex-grow md:max-w-md">
                        <form onSubmit={handleSearch} className="flex">
                            <input
                                type="text"
                                placeholder="Search tweets..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-l-full py-2 px-4 focus:outline-none dark:bg-gray-800 dark:text-white dark:border-gray-700"
                            />
                            <button 
                                type="submit" 
                                className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-full px-4 flex items-center justify-center"
                            >
                                🔍
                            </button>
                        </form>
                    </div>
                    
                    {/* Mobile: second row, Desktop: right side */}
                    <div className="flex items-center justify-between mb-3 md:mb-0">
                        <ul className="flex space-x-4">
                            <li>
                                <Link href="/" className="text-white hover:underline">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-white hover:underline">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-white hover:underline">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                        <div className="ml-4">
                            <ToggleTheme />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;