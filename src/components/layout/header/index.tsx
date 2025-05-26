import React from "react";
import Link from "next/link";
const Header = () => {
  return (
    <header className="py-4 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          Feature App
        </Link>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/example/features" className="hover:text-blue-600">
                Features
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
