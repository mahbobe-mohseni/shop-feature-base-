 import Link from "next/link";


const Footer = () => {
  return (
     <footer className="bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300 mt-12 border-t">
      <div className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        {/* Logo + Description */}
        <div>
          <h2 className="text-xl font-bold text-blue-600">MyApp</h2>
          <p className="mt-2 text-sm">
            Bringing you the best features with elegant design. Let's build something great.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/pricing" className="hover:underline">Pricing</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <div className="w-5 h-5 hover:text-blue-500 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <div className="w-5 h-5 hover:text-blue-500 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <div className="w-5 h-5 hover:text-blue-500 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center py-4 text-sm border-t dark:border-gray-800">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
