'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'صفحه اصلی', href: '/' },
  { name: 'محصولات', href: '/products' },
  { name: 'درباره ما', href: '/about' },
  { name: 'تماس با ما', href: '/contact' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50" dir="rtl">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* لوگو */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          نیسان‌یار
        </Link>

        {/* منو دسکتاپ */}
        <ul className="hidden md:flex gap-6 text-gray-700 dark:text-gray-300 font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="hover:text-blue-500 transition">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* آیکون موبایل */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 dark:text-gray-300"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* منوی موبایل */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 z-40 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 flex justify-end">
          <button onClick={() => setMenuOpen(false)}>
            <X size={26} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>
        <ul className="flex flex-col items-end gap-4 px-6 text-gray-800 dark:text-gray-200 text-base">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-500 transition"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
