'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-yellow-400 dark:bg-yellow-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-white">
              BlogMar!!
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link href="/" className="text-white hover:text-gray-200">
                Home
              </Link>
              <Link href="/blog" className="text-white hover:text-gray-200">
                Blog
              </Link>
              <Link href="/categories" className="text-white hover:text-gray-200">
                Categories
              </Link>
              <Link href="/contact" className="text-white hover:text-gray-200">
                Contact
              </Link>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="ml-4"
              >
                {theme === 'dark' ? '🌞' : '🌙'}
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className="block text-white hover:text-gray-200 py-2"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="block text-white hover:text-gray-200 py-2"
                onClick={toggleMenu}
              >
                Blog
              </Link>
              <Link
                href="/categories"
                className="block text-white hover:text-gray-200 py-2"
                onClick={toggleMenu}
              >
                Categories
              </Link>
              <Link
                href="/contact"
                className="block text-white hover:text-gray-200 py-2"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="mt-2"
              >
                {theme === 'dark' ? '🌞' : '🌙'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;